using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using VARTube.Core.Entity;
using VARTube.Interaction;
using VARTube.ProductBuilder.Design.Composite;
using VARTube.UI.Interaction;
using Input = VARTube.Interaction.Input;

public class FloatSimpleInputView : InputView
{
    [SerializeField] private Slider _slider;
    [SerializeField] private TMP_Text _minText;
    [SerializeField] private TMP_Text _maxText;
    [SerializeField] private TMP_Text _currentText;

    public override void Setup(EntityPath productPath, Input input)
    {
        InputFloatSettings settings = input.Settings as InputFloatSettings;
        if(settings == null)
            throw new InvalidCastException("Wrong settings type");
        _slider.minValue = settings.Min;
        _slider.maxValue = settings.Max;
        _slider.value = float.Parse(input.Value.ToString());
        if(!string.IsNullOrEmpty(settings.MinText))
            _minText.text = settings.MinText;
        else
            _minText.text = settings.Min.ToString("0");
        if(!string.IsNullOrEmpty(settings.MaxText))
            _maxText.text = settings.MaxText;
        else
            _maxText.text = settings.Max.ToString("0");

        _currentText.text = _slider.value.ToString("0");
        
        _slider.onValueChanged.AddListener(newValue =>
        {
            input.Value = newValue;
            OnValueChanged.Invoke();
            _currentText.text = newValue.ToString("0");
        });
        
        base.Setup(productPath, input);
    }
}
