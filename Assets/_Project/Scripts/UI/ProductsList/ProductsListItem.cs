using TMPro;
using UnityEngine;
using UnityEngine.Events;
using VARTube.Input;
using VARTube.ProductBuilder.Controller;

namespace VARTube.UI.ProductsList
{
    public class ProductsListItem : MonoBehaviour
    {
        [SerializeField] private TMP_Text _label;
        [SerializeField] private ToggleButton _visibilityButton;
        [SerializeField] private ToggleButton _lockTransformButton;

        private ProductController _target;

        public UnityEvent OnStateChanged = new();


        public void Setup(ProductController target)
        {
            _target = target;
            _label.text = target.Product.Name;
            UpdateState();
            _visibilityButton.OnClick += (bool value) =>
            {
                SetVisibility(value);
                OnStateChanged.Invoke();
            };

            _lockTransformButton.OnClick += (bool value) =>
            {
                SetLockTransform(value);
                OnStateChanged.Invoke();
            };
        }

        private void UpdateState()
        {
            _visibilityButton.SetIsOnWithoutNotify(_target.gameObject.activeSelf);
            _lockTransformButton.SetIsOnWithoutNotify(_target.GetComponent<Draggable>()?.IsLocked ?? false);
        }

        public void SetVisibility(bool value)
        {
            _target.gameObject.SetActive(value);
        }

        public void SetLockTransform(bool value)
        {
            Draggable draggable = _target.GetComponent<Draggable>();
            draggable.IsLocked = value;
            UpdateState();
        }
    }
}