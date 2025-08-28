using System.Collections.Generic;
using UnityEngine;
using VARTube.Core.Entity;
using VARTube.Interaction;
using VARTube.ProductBuilder.Design.Composite;

namespace VARTube.UI.Interaction
{
    public class FilesInputView : InputView
    {
        [SerializeField]
        private Transform _content;
        [SerializeField]
        private FileInputViewItem _itemPrefab;
        
        private Dictionary<string, FileInputViewItem> _items = new();

        private FileInputViewItem _current;
        
        public override void Setup(EntityPath productPath, VARTube.Interaction.Input input)
        {
            InputFilesSettings settings = input.Settings as InputFilesSettings;
            if(settings.HasNone)
            {
                FileInputViewItem noneItem = Instantiate(_itemPrefab, _content);
                noneItem.Setup("Не выбрано");
                _items.Add("", noneItem);
                noneItem.OnClick.AddListener(() =>
                {
                    _current.Deselect();
                    _current = noneItem;
                    _current.Select();
                    input.Value = "";
                    OnValueChanged.Invoke();
                } );
            }
            foreach(InputFileValue value in settings.Values)
            {
                FileInputViewItem item = Instantiate(_itemPrefab, _content);
                item.Setup( productPath, value );
                _items.Add(value.Value, item );
                InputFileValue localValue = value;
                item.OnClick.AddListener(() =>
                {
                    _current.Deselect();
                    _current = item;
                    _current.Select();
                    input.Value = localValue.Value;
                    OnValueChanged.Invoke();
                } );
            }
            _current = _items[input.Value.ToString()];
            _current.Select();
            base.Setup(productPath, input);
        }
    }
}
