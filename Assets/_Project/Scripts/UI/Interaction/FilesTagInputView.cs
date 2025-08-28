using System.Collections.Generic;
using System.Linq;
using System.Threading;
using UnityEngine;
using VARTube.Core.Entity;
using VARTube.Core.Services;
using VARTube.Interaction;
using VARTube.Network;
using VARTube.Network.Models;
using VARTube.ProductBuilder.Design.Composite;

namespace VARTube.UI.Interaction
{
    public class FilesTagInputView : InputView
    {
        [SerializeField]
        private Transform _content;
        [SerializeField]
        private FileInputViewItem _itemPrefab;

        private Dictionary<string, FileInputViewItem> _items = new();

        private FileInputViewItem _current;

        private CancellationTokenSource _cancellationSource = new();

        public override async void Setup(EntityPath productPath, VARTube.Interaction.Input input)
        {
            NetworkService networkService = ApplicationServices.GetService<NetworkService>();

            InputFilesTagSettings settings = input.Settings as InputFilesTagSettings;
            if(settings.HasNone)
            {
                FileInputViewItem noneItem = Instantiate(_itemPrefab, _content);
                noneItem.Setup("Не выбрано");
                _items.Add("", noneItem);
                noneItem.OnClick.AddListener(() =>
                {
                    _current?.Deselect();
                    _current = noneItem;
                    _current.Select();
                    input.Value = "";
                    OnValueChanged.Invoke();
                });
            }

            PaginatedCalculation calculations = await networkService.GetCalculations(0, 100, _cancellationSource.Token, settings.SearchTags.Select(t => t.Value).ToArray());

            foreach(Calculation calculation in calculations.calculations)
            {
                FileInputViewItem item = Instantiate(_itemPrefab, _content);
                item.Setup(calculation);
                Calculation localCalculation = calculation;
                _items.Add(calculation.guid, item);
                item.OnClick.AddListener(() =>
                {
                    _current?.Deselect();
                    _current = item;
                    _current.Select();
                    input.Value = localCalculation.idCalculationType == CalculationType.MATERIAL ? 
                                        $"s123mat://{localCalculation.guid}" : 
                                        $"s123calc://{localCalculation.guid}";
                    OnValueChanged.Invoke();
                });
            }
            _current = _items[input.Value.ToString().Replace("s123mat://", "").Replace("s123calc://", "")];
            _current.Select();
            base.Setup(productPath, input);
        }

        private void OnDestroy()
        {
            _cancellationSource.Cancel();
        }
    }
}
