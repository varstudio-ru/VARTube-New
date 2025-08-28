using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Cysharp.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RailwayMuseum.UI.NewSwipePanel;
using Unity.VisualScripting;
using UnityEngine;
using VARTube.Input;
using VARTube.Core.Services;
using VARTube.IIK;
using VARTube.Network;
using VARTube.Network.Models;
using VARTube.ProductBuilder.Controller;
using VARTube.ProductBuilder.Design.Composite;
using VARTube.UI.BasicUI;
using VARTube.UI.Interaction;
using Product = VARTube.ProductBuilder.Design.Composite.Product;

namespace VARTube.Showroom
{
    public abstract class ProductShowroom : MonoBehaviour
    {
        [SerializeField]
        protected BasicUIController _basicUI;
        [SerializeField]
        protected ParamsPanel _paramsPanel;
        [SerializeField]
        private SkyboxSettingsView _skyboxPanel;
        [SerializeField]
        private SwipePanel _catalogPanel; 
        [SerializeField]
        private AnimatedPanel _productsListPanel;
        [SerializeField]
        protected SkyboxSettingsController _skyboxController;
        [SerializeField]
        protected VARInput _input;
        [SerializeField]
        private VariantsList _variantsList;
        [SerializeField]
        private GraphicsSettingsController _graphicsSettings;
        [SerializeField]
        private SizeCube _sizeCubePrefab;
        [SerializeField]
        protected ProductSpawnInput _productSpawner;

        private ProductEnvironmentManager _productEnvironmentManager;

        protected string targetProductGuid;
        private bool _targetProductSpawned;
        private bool _isCurrentlySpawningInitial;
        private string _initialSceneProjectData;
        private JObject _initialSceneBlueprint;

        private SizeCube _sizeCube;

        protected Product[] _productsFromAnotherShowroom;
        private ProductController _selectedProduct;

        private Variant _currentVariant;

        private AnimatedPanel _skyboxAnimatedPanel;

        private Camera _currentCamera;

        protected abstract ProductShowroomEnvironment SelfEnvironmentType { get; }
        
        public Variant CurrentVariant => _currentVariant;

        public virtual async UniTask Run(Variant variant, Product[] products = null, int? targetGraphicsTier = null)
        {
            _currentVariant = variant;

            await _variantsList.Setup(_currentVariant);
            _variantsList.OnSelected.AddListener(ChangeVariant);
            targetProductGuid = variant.calculationGuid;

            if (products != null)
            {
                _productsFromAnotherShowroom = products;
                foreach (Product product in products)
                {
                    product.Root.SetParent(transform);
                    product.Root.gameObject.SetActive(false);
                }
            }

            if (targetGraphicsTier != null)
                _graphicsSettings.SelectGraphicsTier(targetGraphicsTier.Value);

            _skyboxAnimatedPanel = _skyboxPanel.GetComponent<AnimatedPanel>();
            if (_skyboxAnimatedPanel == null)
                _skyboxPanel.gameObject.SetActive(false);

            if (_productsListPanel != null)
                _productsListPanel.Hide();
            _catalogPanel.gameObject.SetActive(false);
            _paramsPanel.gameObject.SetActive(false);
        }

        private void ChangeVariant(Variant variant)
        {
            if (_currentVariant.calculationGuid == variant.calculationGuid)
                return;
            ProductController[] sceneProducts = FindObjectsByType<ProductController>(FindObjectsSortMode.None);
            if (sceneProducts.Length > 1)
            {
                _basicUI.ShowYesNoDialog("Все изделия на сцене будут удалены. Продолжить?", () =>
                {
                    ChangeVariantDirect(variant);
                });
                return;
            }
            ChangeVariantDirect(variant);
        }

        protected abstract void StartSpawningSequence(bool additive);
        public abstract void FinishSpawningSequence(bool additive, Vector2 screenPosition);

        private void ChangeVariantDirect(Variant variant)
        {
            _currentVariant = variant;
            AddProduct(variant.calculationGuid);
        }

        public void AddProduct(string productGuid, bool additive = false)
        {
            if (!additive)
            {
                ProductController[] sceneProducts = FindObjectsByType<ProductController>(FindObjectsSortMode.None);
                foreach (ProductController controller in sceneProducts)
                    Destroy(controller.gameObject);
            }
            targetProductGuid = productGuid;
            _targetProductSpawned = false;
            _productsFromAnotherShowroom = null;
            _productSpawner.enabled = true;
            _productSpawner.IsAdditiveMode = additive;
            StartSpawningSequence(additive);
        }

        public void GoBack()
        {
            StupidCache.Save();
            _ = _productEnvironmentManager.GoToMainMenuScene(_currentVariant);
        }

        public async UniTask<Product[]> SpawnProduct(string productGuid, Vector3 spawnPoint)
        {
            NetworkService networkService = ApplicationServices.GetService<NetworkService>();
            Calculation calculation = await networkService.GetCalculationStat(productGuid);
            ProductBuilderHelper helper = new();
            List<Product> spawnedProducts = new();
            if (calculation.Type == CalculationType.SCENE)
            {
                string projectData = await helper.GetProjectData(productGuid);
                (JObject blueprint, Product[] products) = await Product.LoadAsScene(productGuid, projectData, default);
                _initialSceneBlueprint = blueprint;
                _initialSceneProjectData = projectData;
                spawnedProducts.AddRange(products);
                foreach (ProductController controller in products.Select(p => p.Controller))
                {
                    controller.gameObject.SetActive(false);
                    
                    Draggable draggable = controller.gameObject.AddComponent<Draggable>();
                    draggable.SurfaceType = controller.Product.ConnectionType;
                    draggable.IsLocked = true;

                    controller.gameObject.AddComponent<Selectable>();

                    foreach(ProductCalculationElement calculationElement in controller.Product.Children.Where(c => c is ProductCalculationElement).Cast<ProductCalculationElement>())
                        calculationElement.Controller.AddComponent<Selectable>();
                    
                    foreach (Collider collider in controller.GetComponentsInChildren<Collider>())
                    {
                        if (controller.Product.VirtualObjects.Any(vo => vo.SelfTransform.gameObject == collider.gameObject))
                            continue;
                        collider.gameObject.AddComponent<Snappable>().Root = draggable;
                    }
                }

                foreach (ProductController controller in products.Select(p => p.Controller))
                {
                    controller.transform.Translate(spawnPoint, Space.World);
                    SetupManipulators(controller.Product);
                    controller.Product.TurnManipulatorVisualParts(false);
                    controller.gameObject.SetActive(true);
                }

                UpdateProductsSnapping(products.Select(p => p.Controller));
            }
            else if (calculation.Type == CalculationType.PROJECT)
            {
                Product product = await helper.BuildProduct(productGuid, null, null, default);
                Draggable draggable = product.Controller.gameObject.AddComponent<Draggable>();
                draggable.SurfaceType = product.ConnectionType;
                
                product.Controller.gameObject.AddComponent<Selectable>();

                foreach(ProductCalculationElement calculationElement in product.Children.Where(c => c is ProductCalculationElement).Cast<ProductCalculationElement>())
                    calculationElement.Controller.AddComponent<Selectable>();
                
                product.Root.position = spawnPoint;
                product.Root.gameObject.SetActive(true);
                foreach (Collider collider in product.Root.GetComponentsInChildren<Collider>())
                {
                    if (product.VirtualObjects.Any(vo => vo.SelfTransform.gameObject == collider.gameObject))
                        continue;
                    collider.gameObject.AddComponent<Snappable>().Root = draggable;
                }
                SetupManipulators(product);
                product.TurnManipulatorVisualParts(false);
                spawnedProducts.Add(product);
            }
            return spawnedProducts.ToArray();
        }

        private void SetupManipulators(Product product)
        {
            foreach (ProductManipulatorElement manipulator in product.VirtualObjects.Where(vo => vo is ProductManipulatorElement).Cast<ProductManipulatorElement>())
            {
                if (manipulator.Type != ProductManipulatorElement.ManipulatorType.HANDLE && !manipulator.HasSound)
                    continue;
                if (manipulator.VisualPart != null)
                    manipulator.VisualPart.SelfTransform.gameObject.layer = LayerMask.NameToLayer("IgnoreOnRecording");
                Interactable interactable = manipulator.SelfTransform.AddComponent<Interactable>();
                interactable.OnInteractionStarted.AddListener(manipulator.StartInteraction);
                interactable.OnInteractionContinue.AddListener(manipulator.ContinueInteraction);
            }
        }

        private void UpdateProductsSnapping(IEnumerable<ProductController> controllers)
        {
            RaycastHit[] hits = new RaycastHit[10];
            foreach (ProductController controller in controllers)
            {
                Draggable targetDraggable = controller.GetComponent<Draggable>();
                Vector3 origin = controller.transform.position + Vector3.up * 0.01f;
                int hitsCount = Physics.RaycastNonAlloc(origin, Vector3.down, hits, 10);
                RaycastHit? targetDragSurfaceHit = InputController.GetProperHit(targetDraggable, hits.Take(hitsCount), origin);
                if (targetDragSurfaceHit == null)
                    continue;

                if (targetDragSurfaceHit.Value.collider == null)
                    continue;

                Snappable targetSnappable = targetDragSurfaceHit.Value.collider.GetComponent<Snappable>();
                targetDraggable.SnapTo(targetSnappable);
            }
        }

        public async UniTask<Product[]> SpawnTargetProductAtScreenPosition(Vector2 screenPosition, bool additive)
        {
            Collider planeCollider = GameObject.FindWithTag("ARInfinitePlane").GetComponent<Collider>();
            if (planeCollider.Raycast((await GetCurrentCamera()).ScreenPointToRay(screenPosition), out RaycastHit hit, float.PositiveInfinity))
                return await SpawnTargetProduct(hit.point, additive);
            return null;
        }

        public virtual async UniTask<Product[]> SpawnTargetProduct(Vector3 spawnPoint, bool additive)
        {
            if (_targetProductSpawned || _isCurrentlySpawningInitial)
                return null;
            _isCurrentlySpawningInitial = true;
            Product[] spawnedProducts = null;
            if (_productsFromAnotherShowroom == null)
            {
                spawnedProducts = await SpawnProduct(targetProductGuid, spawnPoint);
            }
            else
            {
                spawnedProducts = _productsFromAnotherShowroom;
                foreach (Product product in _productsFromAnotherShowroom)
                    product.Root.gameObject.SetActive(true);
            }
            if (!additive)
                _skyboxController.SetCurrentSettings(spawnedProducts.First().World);
            _isCurrentlySpawningInitial = false;
            _targetProductSpawned = true;
            return spawnedProducts;
        }

        public void ToggleSkyboxPanel()
        {
            if (_skyboxAnimatedPanel == null)
                _skyboxPanel.gameObject.SetActive(!_skyboxPanel.gameObject.activeSelf);
            else
                _skyboxAnimatedPanel.Toggle();

            _paramsPanel.gameObject.SetActive(_skyboxPanel.gameObject.activeSelf);
            _productsListPanel.Hide();
            _catalogPanel.gameObject.SetActive(false);
        }
        public void ToggleProductListPanel()
        {
            _paramsPanel.gameObject.SetActive(_productsListPanel.IsVisible);

            if (_productsListPanel != null)
                _productsListPanel.Toggle();

            if (_skyboxAnimatedPanel == null)
                _skyboxPanel.gameObject.SetActive(false);
            else
                _skyboxAnimatedPanel.Hide();

            _catalogPanel.gameObject.SetActive(false);
        }

        private void SetSelection(ProductController product)
        {
            if (_selectedProduct != null)
            {
                _selectedProduct.OnTransformMaybeChanged.RemoveListener(UpdateSizeCube);
                _selectedProduct.Product.TurnManipulatorVisualParts(false);
            }
            _selectedProduct = product;
            if (_selectedProduct != null)
            {
                _selectedProduct = product;
                _selectedProduct.OnTransformMaybeChanged.AddListener(UpdateSizeCube);
                _selectedProduct.Product.TurnManipulatorVisualParts(true);
            }
            UpdateSizeCube();
        }

        private void UpdateSizeCube()
        {
            _sizeCube.gameObject.SetActive(_selectedProduct != null);
            if (_selectedProduct != null)
            {
                Bounds bounds = _selectedProduct.Product.GetBounds(Space.Self);
                _sizeCube.transform.position = _selectedProduct.Product.ElementsRoot.position + _selectedProduct.transform.rotation * bounds.center;
                _sizeCube.transform.rotation = _selectedProduct.transform.rotation;
                _sizeCube.Size = bounds.size;
            }
        }

        public bool GetSizeCubeVisibility() => _sizeCube.gameObject.activeSelf;
        public void ForceSizeCubeVisibility(bool value)
        {
            _sizeCube.gameObject.SetActive(value);
        }

        protected virtual void Start()
        {
            _sizeCube = Instantiate(_sizeCubePrefab);
            _sizeCube.gameObject.SetActive(false);

            _paramsPanel.gameObject.SetActive(false);
            _catalogPanel.gameObject.SetActive(false);

            _skyboxAnimatedPanel = _skyboxPanel.GetComponent<AnimatedPanel>();

            if (_skyboxAnimatedPanel == null)
                _skyboxPanel.gameObject.SetActive(false);

            if (_productsListPanel != null)
                _productsListPanel.Hide();

            _productEnvironmentManager = ApplicationServices.GetService<ProductEnvironmentManager>();

            _input.OnSelectionChanged.AddListener(selectable =>
            {
                _paramsPanel.gameObject.SetActive(false);

                if (_skyboxAnimatedPanel == null)
                    _skyboxPanel.gameObject.SetActive(false);
                else
                    _skyboxAnimatedPanel.Hide();
                
                if (_productsListPanel != null)
                    _productsListPanel.Hide();

                SetSelection(selectable?.GetComponentInParent<ProductController>());
                if (_selectedProduct == null)
                {
                    if (_paramsPanel != null)
                    {
                        _paramsPanel.ClearSelect();
                        _paramsPanel.gameObject.SetActive(true);
                    }
                    else
                        _paramsPanel.gameObject.SetActive(false);
                }
                else
                {
                    if (_paramsPanel != null)
                    {
                        _paramsPanel.gameObject.SetActive(true);
                        _paramsPanel.Setup(selectable?.GetComponent<ProductCalculationElementController>()?.Element.CurrentCalculation ?? _selectedProduct.Product).Forget();
                    }
                    else
                    {
                        _paramsPanel.gameObject.SetActive(true);
                    }
                }
            });
        }

        public void SwitchShowroomTo(ProductShowroomEnvironment targetEnvironment)
        {
            Product[] allProducts = FindObjectsByType<ProductController>(FindObjectsSortMode.None).Select(p => p.Product).ToArray();
            _ = _productEnvironmentManager.OpenShowroom(targetEnvironment, _currentVariant, allProducts, _graphicsSettings.CurrentGraphicsTier);
        }

        public void SwitchShowroom()
        {
            SwitchShowroomTo(SelfEnvironmentType == ProductShowroomEnvironment.AR || SelfEnvironmentType == ProductShowroomEnvironment.FakeAR ? ProductShowroomEnvironment.ThreeD : ProductShowroomEnvironment.AR);
        }

        public void SwitchToAR()
        {
            SwitchShowroomTo(ProductShowroomEnvironment.AR);
        }

        public void SwitchToFakeAR()
        {
            SwitchShowroomTo(ProductShowroomEnvironment.FakeAR);
        }

        public void SwitchTo3D()
        {
            SwitchShowroomTo(ProductShowroomEnvironment.ThreeD);
        }

        public void SaveVariant()
        {
            if (!_currentVariant.IsValid)
            {
                _basicUI.ShowInfoDialog("Нет информации о чате", InfoType.REGULAR, 2);
                return;
            }
            Product[] allProducts = FindObjectsByType<ProductController>(FindObjectsSortMode.None).Select(p => p.Product).ToArray();
            _basicUI.ShowSaveVariantDialog(_currentVariant.projectGuid, _currentVariant.calculationGuid, allProducts, _selectedProduct?.Product,
                                            _initialSceneProjectData, _initialSceneBlueprint, () =>
            {
                _basicUI.ShowProgressOverlay("Идёт сохранение...");
            }, variant =>
            {
                _currentVariant = variant;
                _variantsList.AddItem(_currentVariant, true);
                _basicUI.ShowInfoDialog("Сохранено");
                _basicUI.HideProgressOverlay();
            }, () =>
            {
                _basicUI.HideProgressOverlay();
                _basicUI.ShowInfoDialog("Произошла ошибка при сохранении варианта", InfoType.ERROR, 3);
            });
        }

        public void SaveWorldForCurrentProject()
        {
            _basicUI.ShowYesNoDialog("Это действие перезапишет настройки окружения по умолчанию в текущем проекте. Продолжить?", SaveWorldForCurrentProjectInternal);
        }

        private async void SaveWorldForCurrentProjectInternal()
        {
            _basicUI.ShowProgressOverlay("Идёт сохранение...");
            try
            {
                Product currentProduct = FindFirstObjectByType<ProductController>().Product;

                string projectGuid = currentProduct.Path.SplittedURL;
                string projectData = await new ProductBuilderHelper().GetProjectData(projectGuid);
                IIKCore core = await IIKCore.CreateIIKCoreAsync(projectGuid, projectData);
                await core.CalculateAsync("[]", "{}");
                JObject frontendData = JObject.Parse(await core.GetFrontendStringAsync());
                frontendData["world"] = currentProduct.World.ToJObject();
                string updatedProjectData = await core.UpdateFromFrontendAsync(projectData, JsonConvert.SerializeObject(frontendData), "{}");

                NetworkService networkService = ApplicationServices.GetService<NetworkService>();

                Calculation calculation = await networkService.GetCalculationStat(projectGuid);

                CalculationUploadData uploadData = new()
                {
                    guid = calculation.guid,
                    idCompany = calculation.company.Id,
                    x = calculation.x,
                    y = calculation.y,
                    z = calculation.z,
                    idCalculationType = CalculationType.PROJECT
                };
                MemoryStream projectStream = new(Encoding.UTF8.GetBytes(updatedProjectData));
                Dictionary<string, Stream> files = new()
                {
                    {
                        calculation.projectFileName, projectStream
                    }
                };
                await networkService.CreateOrUpdateCalculation(uploadData, files);
                currentProduct.World.Apply();
                string urlInCloud = $"calculationResults/{projectGuid}/{calculation.projectFileName}";
                StupidCache.RemoveFileData(urlInCloud);
                _basicUI.HideProgressOverlay();
                _basicUI.ShowInfoDialog("Сохранено");
            }
            catch (Exception ex)
            {
                _basicUI.ShowInfoDialog("Произошла ошибка при сохранении варианта", InfoType.ERROR, 3);
                Debug.LogException(ex);
            }
        }

        private async UniTask<Camera> GetCurrentCamera()
        {
            while (_currentCamera == null)
            {
                await UniTask.NextFrame();
                _currentCamera = FindObjectsByType<Camera>(FindObjectsSortMode.None).FirstOrDefault(c => c.CompareTag("MainCamera") && c.gameObject.scene == gameObject.scene);
            }

            return _currentCamera;
        }
    }
}