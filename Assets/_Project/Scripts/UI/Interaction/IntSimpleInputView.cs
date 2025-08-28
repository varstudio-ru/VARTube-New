using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using VARTube.Core.Entity;
using VARTube.Interaction;
using VARTube.ProductBuilder.Design.Composite;
using VARTube.UI.Interaction;
using Input = VARTube.Interaction.Input;

public class IntSimpleInputView : InputView
{
    [SerializeField] private Slider _slider;
    [SerializeField] private TMP_Text _minText;
    [SerializeField] private TMP_Text _maxText;
    [SerializeField] private TMP_Text _currentText;

    public override void Setup(EntityPath productPath, Input input)
    {
        InputIntSettings settings = input.Settings as InputIntSettings;
        if(settings == null)
            throw new InvalidCastException("Wrong settings type");
        _slider.minValue = settings.Min;
        _slider.maxValue = settings.Max;
        _slider.value = int.Parse(input.Value.ToString());
        _minText.text = settings.Min.ToString();
        _maxText.text = settings.Max.ToString();
        _currentText.text = ((int)_slider.value).ToString();
        _slider.wholeNumbers = true;
        
        _slider.onValueChanged.AddListener(newValue =>
        {
            input.Value = Mathf.Round( newValue );
            OnValueChanged.Invoke();
            _currentText.text = ((int)newValue).ToString();
        });
        
        base.Setup(productPath, input);
    }
}
