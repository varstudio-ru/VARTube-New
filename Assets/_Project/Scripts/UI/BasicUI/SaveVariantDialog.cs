using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Cysharp.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using VARTube.Core.Services;
using VARTube.Data.Settings;
using VARTube.Network;
using VARTube.Network.Models;
using VARTube.ProductBuilder.Controller;
using VARTube.ProductBuilder.Design.Composite;
using VARTube.Showroom;

namespace VARTube.UI.BasicUI
{
    public class SaveVariantDialog : SimpleDialog
    {
        [SerializeField] private TMP_InputField _nameField;
        [SerializeField] private Button _saveButton;
        [SerializeField] private Button _cancelButton;
        [SerializeField] private Toggle _asSceneToggle;
        [SerializeField] private Toggle _sequenceToggle;
        [SerializeField] private Toggle _sphereToggle;

        public void Show(string projectGuid, string calculationGuid, Product[] products, Product selectedProduct, string existingProject, JObject existingBlueprint, Action startSaveAction, Action<Variant> saveSuccess, Action saveError)
        {
            string newName = $"Вариант от {DateTime.Now:dd.MM.yyyy, HH:mm:ss}";
            _nameField.text = newName;
            _saveButton.onClick.AddListener(() =>
            {
                startSaveAction.Invoke();
                Hide();
                UniTask.Void(async () =>
                {
                    NetworkService _networkService = ApplicationServices.GetService<NetworkService>();
                    AuthorizationStateService _authorizationState = ApplicationServices.GetService<AuthorizationStateService>();
                    try
                    {
                        Bounds bounds;
                        if(_asSceneToggle.isOn)
                            bounds = products.Select(p => p.GetBounds()).Aggregate((b1, b2) => { b1.Encapsulate(b2); return b1; });
                        else
                            bounds = products.First().GetBounds();

                        string targetCalculationGuid = calculationGuid;
                        if(_asSceneToggle.isOn)
                        {
                            if(existingProject == null)
                                targetCalculationGuid = "8799330b-ac14-4612-8d52-c9825103cabe";//TODO шаблон пустого расчёта
                        }
                        else if( selectedProduct != null )
                        {
                            targetCalculationGuid = selectedProduct.Path.SplittedURL;
                        }
                        
                        Variant variant = await _networkService.AddVariant(projectGuid, targetCalculationGuid, _nameField.text, _authorizationState.Company.Id);
                        Calculation calculation = await _networkService.GetCalculationStat(variant.calculationGuid);
                        CalculationUploadData calculationData = new()
                        {
                            guid = variant.calculationGuid,
                            idCompany = _authorizationState.Company.Id,
                            x = bounds.size.x,
                            y = bounds.size.y,
                            z = bounds.size.z,
                            idCalculationType = _asSceneToggle.isOn ? CalculationType.SCENE : CalculationType.PROJECT
                        };
                        Dictionary<string, Stream> files = new();
                        if(_asSceneToggle.isOn)
                        {
                            string frontendDataString = Product.MakeFrontendDataForSceneString(products, existingBlueprint);
                            string relatedInputsString = await Product.MakeRelatedInputs(products);
                            string updatedProjectString = await products.First().Core.UpdateFromFrontendAsync(existingProject, frontendDataString, relatedInputsString);
                            MemoryStream projectStream = new(Encoding.UTF8.GetBytes(updatedProjectString));
                            projectStream.Position = 0;
                            files.Add(calculation.projectFileName, projectStream);
                        }
                        else
                        {
                            Product targetProduct = selectedProduct ?? products.First();

                            string frontendDataString = targetProduct.GetFrontendDataString();
                            string projectString = await targetProduct.Core.GetProjectStringAsync();
                            string updatedProjectString = await products.First().Core.UpdateFromFrontendAsync(projectString, frontendDataString, "{}");
                            MemoryStream projectStream = new(Encoding.UTF8.GetBytes(updatedProjectString));
                            
                            projectStream.Position = 0;
                            files.Add(calculation.projectFileName, projectStream);
                        }

                        if(_sequenceToggle.isOn)
                        {
                            List<MemoryStream> sequenceStreams = GenerateSequence(_asSceneToggle.isOn ? null : selectedProduct);
                            for(int i = 0; i < sequenceStreams.Count; i++)
                                files.Add($"sequence/{i}.jpg", sequenceStreams[i]);
                        }
                        if(_sphereToggle.isOn)
                        {
                            files.Add("sphere_360.jpg", GenerateSphere());
                        }

                        {
                            Camera iconCamera = new GameObject().AddComponent<Camera>();
                            iconCamera.transform.position = Camera.main.transform.position;
                            iconCamera.transform.rotation = Camera.main.transform.rotation;
                            files.Add("main_icon.jpg", new MemoryStream(TakeShot(iconCamera, new Vector2Int(256, 256)).EncodeToJPG()));
                            Destroy(iconCamera.gameObject);
                        }
                        
                        await _networkService.CreateOrUpdateCalculation(calculationData, files);
                        saveSuccess.Invoke(variant);
                    }
                    catch( Exception ex )
                    {
                        Debug.LogException(ex);
                        saveError.Invoke();
                    }
                } );
            });
            _cancelButton.onClick.AddListener(Hide);
        }

        private static Texture2D TakeShot(Camera camera, Vector2Int resolution, RenderTexture tempTexture = null)
        {
            bool needDestroyTexture = false;
            if(tempTexture == null)
            {
                tempTexture = new(resolution.x, resolution.y, 24);
                needDestroyTexture = true;
            }
            Rect rect = new(0, 0, resolution.x, resolution.y);
            Texture2D screenShot = new(resolution.x, resolution.y, TextureFormat.RGBA32, false);

            camera.targetTexture = tempTexture;
            camera.Render();

            RenderTexture.active = tempTexture;
            screenShot.ReadPixels(rect, 0, 0);

            camera.targetTexture = null;
            RenderTexture.active = null;
            
            if( needDestroyTexture )
                Destroy(tempTexture);
            
            return screenShot;
        }

        private List<MemoryStream> GenerateSequence( Product targetProduct = null)
        {
            ProductShowroom currentShowroom = FindFirstObjectByType<ProductShowroom>(FindObjectsInactive.Exclude);
            ProductController[] allProducts = FindObjectsByType<ProductController>(FindObjectsInactive.Exclude, FindObjectsSortMode.None);
            bool wasSelected = currentShowroom.GetSizeCubeVisibility();
            
            currentShowroom.ForceSizeCubeVisibility(false);
            
            Vector2Int resolution = new(1280, 720);
            RenderTexture renderTexture = new(resolution.x, resolution.y, 24);
            
            List<MemoryStream> result = new();
            
            Transform sequenceCameraParent = new GameObject("SequenceCameraParent").transform;
            Camera sequenceCamera = new GameObject("SequenceCamera").AddComponent<Camera>();
            sequenceCamera.transform.SetParent(sequenceCameraParent);
            Vector3 center;
            if(targetProduct != null)
            {
                center = targetProduct.ElementsRoot.position;
            }
            else
            {
                Bounds globalBounds = allProducts
                                      .Select(pc => pc.Product.GetBounds())
                                      .Aggregate((b1, b2) => { b1.Encapsulate(b2); return b1; });
                center = globalBounds.center;
            }
            sequenceCameraParent.position = center;
            ApplicationConfigExtended config = ApplicationServices.GetService<ApplicationConfigExtended>();
            sequenceCameraParent.eulerAngles = config.ProductCamera.GetSettings().Rotation.Initial;
            sequenceCamera.transform.localPosition = new Vector3(0, 0, -Vector3.Distance(Camera.main.transform.position, center));
            sequenceCamera.transform.localRotation = Quaternion.identity;
            sequenceCamera.clearFlags = CameraClearFlags.Color;
            sequenceCamera.nearClipPlane = 0.001f;
            sequenceCamera.backgroundColor = Color.white;

            for(int i = 0; i < 36; i++)
            {
                Texture2D texture = TakeShot(sequenceCamera, resolution, renderTexture);
                result.Add(new MemoryStream(texture.EncodeToJPG()));
                Destroy(texture);
                sequenceCameraParent.Rotate(0, 1 / 36.0f * 360, 0, Space.World);
            }
            
            Destroy(sequenceCameraParent.gameObject);
            Destroy(renderTexture);
            
            currentShowroom.ForceSizeCubeVisibility(wasSelected);
            return result;
        }

        public MemoryStream GenerateSphere()
        {
            Camera sphereCamera = new GameObject().AddComponent<Camera>();
            sphereCamera.clearFlags = CameraClearFlags.Color;
            sphereCamera.nearClipPlane = 0.001f;
            sphereCamera.backgroundColor = Color.white;

            sphereCamera.transform.position = Camera.main.transform.position;

            byte[] result = I360Render.Capture(2048, CaptureType.JPG, sphereCamera);
            
            Destroy( sphereCamera.gameObject );

            return new MemoryStream(result);
        }

        public override void Hide()
        {
            gameObject.SetActive(false);
            OnHidden.Invoke();
        }
    }
}