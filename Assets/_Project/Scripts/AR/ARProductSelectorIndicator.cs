using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;
using VARTube.Core.Services;
using VARTube.Data.PlayerPreferences;
using VARTube.ProductBuilder.Controller;

namespace VARTube.Input
{
    public class ARProductSelectorIndicator : MonoBehaviour
    {
        [SerializeField] private InputActionAsset _inputActions;
        private ARProfileLocalStorage _settings;

        private ARInputActions _actions;
        private InputAction _primaryTouchAction;
        private InputAction _tapAction;

        public UnityEvent<ProductController> OnCurrentProductChanged = new();

        public ProductController currentProduct { get; private set; }
        
        private void Awake()
        {
            _actions = new ARInputActions();
            _tapAction = _actions.SpawnInput.Touch;
            _primaryTouchAction = _actions.SpawnInput.Position;
            _tapAction.performed += OnTap;
        }

        private void OnEnable()
        {
            _actions.Enable();
        }

        private void OnDisable()
        {
            _actions.Disable();
        }

        private void Start()
        {
            _settings = ApplicationServices.GetService<PlayerPreferences>().AR;
        }

        private void OnTap(InputAction.CallbackContext context)
        {
            Vector2 position = _primaryTouchAction.ReadValue<Vector2>();
            var isPointerOverUI = EventSystem.current != null && EventSystem.current.IsPointerOverGameObject(-1);

            if (isPointerOverUI)
            {
                return;
            }

            Ray ray = Camera.main.ScreenPointToRay(position);

            if (Physics.Raycast(ray, out RaycastHit raycastHit))
            {
                currentProduct = raycastHit.transform.GetComponentInParent<ProductController>();
                if(currentProduct)
                    OnCurrentProductChanged.Invoke(currentProduct);
                else
                    OnCurrentProductChanged.Invoke(null);
            }
            else
            {
                OnCurrentProductChanged.Invoke(null);
            }
        }
    }
}