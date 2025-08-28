using System;
using System.Linq;
using Cysharp.Threading.Tasks;
using UnityEngine;
using UnityEngine.Rendering.Universal;
using VARTube.Core.Services;
using VARTube.Data.Settings;
using VARTube.ProductBuilder.Controller;

public class GraphicsSettingsController : MonoBehaviour
{
    [SerializeField] private Light[] _lights;
    [SerializeField][Range(0, 2)] private int _graphicsTier;

    private GraphicsSettings _settings;
    private UniversalAdditionalCameraData _urpCamera;
    private bool _isInitialized = false;

    public int CurrentGraphicsTier => _graphicsTier;
    public Light[] Lights => _lights;

    public event Action<int> OnChangeGraphicsTier;


    public async void SelectGraphicsTier(int value)
    {
        while (!_isInitialized)
            await UniTask.NextFrame();

        _graphicsTier = value;
        _settings.URPSettings.useSRPBatcher = true;
        _settings.URPSettings.supportsDynamicBatching = true;

        OnChangeGraphicsTier?.Invoke(value);

        switch (value)
        {
            case 0:
                foreach (var item in _settings.PostProcessVolume.components)
                    item.active = false;

                _urpCamera.antialiasing = AntialiasingMode.None;
                _urpCamera.renderPostProcessing = false;
                _settings.URPSettings.msaaSampleCount = 1;
                _settings.URPSettings.shadowDistance = 0;

                foreach (var feature in _settings.URPFutures)
                    feature.SetActive(false);

                SetAdditionalLight(false);

                break;

            case 1:
                foreach (var item in _settings.PostProcessVolume.components)
                {
                    if (item.name.Contains("Tonemapping"))
                        item.active = true;
                    else
                        item.active = false;
                }

                _urpCamera.antialiasing = AntialiasingMode.FastApproximateAntialiasing;
                _urpCamera.renderPostProcessing = true;
                _settings.URPSettings.msaaSampleCount = 2;
                _settings.URPSettings.shadowDistance = 50;

                foreach (var feature in _settings.URPFutures)
                    feature.SetActive(false);

                break;

            case 2:
                foreach (var item in _settings.PostProcessVolume.components)
                    item.active = true;

                _urpCamera.antialiasing = AntialiasingMode.FastApproximateAntialiasing;
                _urpCamera.renderPostProcessing = true;
                _settings.URPSettings.msaaSampleCount = 4;
                _settings.URPSettings.shadowDistance = 50;

                foreach (var feature in _settings.URPFutures)
                    feature.SetActive(true);

                break;

            default:
                break;
        }
    }

    public void SetAdditionalLight(bool isOn)
    {
        foreach (ProductController controller in ProductController.Active)
            controller.Product.ShowShadowPlanes(_graphicsTier < 1 ? true : !isOn);

        foreach (var light in _lights)
            if (light != null)
                light.gameObject.SetActive(_graphicsTier < 1 ? false : isOn);
    }

    private async UniTask Init()
    {
        Camera camera = null;
        while (camera == null)
        {
            await UniTask.NextFrame();
            camera = FindObjectsByType<Camera>(FindObjectsSortMode.None).FirstOrDefault(c => c.CompareTag("MainCamera") && c.gameObject.scene == gameObject.scene);
        }
        _urpCamera = camera.GetUniversalAdditionalCameraData();
        _settings = ApplicationServices.GetService<ApplicationConfig>().GraphicsSettings;
        _isInitialized = true;
    }

    private async void Start()
    {
        await Init();

        SelectGraphicsTier(_graphicsTier);
    }
}
