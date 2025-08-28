using Cysharp.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
using VARTube.Core.Services;
using VARTube.Network;
using VARTube.Network.Models;
using VARTube.UI.Interaction;

namespace VARTube.UI
{
    public class CatalogView : MonoBehaviour
    {
        [SerializeField]
        private Transform _content;
        [SerializeField]
        private Button _noneButton;
        [SerializeField]
        private FileInputViewItem _itemPrefab;
        [SerializeField]
        private FileInputViewItem _backItemPrefab;

        private string _selectedGuid;

        private CancellationTokenSource _cancellationSource = new();

        private List<WorkplaceStructure> roots = new();

        private NetworkService _networkService;

        private FileInputViewItem _backItem;

        private Stack<int> history = new();

        public UnityEvent<string> OnItemSelected = new();
        public UnityEvent<bool> OnBackButtonVisibilityChanged = new();
        public UnityEvent<int> OnCatalogChanged = new();

        public async void Setup(List<int> catalogIds, string selectedItemGuid, bool hasNone)
        {
            _networkService = ApplicationServices.GetService<NetworkService>();

            if (_noneButton != null)
            {
                _noneButton.gameObject.SetActive(hasNone);
                if (hasNone)
                {
                    _noneButton.onClick.AddListener(() =>
                    {
                        OnItemSelected.Invoke(null);
                    });
                }
            }

            if (catalogIds.Count == 1)
            {
                await AddRoots(await _networkService.GetCatalog(-1, catalogIds.First(), _cancellationSource.Token));
            }
            else
            {
                await AddRoots(catalogIds);
            }

            if (string.IsNullOrEmpty(selectedItemGuid))
            {
                ShowRootCatalogs();
            }
            else
            {
                _selectedGuid = selectedItemGuid;
                int[] catalogsPath = await _networkService.GetCatalogPath(selectedItemGuid);

                OpenPath(catalogsPath);
            }
        }

        private async UniTask AddRoots(List<int> catalogIds)
        {
            foreach (int id in catalogIds)
                roots.Add(await _networkService.GetWorkplaceStructure(id, _cancellationSource.Token));
        }

        private async UniTask AddRoots(WorkplaceStructure[] catalogs)
        {
            roots.AddRange(catalogs);
        }

        private bool IsRoot(int catalogId) => roots.Any(r => r.id == catalogId);

        private void Clear()
        {
            foreach (Transform item in _content)
                Destroy(item.gameObject);
        }

        private void ShowRootCatalogs()
        {
            history.Clear();
            OnBackButtonVisibilityChanged.Invoke(false);
            OnCatalogChanged.Invoke(-1);
            Clear();
            foreach (WorkplaceStructure root in roots)
            {
                FileInputViewItem item = Instantiate(_itemPrefab, _content);
                item.Setup(root);
                int id = root.id;
                item.OnClick.AddListener(() =>
                {
                    history.Push(id);
                    OpenCatalog(id);
                });
            }
        }

        public void MoveUp()
        {
            if (history.Count == 1)
                ShowRootCatalogs();
            else
                OpenCatalog(history.Pop());
        }

        private void OpenPath(int[] catalogsPath)
        {
            history.Clear();
            int parentId = catalogsPath[^1];
            var historyStartIndex = 0;

            for (int i = 0; i < catalogsPath.Length; i++)
            {
                if (IsRoot(catalogsPath[i]))
                {
                    historyStartIndex = i;
                    break;
                }
            }

            if (historyStartIndex > 0)
                for (int i = historyStartIndex - 1; i < catalogsPath.Length - 1; i++)
                    history.Push(catalogsPath[i]);

            OpenCatalog(parentId);
        }

        private async void OpenCatalog(int catalogId)
        {
            Clear();
            bool showBackButton = history.Count != 0;

            OnBackButtonVisibilityChanged.Invoke(showBackButton);
            OnCatalogChanged.Invoke(catalogId);

            if (showBackButton && _backItemPrefab)
            {
                _backItem = Instantiate(_backItemPrefab, _content);
                _backItem.Setup("");
                _backItem.OnClick.AddListener(MoveUp);
            }

            WorkplaceStructure[] catalogs = await _networkService.GetCatalog(-1, catalogId, _cancellationSource.Token);
            Dictionary<string, FileInputViewItem> items = new();
            foreach (WorkplaceStructure catalog in catalogs)
            {
                FileInputViewItem item = Instantiate(_itemPrefab, _content);
                item.Setup(catalog);
                WorkplaceStructure localCatalog = catalog;
                item.OnClick.AddListener(() =>
                {
                    if (localCatalog.IsDirectory)
                    {
                        history.Push(catalogId);
                        OpenCatalog(localCatalog.Id);
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(_selectedGuid) && items.TryGetValue(_selectedGuid, out FileInputViewItem currentItem))
                            currentItem.Deselect();
                        item.Select();
                        _selectedGuid = localCatalog.baseCalculationGuid;
                        OnItemSelected.Invoke(_selectedGuid);
                    }
                });
                if (!string.IsNullOrEmpty(_selectedGuid) && catalog.baseCalculationGuid == _selectedGuid)
                {
                    item.Select();
                }
                if (!catalog.IsDirectory)
                    items.Add(catalog.baseCalculationGuid, item);
            }
        }

        private void OnDestroy()
        {
            _cancellationSource.Cancel();
        }
    }
}