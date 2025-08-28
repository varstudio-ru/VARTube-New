using System;
using System.Collections.Generic;
using System.Globalization;
using Cysharp.Threading.Tasks;
using RailwayMuseum.UI.NewSwipePanel;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using VARTube.ProductBuilder.Design.Composite;
using VARTube.Showroom;

//[DefaultExecutionOrder(1)]
public class SkyboxSettingsView : MonoBehaviour
{
    [SerializeField] private SkyboxSettingsController _controller;
    [SerializeField] private SwipePanel _swipePanel;

    [Header("Components")]
    [SerializeField] private TMP_Dropdown _backType;

    [SerializeField] private Toggle _isGrounded;
    [SerializeField] private TMP_InputField _height;
    [SerializeField] private TMP_InputField _radius;

    [SerializeField] private SkyboxDropdownView _map;

    [SerializeField] private Slider _brightnessSlider;
    [SerializeField] private TMP_InputField _brightnessInput;

    [SerializeField] private Button _rotateButton;
    [SerializeField] private TMP_InputField _rotateInput;

    [SerializeField] private Toggle _isLightOn;
    [SerializeField] private Slider _lightRotateXSlider;
    [SerializeField] private TMP_InputField _lightRotateXInput;
    [SerializeField] private Slider _lightRotateYSlider;
    [SerializeField] private TMP_InputField _lightRotateYInput;
    [SerializeField] private Slider _lightIntensitySlider;
    [SerializeField] private TMP_InputField _lightIntensityInput;

    [SerializeField] private Button[] _resolutionButtons;
    [SerializeField] private RectTransform _content;

    [SerializeField] private Button _resetButton;

    [SerializeField] private Button _saveButton;
    [SerializeField] private Button _saveForMaterialButton;

    [Space]
    [SerializeField] private ToggleButton _isLightOnMenuToggle;

    private WorldSettings _currentSettings;

    public void Hide()
    {
        gameObject.SetActive(false);
    }

    private void SetBrightnessWithoutNotify(float brightness)
    {
        _brightnessInput.SetTextWithoutNotify($"{brightness:0.00}");
        _brightnessSlider.SetValueWithoutNotify(brightness);
    }

    private void SetLightIsOnWithoutNotify(bool isOn)
    {
        _isLightOnMenuToggle.SetIsOnWithoutNotify(isOn);
        _isLightOn.SetIsOnWithoutNotify(isOn);
        _lightRotateXSlider.transform.parent.parent.gameObject.SetActive(isOn);
        _lightRotateYSlider.transform.parent.parent.gameObject.SetActive(isOn);
        _lightIntensitySlider.transform.parent.parent.gameObject.SetActive(isOn);
        LayoutRebuilder.ForceRebuildLayoutImmediate(_content);
    }

    private void SetLightIntensityWithoutNotify(float intensity)
    {
        _lightIntensityInput.SetTextWithoutNotify($"{intensity:0.00}");
        _lightIntensitySlider.SetValueWithoutNotify(intensity);
    }

    private void SetLightRotationWithoutNotify(Quaternion rotation)
    {
        Vector3 eulerRotation = rotation.eulerAngles;
        _lightRotateXSlider.SetValueWithoutNotify(eulerRotation.x);
        _lightRotateXInput.SetTextWithoutNotify(eulerRotation.x.ToString(CultureInfo.InvariantCulture));

        _lightRotateYSlider.SetValueWithoutNotify(eulerRotation.y);
        _lightRotateYInput.SetTextWithoutNotify(eulerRotation.y.ToString(CultureInfo.InvariantCulture));
    }

    private void SetGroundedSkyboxIsEnabledWithoutNotify(bool isGrounded)
    {
        _isGrounded.SetIsOnWithoutNotify(isGrounded);
        bool realGrounded = isGrounded && _currentSettings.Background.Type.Value == "hdr";
        _height.transform.parent.gameObject.SetActive(realGrounded);
        _radius.transform.parent.gameObject.SetActive(realGrounded);

        LayoutRebuilder.ForceRebuildLayoutImmediate(_content);
    }

    private void SetGroundedSkyboxHeightWithoutNotify(float value)
    {
        _height.text = value.ToString(CultureInfo.InvariantCulture);
    }

    private void SetGroundedSkyboxRadiusWithoutNotify(float value)
    {
        _radius.text = value.ToString(CultureInfo.InvariantCulture);
    }

    private void SetRotationWithoutNotify(Quaternion rotation)
    {
        _rotateInput.SetTextWithoutNotify(rotation.eulerAngles.y.ToString(CultureInfo.InvariantCulture));
    }

    private async void SetBackgroundTypeWithoutNotify(string backgroundName)
    {
        int backgroundIndex = BackgroundSettings.BackgroundTypes[backgroundName].index;
        _backType.SetValueWithoutNotify(backgroundIndex);
        UpdateGroundControls(backgroundIndex);
        await UniTask.NextFrame();

        LayoutRebuilder.ForceRebuildLayoutImmediate(_content);
    }

    private void UpdateGroundControls(int backType)
    {
        bool active = backType switch
        {
            0 => false,
            _ => true,
        };

        _isGrounded.transform.parent.gameObject.SetActive(active);
        _height.transform.parent.gameObject.SetActive(_isGrounded.isOn && _isGrounded.transform.parent.gameObject.activeSelf);
        _radius.transform.parent.gameObject.SetActive(_isGrounded.isOn && _isGrounded.transform.parent.gameObject.activeSelf);
    }

    private void RemoveCurrentSettingsListeners()
    {
        _resetButton.onClick.RemoveAllListeners();

        _map.OnSkyboxChanged.RemoveAllListeners();
        _rotateInput.onValueChanged.RemoveAllListeners();
        _rotateButton.onClick.RemoveAllListeners();
        _brightnessInput.onValueChanged.RemoveAllListeners();
        _brightnessSlider.onValueChanged.RemoveAllListeners();
        _backType.onValueChanged.RemoveAllListeners();
        _isGrounded.onValueChanged.RemoveAllListeners();
        _height.onValueChanged.RemoveAllListeners();
        _radius.onValueChanged.RemoveAllListeners();
        _isLightOn.onValueChanged.RemoveAllListeners();
        _lightIntensityInput.onValueChanged.RemoveAllListeners();
        _lightIntensitySlider.onValueChanged.RemoveAllListeners();
        _lightRotateXInput.onValueChanged.RemoveAllListeners();
        _lightRotateXSlider.onValueChanged.RemoveAllListeners();
        _lightRotateYInput.onValueChanged.RemoveAllListeners();
        _lightRotateYSlider.onValueChanged.RemoveAllListeners();
        foreach (Button button in _resolutionButtons)
            button.onClick.RemoveAllListeners();

        if (_currentSettings == null)
            return;
        _currentSettings.Environment.Name.OnValueChanged.RemoveListener(_map.SetValueWithoutNotify);
        _currentSettings.Environment.Rotation.OnValueChanged.RemoveListener(SetRotationWithoutNotify);
        _currentSettings.Environment.Intensity.OnValueChanged.RemoveListener(SetBrightnessWithoutNotify);
        _currentSettings.Background.Type.OnValueChanged.RemoveListener(SetBackgroundTypeWithoutNotify);
        _currentSettings.GroundedSkybox.IsEnabled.OnValueChanged.RemoveListener(SetGroundedSkyboxIsEnabledWithoutNotify);
        _currentSettings.GroundedSkybox.Height.OnValueChanged.RemoveListener(SetGroundedSkyboxHeightWithoutNotify);
        _currentSettings.GroundedSkybox.Radius.OnValueChanged.RemoveListener(SetGroundedSkyboxRadiusWithoutNotify);
        _currentSettings.Light.IsOn.OnValueChanged.RemoveListener(_isLightOn.SetIsOnWithoutNotify);
        _isLightOnMenuToggle.OnClick -= _currentSettings.Light.IsOn.OverrideValue;
        _currentSettings.Light.Intensity.OnValueChanged.RemoveListener(SetLightIntensityWithoutNotify);
        _currentSettings.Light.Rotation.OnValueChanged.RemoveListener(SetLightRotationWithoutNotify);
    }

    private void OnSettingsChanged(WorldSettings currentSettings)
    {
        if (_currentSettings != null)
            RemoveCurrentSettingsListeners();
        _currentSettings = currentSettings;

        _resetButton.onClick.AddListener(currentSettings.ResetOverride);

        _map.SetValueWithoutNotify(currentSettings.Environment.Name.Value);
        currentSettings.Environment.Name.OnValueChanged.AddListener(_map.SetValueWithoutNotify);
        _map.OnSkyboxChanged.AddListener(currentSettings.Environment.Name.OverrideValue);

        SetRotationWithoutNotify(currentSettings.Environment.Rotation.Value);
        currentSettings.Environment.Rotation.OnValueChanged.AddListener(SetRotationWithoutNotify);
        _rotateInput.onValueChanged.AddListener(currentSettings.Environment.Rotation.OverrideY);
        _rotateButton.onClick.AddListener(currentSettings.Environment.Rotation.Rotate90YAxisDegreesAndOverride);

        SetBrightnessWithoutNotify(currentSettings.Environment.Intensity.Value);
        currentSettings.Environment.Intensity.OnValueChanged.AddListener(SetBrightnessWithoutNotify);
        _brightnessInput.onValueChanged.AddListener(currentSettings.Environment.Intensity.OverrideValueFromString);
        _brightnessSlider.onValueChanged.AddListener(currentSettings.Environment.Intensity.OverrideValue);

        SetBackgroundTypeWithoutNotify(currentSettings.Background.Type.Value);
        currentSettings.Background.Type.OnValueChanged.AddListener(SetBackgroundTypeWithoutNotify);
        _backType.onValueChanged.AddListener(currentSettings.Background.OverrideBackgroundTypeByIndex);

        SetGroundedSkyboxIsEnabledWithoutNotify(currentSettings.GroundedSkybox.IsEnabled.Value);
        currentSettings.GroundedSkybox.IsEnabled.OnValueChanged.AddListener(SetGroundedSkyboxIsEnabledWithoutNotify);
        _isGrounded.onValueChanged.AddListener(currentSettings.GroundedSkybox.IsEnabled.OverrideValue);

        SetGroundedSkyboxHeightWithoutNotify(currentSettings.GroundedSkybox.Height.Value);
        currentSettings.GroundedSkybox.Height.OnValueChanged.AddListener(SetGroundedSkyboxHeightWithoutNotify);
        _height.onValueChanged.AddListener(currentSettings.GroundedSkybox.Height.OverrideValueFromString);

        SetGroundedSkyboxRadiusWithoutNotify(currentSettings.GroundedSkybox.Radius.Value);
        currentSettings.GroundedSkybox.Radius.OnValueChanged.AddListener(SetGroundedSkyboxRadiusWithoutNotify);
        _radius.onValueChanged.AddListener(currentSettings.GroundedSkybox.Radius.OverrideValueFromString);

        SetLightIsOnWithoutNotify(currentSettings.Light.IsOn.Value);
        currentSettings.Light.IsOn.OnValueChanged.AddListener(SetLightIsOnWithoutNotify);
        _isLightOn.onValueChanged.AddListener(currentSettings.Light.IsOn.OverrideValue);
        _isLightOnMenuToggle.OnClick += currentSettings.Light.IsOn.OverrideValue;


        SetLightIntensityWithoutNotify(currentSettings.Light.Intensity.Value);
        currentSettings.Light.Intensity.OnValueChanged.AddListener(SetLightIntensityWithoutNotify);
        _lightIntensityInput.onValueChanged.AddListener(currentSettings.Light.Intensity.OverrideValueFromString);
        _lightIntensitySlider.onValueChanged.AddListener(currentSettings.Light.Intensity.OverrideValue);

        SetLightRotationWithoutNotify(currentSettings.Light.Rotation.Value);
        currentSettings.Light.Rotation.OnValueChanged.AddListener(SetLightRotationWithoutNotify);
        _lightRotateXInput.onValueChanged.AddListener(currentSettings.Light.Rotation.OverrideX);
        _lightRotateXSlider.onValueChanged.AddListener(currentSettings.Light.Rotation.OverrideX);
        _lightRotateYInput.onValueChanged.AddListener(currentSettings.Light.Rotation.OverrideY);
        _lightRotateYSlider.onValueChanged.AddListener(currentSettings.Light.Rotation.OverrideY);

        for (int i = 0; i < _resolutionButtons.Length; i++)
        {
            string resolutionString;
            switch (i)
            {
                case 0:
                    resolutionString = "1k";
                    break;
                case 1:
                    resolutionString = "2k";
                    break;
                case 2:
                    resolutionString = "4k";
                    break;
                case 3:
                    resolutionString = "8k";
                    break;
                default:
                    resolutionString = "1k";
                    break;

            }
            _resolutionButtons[i].onClick.AddListener(() => _currentSettings.Environment.Resolution.OverrideValue(resolutionString));
        }
    }

    private void Awake()
    {
        _controller.OnSettingsChanged.AddListener(OnSettingsChanged);
        _saveButton.onClick.AddListener(FindFirstObjectByType<ProductShowroom>().SaveWorldForCurrentProject);
    }

    private void OnDestroy()
    {
        RemoveCurrentSettingsListeners();
    }
}
