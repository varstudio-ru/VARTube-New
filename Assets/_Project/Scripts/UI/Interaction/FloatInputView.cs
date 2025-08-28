using UnityEngine;
using VARTube.Core.Entity;
using VARTube.Interaction;
using Product = VARTube.ProductBuilder.Design.Composite.Product;
namespace VARTube.UI.Interaction
{
    public class FloatInputView : InputView
    {
        [SerializeField] private RulerSlider _slider;

        protected override void Awake()
        {
            base.Awake();
            _body.SetActive(true);
        }

        public override async void Setup(EntityPath productPath, VARTube.Interaction.Input input)
        {
            InputFloatSettings settings = input.Settings as InputFloatSettings;
            await _slider.Setup(settings.Min, settings.Max);
            _slider.SetValue(float.Parse(input.Value.ToString()));
            _slider.OnValueChanged.AddListener(newValue =>
            {
                input.Value = newValue;
                OnValueChanged.Invoke();
            } );
            base.Setup(productPath, input);
        }
    }
}