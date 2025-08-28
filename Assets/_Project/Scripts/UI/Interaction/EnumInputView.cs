using System.Collections.Generic;
using Cysharp.Threading.Tasks;
using UnityEngine;
using VARTube.Core.Entity;
using VARTube.Interaction;
using VARTube.ProductBuilder.Design.Composite;

namespace VARTube.UI.Interaction
{
    public class EnumInputView : InputView
    {
        [SerializeField] private RectTransform _itemsContainer;
        [SerializeField] private EnumInputViewItem _itemPrefab;

        private Dictionary<string, EnumInputViewItem> _items = new();
        private EnumInputViewItem _current;
        
        public override void Setup(EntityPath productPath, VARTube.Interaction.Input input)
        {
            InputEnumSettings settings = input.Settings as InputEnumSettings;
            foreach(InputStringValue option in settings.Values)
            {
                string targetText = string.IsNullOrEmpty(option.Verbose) ? option.Value : option.Verbose;
                EnumInputViewItem item = Instantiate(_itemPrefab, _itemsContainer);
                item.SetText(targetText);
                item.SetSelected(option.Value == input.Value.ToString() ).Forget();
                if(option.Value == input.Value.ToString())
                    _current = item;
                string optionValue = option.Value;
                item.OnSelected.AddListener(() =>
                {
                    if( _current )
                        _current.SetSelected(false, true).Forget();
                    _current = _items[optionValue];
                    _current.SetSelected(true, true).Forget();
                    input.Value = optionValue;
                    OnValueChanged.Invoke();
                } );
                _items.Add(optionValue, item);
            }
            base.Setup(productPath, input);
        }
    }
}