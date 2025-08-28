using System.Collections.Generic;
using UnityEngine.Events;
using UnityEngine.UI;
using UnityEngine;

namespace VARTube.UI
{
    [RequireComponent(typeof(ToggleGroup))]
    [DefaultExecutionOrder(-200)]
    public class GenericToggleGroup : MonoBehaviour
    {
        [Header("References")]
        [SerializeField] private RectTransform _container;
        [SerializeField] private ToggleItem _itemPrefab;

        [Header("Events")]
        public UnityEvent<int> OnValueChanged;

        private ToggleGroup _toggleGroup;
        private readonly List<ToggleItem> _items = new List<ToggleItem>();

        public int CreateItem(Sprite icon, string text)
        {
            if (_itemPrefab == null || _container == null)
                return -1;

            ToggleItem item = Instantiate(_itemPrefab, _container);
            item.SetIcon(icon);
            item.SetText(text);
            item.Toggle.group = _toggleGroup;

            int index = _items.Count;
            item.Toggle.onValueChanged.AddListener(isOn =>
            {
                if (isOn)
                    OnValueChanged?.Invoke(index);
            });

            _items.Add(item);
            return index;
        }

        public void RemoveItemAt(int index)
        {
            if (index < 0 || index >= _items.Count)
                return;

            ToggleItem item = _items[index];
            _items.RemoveAt(index);
            Destroy(item.gameObject);
        }

        public void ClearItems()
        {
            for (int i = _items.Count - 1; i >= 0; i--)
                Destroy(_items[i].gameObject);

            _items.Clear();
        }

        public int GetSelectedIndex()
        {
            for (int i = 0; i < _items.Count; i++)
                if (_items[i].Toggle.isOn)
                    return i;

            return -1;
        }

        public void SetValue(int index)
        {
            if (index < 0 || index >= _items.Count)
                return;

            _items[index].Toggle.isOn = true;
        }

        private void Awake()
        {
            _toggleGroup = GetComponent<ToggleGroup>();
            if (_container == null || _itemPrefab == null)
            {
                Debug.LogError("GenericToggleGroup requires a container and item prefab.");
                enabled = false;
            }
        }
    }
}