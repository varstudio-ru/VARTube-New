using System.Linq;
using Cysharp.Threading.Tasks;
using UnityEngine;
using VARTube.Core.Services;
using VARTube.Data.Settings;
using VARTube.Network.Models;
using VARTube.ProductBuilder.Controller;
using VARTube.ProductBuilder.Design.Composite;
using VARTube.Showroom.ProductCamera;

namespace VARTube.Showroom
{
    public class ThreeDShowroom : ProductShowroom
    {
        private ProductCameraView _camera;
        protected override ProductShowroomEnvironment SelfEnvironmentType => ProductShowroomEnvironment.ThreeD;

        protected override async void StartSpawningSequence( bool additive )
        {
            if(!additive)
            {
                _productSpawner.enabled = false;
                await SpawnTargetProduct(Vector3.zero, false);
                Bounds globalBounds = FindObjectsByType<ProductController>(FindObjectsSortMode.None)
                                      .Select(pc => pc.Product.GetBounds())
                                      .Aggregate((b1, b2) => { b1.Encapsulate(b2); return b1; });
                _camera.SetManualState(globalBounds);
            }
            else
            {
                _paramsPanel.gameObject.SetActive(false);
                _productSpawner.enabled = true;
                _basicUI.ShowInfoDialog("Укажите куда разместить новое изделие");
            }
        }

        public override void FinishSpawningSequence( bool additive, Vector2 screenPosition )
        {
            SpawnTargetProductAtScreenPosition(screenPosition, additive).Forget();
            _productSpawner.enabled = false;
        }

        public override async UniTask Run(Variant variant, Product[] products = null, int? targetGraphicsTier = null)
        {
            await base.Run(variant, products, targetGraphicsTier);
            _camera = Instantiate(ApplicationServices.GetService<ApplicationConfigExtended>().ProductCamera.ProductCamera);
            Product[] spawnedProducts = await SpawnTargetProduct(Vector3.zero, false);
            
            _skyboxController.SetSceneRotation(0);

            await UniTask.NextFrame();

            Bounds globalBounds = spawnedProducts
                                  .Select(product => product.GetBounds())
                                  .Aggregate((b1, b2) => { b1.Encapsulate(b2); return b1; });

            _camera.SetManualState(globalBounds);

            _input.OnInputCaptureChanged.AddListener(isCaptured =>
            {
                _camera.SetEnabled(!isCaptured);
            });
        }

        public override async UniTask<Product[]> SpawnTargetProduct(Vector3 spawnPoint, bool additive)
        {
            Product[] spawnedProducts = await base.SpawnTargetProduct(spawnPoint, additive);
            if(spawnedProducts == null)
                return null;

            if (_productsFromAnotherShowroom != null)
            {
                if (_productsFromAnotherShowroom.Length == 1)
                {
                    Product targetProduct = _productsFromAnotherShowroom.First();
                    targetProduct.Root.position = spawnPoint;
                    targetProduct.Root.LookAt(targetProduct.Root.position + Vector3.forward);
                }
                else
                {
                    Bounds globalBounds = _productsFromAnotherShowroom
                                          .Select(product => product.GetBounds())
                                          .Aggregate((b1, b2) => { b1.Encapsulate(b2); return b1; });

                    foreach (Product product in _productsFromAnotherShowroom)
                        product.Root.Translate(-globalBounds.center + Vector3.up * globalBounds.size.y / 2.0f, Space.World);

                    Transform tempTransform = new GameObject().transform;
                    tempTransform.position = globalBounds.center;

                    foreach (Product product in _productsFromAnotherShowroom)
                        product.Root.SetParent(tempTransform);

                    tempTransform.LookAt(tempTransform.position + Vector3.forward);

                    foreach (Product product in _productsFromAnotherShowroom)
                        product.Root.SetParent(null);

                    Destroy(tempTransform.gameObject);
                }
            }
            
            UniTask.Void(async () => {
                await UniTask.WaitUntil(() => _paramsPanel != null);

                if (ProductController.Active.Count == 1)
                {
                    _paramsPanel.gameObject.SetActive(true);
                    _paramsPanel.Setup(ProductController.Active.First().Product);
                }
            });

            return spawnedProducts;
        }

        private void ProductsCountChanged(int count)
        {
            UniTask.Void(async () => {
                await UniTask.WaitUntil(() => _paramsPanel != null);
                
                if (ProductController.Active.Count == 1)
                {
                    _paramsPanel.gameObject.SetActive(true);
                    _paramsPanel.Setup(ProductController.Active.First().Product);
                }
            });
        }

        private void OnEnable()
        {
            ProductController.OnActiveCountChanged += ProductsCountChanged;
        }

        private void OnDisable()
        {
            ProductController.OnActiveCountChanged -= ProductsCountChanged;
        }
    }
}