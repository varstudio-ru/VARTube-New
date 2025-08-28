using TMPro;
using UnityEngine;
using VARTube.Core.Entity;
using VARTube.ProductBuilder.Design.Composite;

namespace VARTube.UI.Interaction
{
    public class StringInputView : InputView
    {
        [SerializeField]
        private TMP_InputField _inputField;
        
        public override void Setup(EntityPath productPath, VARTube.Interaction.Input input)
        {
            _inputField.text = input.Value.ToString();
            _inputField.onEndEdit.AddListener(newValue =>
            {
                input.Value = newValue;
                OnValueChanged.Invoke();
            } );
            base.Setup(productPath, input);
        }
    }
}