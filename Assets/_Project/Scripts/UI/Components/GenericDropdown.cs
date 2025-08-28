using System.Collections.Generic;
using Cysharp.Threading.Tasks;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using VARTube.UI.Extensions;

namespace VARTube.UI
{
    [DefaultExecutionOrder(300)]
    public class GenericDropdown : MonoBehaviour
    {
        [Header("UI References")]
        [SerializeField] private RectTransform _panel;

        private readonly List<IPointerClickHandler> _instances = new List<IPointerClickHandler>();
        private bool _isVisible = false;

        public GameObject AddItem(GameObject prefab)
        {
            if (prefab == null || _panel == null)
                return null;

            GameObject instance = Instantiate(prefab, _panel);
            HookItem(instance);

            return instance;
        }

        public void ClearItems()
        {
            for (int i = _panel.childCount - 1; i >= 0; i--)
                Destroy(_panel.GetChild(i));

            _instances.Clear();
        }

        private void HookItem(GameObject instance)
        {
            if (instance == null)
                return;

            Button[] buttons = instance.GetComponentsInChildren<Button>(true);
            foreach (Button btn in buttons)
            {
                if (_instances.Contains(btn))
                    continue;

                btn.onClick.AddListener(Hide);
                _instances.Add(btn);
            }

            Toggle[] toggles = instance.GetComponentsInChildren<Toggle>(true);
            foreach (Toggle tog in toggles)
            {
                if (_instances.Contains(tog))
                    continue;

                tog.onValueChanged.AddListener(_ => Hide());
                _instances.Add(tog);
            }
        }

        public async void Show()
        {
            if (_panel != null && !_panel.gameObject.activeSelf)
            {
                _isVisible = true;
                _panel.gameObject.SetActive(true);
                await UniTask.NextFrame();
                await GetComponent<RectTransform>().UpdateLayout();

                InitializeExistingItems();
            }
        }

        public void Hide()
        {
            if (_panel != null && _panel.gameObject.activeSelf)
            {
                _isVisible = false;
                _panel.gameObject.SetActive(false);
            }
        }

        public void TogglePanel()
        {
            if (!_isVisible)
                Show();
            else
                Hide();
        }

        private void InitializeExistingItems()
        {
            if (_panel == null)
                return;

            foreach (Transform child in _panel)
                HookItem(child.gameObject);
        }

        private void Awake()
        {
            if (_panel == null)
            {
                Debug.LogError("GenericDropdown requires a Panel reference.");
                enabled = false;
            }
        }

        private void Start()
        {
            InitializeExistingItems();
            Hide();
        }

    }

}