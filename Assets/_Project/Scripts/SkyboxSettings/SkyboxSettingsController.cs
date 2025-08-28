using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cysharp.Threading.Tasks;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.XR.ARFoundation;
using VARTube.Core.Entity;
using VARTube.Core.Services;
using VARTube.Data.Settings;
using VARTube.ProductBuilder;
using VARTube.ProductBuilder.Controller;
using VARTube.ProductBuilder.Design.Composite;
using Input = VARTube.Interaction.Input;

public class SkyboxSettingsController : MonoBehaviour
{
    private const string SHADOW_COLOR_PARAM = "_ShadowColor";

    [SerializeField] private bool _isAr = false;

    [Header("Components")]
    [SerializeField] private GraphicsSettingsController _graphicsController;
    [SerializeField] private GroundedSkybox _groundedSkybox;
    [SerializeField] private Transform _lighting;
    [SerializeField] private ReflectionProbe _reflectionProbe;
    [SerializeField] private Material _skyboxMaterial;
    [SerializeField] private SkyboxDropdownView _skyboxDropdown;//TODO вынести список карт окружения из дропдауна сюда

    [Header("DefaultValues")]
    [SerializeField] private float _offsetRotation = 180;
    [SerializeField] private Color _defaultBackColor = Color.gray;

    private float _sceneRotation = 0;

    private Camera _camera;
    private bool _isInitialized = false;
    private Material _shadowPlaneMat;

    public UnityEvent<WorldSettings> OnSettingsChanged = new();

    public WorldSettings CurrentSettings
    {
        get;
        private set;
    }

    private GameObject _roomContainer;
    private Transform _room;

    public void OnBackgroundTypeChanged(string type)
    {
        switch (type)
        {
            case "color":
            case null:
                if (_isAr)
                    _camera.GetComponent<ARCameraBackground>().enabled = true;

                _groundedSkybox.gameObject.SetActive(false);
                _camera.clearFlags = CameraClearFlags.Color;
                _camera.backgroundColor = _defaultBackColor;
                SetRoomShow(false);
                break;

            case "hdr":
                OnGroundedSkyboxIsEnabledChanged(CurrentSettings.GroundedSkybox.IsEnabled.Value);
                if (_isAr)
                {
                    _camera.GetComponent<ARCameraBackground>().enabled = false;
                    _camera.clearFlags = CameraClearFlags.Skybox;
                }
                SetRoomShow(false);
                break;

            case "room":
                _groundedSkybox.gameObject.SetActive(false);
                _camera.clearFlags = CameraClearFlags.Color;
                _camera.backgroundColor = _defaultBackColor;
                SetRoomShow(true);
                break;
        }
    }

    private async void SetRoomShow(bool value)
    {
        if (_roomContainer == null)
        {
            _roomContainer = new GameObject("Room");
            _roomContainer.transform.position = Vector3.zero;
            _roomContainer.transform.rotation = Quaternion.identity;
        }
        _roomContainer.SetActive(value);

        _roomContainer.transform.position = _groundedSkybox.transform.parent.position;
        GameObject plane = GameObject.FindWithTag("ARInfinitePlane");
        if (plane != null)
        {
            Vector3 targetPosition = _roomContainer.transform.position;
            targetPosition.y = plane.transform.position.y;
            _roomContainer.transform.position = targetPosition;
        }
        if (value && _room == null)
        {
            Product room = await new ProductBuilderHelper().BuildProduct("b934becb-6c0b-43b6-aa40-c5148a06d0ae", Array.Empty<Input>(), new Dictionary<string, Input>(), default);
            Destroy(room.Controller);
            _room = room.Root;
            _room.gameObject.SetActive(true);
            _room.SetParent(_roomContainer.transform, true);
            _room.transform.localPosition = Vector3.zero;
        }
    }

    public void OnGroundedSkyboxIsEnabledChanged(bool isActive)
    {
        if (CurrentSettings.Background.Type.Value is "color" or "room")
            isActive = false;
        _groundedSkybox.gameObject.SetActive(isActive);
    }

    public void OnGroundedSkyboxHeightChanged(float height)
    {
        _groundedSkybox.SetHeight(height);
    }

    public void OnGroundedSkyboxRadiusChanged(float radius)
    {
        _groundedSkybox.SetRadius(radius);
    }

    public void OnEnvironmentIntensityChanged(float newIntensity)
    {
        _groundedSkybox.Renderer.material.SetFloat("_Exposure", newIntensity);

        Material mat = GetNewSkyboxMaterial();
        mat.SetFloat("_Exposure", newIntensity);
        RenderSettings.skybox = mat;
        DynamicGI.UpdateEnvironment();

        _reflectionProbe.RenderProbe();
    }

    public void SetSceneRotation(float newRotation)
    {
        _sceneRotation = newRotation;
        if (CurrentSettings == null)
            return;
        OnEnvironmentRotationChanged(CurrentSettings.Environment.Rotation.Value);
        OnLightRotationChanged(CurrentSettings.Light.Rotation.Value);
    }

    public void OnEnvironmentRotationChanged(Quaternion newRotation)
    {
        float rotationY = newRotation.eulerAngles.y;
        _groundedSkybox.Renderer.material.SetFloat("_Rotation", rotationY + _offsetRotation + 90 - _sceneRotation);

        Material mat = GetNewSkyboxMaterial();
        mat.SetFloat("_Rotation", rotationY + _offsetRotation - _sceneRotation);
        RenderSettings.skybox = mat;
        DynamicGI.UpdateEnvironment();

        _reflectionProbe.RenderProbe();
    }

    private void OnEnvironmentResolutionChanged(string _)
    {
        OnEnvironmentNameChanged(CurrentSettings.Environment.Name.Value);
    }

    public async void OnEnvironmentNameChanged(string skyboxName)
    {
        string fileName = "brown_photostudio_02";
        if (!string.IsNullOrEmpty(skyboxName))
            fileName = skyboxName;

        var url = $"464c2ccc-e2e3-4afd-935f-51a411dd8541/{fileName}_{CurrentSettings.Environment.Resolution.Value}.hdr";
        var texture = await LoadTextureAsync(url);

        SetSkybox(texture);
    }

    public void SetSkybox(Texture2D texture)
    {
        _groundedSkybox.Renderer.material.SetTexture("_MainTex", texture);
        Material mat = GetNewSkyboxMaterial();
        mat.SetTexture("_MainTex", texture);
        OnEnvironmentIntensityChanged(CurrentSettings.Environment.Intensity.Value);
        OnEnvironmentRotationChanged(CurrentSettings.Environment.Rotation.Value);
        RenderSettings.skybox = mat;

        _reflectionProbe.RenderProbe();
        DynamicGI.UpdateEnvironment();
    }

    private Material GetNewSkyboxMaterial()
    {
        Material oldMaterial = RenderSettings.skybox;
        Material result = new(oldMaterial != null ? oldMaterial : _skyboxMaterial);
        if (oldMaterial.GetInstanceID() < 0)//Проверяем был ли создан материал в рантайме
            Destroy(oldMaterial);
        return result;
    }

    private async UniTask<Texture2D> LoadTextureAsync(string url)
    {
        EntityPath path = new($"s123://calculationResults/{url}");
        EntityContainer<TextureEntity> container = new(path);
        TextureEntity entity = await container.Get();

        if (entity != null)
            return await entity.Get(MapType.HDR);

        return null;
    }

    public void OnLightIsOnChanged(bool isOn)
    {
        _graphicsController.SetAdditionalLight(isOn);
    }

    private void OnLightRotationChanged(Quaternion newRotation)
    {
        _lighting.rotation = newRotation * Quaternion.Euler(0, _sceneRotation, 0);
    }

    public void OnLightIntensityChanged(float value)
    {
        _graphicsController.Lights[0].intensity = value + 0.01f;

        Color shadowColor = new(0, 0, 0, Mathf.Clamp01(value) * 0.5f);
        if (_shadowPlaneMat != null)
            _shadowPlaneMat.SetColor(SHADOW_COLOR_PARAM, shadowColor);

        var infPlanes = GameObject.FindGameObjectsWithTag("ARInfinitePlane");
        foreach (var plane in infPlanes)
            plane.GetComponent<MeshRenderer>().material = _shadowPlaneMat;
    }

    private void OnChangeGraphicsTier(int tier)
    {
        if (CurrentSettings == null)
            return;
        _graphicsController.SetAdditionalLight(CurrentSettings.Light.IsOn.Value);
    }

    private void OnActiveCountChanged(int count)
    {
        if (CurrentSettings == null)
            return;
        _graphicsController.SetAdditionalLight(CurrentSettings.Light.IsOn.Value);
    }

    private async void Init()
    {
        ProductController.OnActiveCountChanged += OnActiveCountChanged;
        _graphicsController.OnChangeGraphicsTier += OnChangeGraphicsTier;

        _shadowPlaneMat = ApplicationServices.GetService<ApplicationConfigExtended>().ShadowPlaneMaterial;

        _isInitialized = true;

        await UniTask.WaitForSeconds(1);

        DynamicGI.UpdateEnvironment();
        _reflectionProbe.RenderProbe();
    }

    private async UniTask FindCamera()
    {
        while (_camera == null)
        {
            await UniTask.NextFrame();
            _camera = FindObjectsByType<Camera>(FindObjectsSortMode.None).FirstOrDefault(c => c.CompareTag("MainCamera") && c.gameObject.scene == gameObject.scene);
        }
    }

    private void Awake()
    {
        Init();
    }

    private void RemoveCurrentSettingsListeners()
    {
        if (CurrentSettings == null)
            return;

        //_currentSettings.Environment.Type.OnValueChanged.RemoveListener();
        CurrentSettings.Environment.Name.OnValueChanged.RemoveListener(OnEnvironmentNameChanged);
        //_currentSettings.Environment.CustomId.OnValueChanged.RemoveListener();
        CurrentSettings.Environment.Resolution.OnValueChanged.RemoveListener(OnEnvironmentResolutionChanged);
        CurrentSettings.Environment.Rotation.OnValueChanged.RemoveListener(OnEnvironmentRotationChanged);
        CurrentSettings.Environment.Intensity.OnValueChanged.RemoveListener(OnEnvironmentIntensityChanged);

        CurrentSettings.Background.Type.OnValueChanged.RemoveListener(OnBackgroundTypeChanged);
        //_currentSettings.Background.Blurriness.OnValueChanged.RemoveListener();
        //_currentSettings.Background.Color.OnValueChanged.RemoveListener();
        //_currentSettings.Background.ImageId.OnValueChanged.RemoveListener();

        CurrentSettings.GroundedSkybox.IsEnabled.OnValueChanged.RemoveListener(OnGroundedSkyboxIsEnabledChanged);
        CurrentSettings.GroundedSkybox.Height.OnValueChanged.RemoveListener(OnGroundedSkyboxHeightChanged);
        CurrentSettings.GroundedSkybox.Radius.OnValueChanged.RemoveListener(OnGroundedSkyboxRadiusChanged);

        CurrentSettings.Light.IsOn.OnValueChanged.RemoveListener(OnLightIsOnChanged);
        CurrentSettings.Light.Intensity.OnValueChanged.RemoveListener(OnLightIntensityChanged);
        CurrentSettings.Light.Rotation.OnValueChanged.RemoveListener(OnLightRotationChanged);
        //_currentSettings.Light.Color.OnValueChanged.RemoveListener();
    }

    public async Task SetCurrentSettings(WorldSettings settings)
    {
        RemoveCurrentSettingsListeners();

        await FindCamera();
        CurrentSettings = settings;
        //_currentSettings.Environment.Type.OnValueChanged.AddListener();
        CurrentSettings.Environment.Name.OnValueChanged.AddListener(OnEnvironmentNameChanged);
        OnEnvironmentNameChanged(CurrentSettings.Environment.Name.Value);
        //_currentSettings.Environment.CustomId.OnValueChanged.AddListener();
        CurrentSettings.Environment.Resolution.OnValueChanged.AddListener(OnEnvironmentResolutionChanged);
        OnEnvironmentResolutionChanged(CurrentSettings.Environment.Resolution.Value);
        CurrentSettings.Environment.Rotation.OnValueChanged.AddListener(OnEnvironmentRotationChanged);
        OnEnvironmentRotationChanged(CurrentSettings.Environment.Rotation.Value);
        CurrentSettings.Environment.Intensity.OnValueChanged.AddListener(OnEnvironmentIntensityChanged);
        OnEnvironmentIntensityChanged(CurrentSettings.Environment.Intensity.Value);

        CurrentSettings.Background.Type.OnValueChanged.AddListener(OnBackgroundTypeChanged);
        OnBackgroundTypeChanged(CurrentSettings.Background.Type.Value);
        //_currentSettings.Background.Blurriness.OnValueChanged.AddListener();
        //_currentSettings.Background.Color.OnValueChanged.AddListener();
        //_currentSettings.Background.ImageId.OnValueChanged.AddListener();

        CurrentSettings.GroundedSkybox.IsEnabled.OnValueChanged.AddListener(OnGroundedSkyboxIsEnabledChanged);
        OnGroundedSkyboxIsEnabledChanged(CurrentSettings.GroundedSkybox.IsEnabled.Value);
        CurrentSettings.GroundedSkybox.Height.OnValueChanged.AddListener(OnGroundedSkyboxHeightChanged);
        OnGroundedSkyboxHeightChanged(CurrentSettings.GroundedSkybox.Height.Value);
        CurrentSettings.GroundedSkybox.Radius.OnValueChanged.AddListener(OnGroundedSkyboxRadiusChanged);
        OnGroundedSkyboxRadiusChanged(CurrentSettings.GroundedSkybox.Radius.Value);

        CurrentSettings.Light.IsOn.OnValueChanged.AddListener(OnLightIsOnChanged);
        OnLightIsOnChanged(CurrentSettings.Light.IsOn.Value);
        CurrentSettings.Light.Intensity.OnValueChanged.AddListener(OnLightIntensityChanged);
        OnLightIntensityChanged(CurrentSettings.Light.Intensity.Value);
        CurrentSettings.Light.Rotation.OnValueChanged.AddListener(OnLightRotationChanged);
        OnLightRotationChanged(CurrentSettings.Light.Rotation.Value);
        //_currentSettings.Light.Color.OnValueChanged.AddListener();
        OnSettingsChanged.Invoke(settings);
    }

    private void OnDestroy()
    {
        RemoveCurrentSettingsListeners();
    }
}
