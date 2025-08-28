using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UI;
using VARTube.Input;
using VARTube.ProductBuilder.Controller;

namespace VARTube.UI.ProductsList
{
    public class ProductsList : MonoBehaviour
    {
        [SerializeField] private RectTransform _content;
        [SerializeField] private ToggleButton _toggleAllVisibilityButton;
        [SerializeField] private ToggleButton _toggleAllTransformLockButton;

        [SerializeField] private ProductsListItem _itemPrefab;

        private List<ProductsListItem> _items = new();
        private ProductController[] _allControllers;
        private AnimatedPanel _panel;

        private void Awake()
        {
            _panel = GetComponent<AnimatedPanel>();
            _toggleAllVisibilityButton.OnClick += SetGlobalVisibility;
            _toggleAllTransformLockButton.OnClick += SetGlobalTransformLock;
            ProductController.OnActiveCountChanged += OnActiveProductCountChanged;
            _panel.OnChangeVisibility += (isVisible) =>
            {
                if (isVisible)
                    Show();
            };
        }

        private void OnActiveProductCountChanged(int count)
        {
            Show();
        }

        private void Clear()
        {
            if (_content == null)
                return;

            for (int i = _content.childCount - 1; i >= 0; i--)
                Destroy(_content.GetChild(i).gameObject);

            _items.Clear();
        }

        public void Show()
        {
            Clear();
            _allControllers = FindObjectsByType<ProductController>(FindObjectsInactive.Include, FindObjectsSortMode.None);
            foreach (ProductController controller in _allControllers)
            {
                ProductsListItem item = Instantiate(_itemPrefab, _content);
                item.Setup(controller);
                item.OnStateChanged.AddListener(UpdateState);
                _items.Add(item);
            }
            UpdateState();
        }

        private void UpdateState()
        {
            bool isAllHidden = _allControllers.All(c => !c.gameObject.activeSelf);
            _toggleAllVisibilityButton.SetIsOnWithoutNotify(!isAllHidden);
            bool isAllLocked = _allControllers.All(c => c.GetComponent<Draggable>()?.IsLocked ?? false);
            _toggleAllTransformLockButton.SetIsOnWithoutNotify(isAllLocked);
        }

        private void SetGlobalVisibility(bool value)
        {
            for (int i = 0; i < _items.Count; i++)
                _items[i].SetVisibility(value);

        }

        private void SetGlobalTransformLock(bool value)
        {
            foreach (ProductsListItem item in _items)
                item.SetLockTransform(value);

            UpdateState();
        }
    }
}
