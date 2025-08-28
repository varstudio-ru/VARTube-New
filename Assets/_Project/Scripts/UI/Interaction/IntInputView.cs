using UnityEngine;
using VARTube.Core.Entity;
using VARTube.Interaction;
using VARTube.ProductBuilder.Design.Composite;

namespace VARTube.UI.Interaction
{
    public class IntInputView : InputView
    {
        [SerializeField] private RulerSlider _slider;
        
        protected override void Awake()
        {
            base.Awake();
            _body.SetActive(true);
        }
        
        public override async void Setup(EntityPath productPath, VARTube.Interaction.Input input)
        {
            InputIntSettings settings = input.Settings as InputIntSettings;
            await _slider.Setup(settings.Min, settings.Max);
            _slider.SetValue(int.Parse(input.Value.ToString()));
            _slider.OnValueChanged.AddListener(newValue =>
            {
                input.Value = Mathf.RoundToInt(newValue);
                OnValueChanged.Invoke();
            } );
            base.Setup(productPath, input);
        }
    }
}