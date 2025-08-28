using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using VARTube.Core.Entity;
using VARTube.Interaction;
using VARTube.Network.Models;
using VARTube.ProductBuilder.Design.Composite;

namespace VARTube.UI.Interaction
{
    public class CatalogInputView : InputView
    {
        [SerializeField]
        private CatalogView _catalogView;
        
        private Dictionary<string, FileInputViewItem> _items = new();

        private FileInputViewItem _current;
        
        public override void Setup(EntityPath productPath, VARTube.Interaction.Input input)
        {
            InputCatalogSettings settings = input.Settings as InputCatalogSettings;

            string startValue = input.Value.ToString().Replace("s123calc://", "").Replace("s123mat://", "");
            _catalogView.Setup(settings.Values, startValue, settings.HasNone);
            _catalogView.OnItemSelected.AddListener(newValue =>
            {
                if(settings.Target == CalculationType.MATERIAL)
                    input.Value = $"s123mat://{newValue}";
                else
                    input.Value = $"s123calc://{newValue}";
                OnValueChanged.Invoke();
            } );
            _catalogView.OnCatalogChanged.AddListener(_ =>
            {
                GetComponentInChildren<ScrollRect>(true).horizontalNormalizedPosition = 0;
            } );
            
            base.Setup( productPath, input );
        }
    }
}
