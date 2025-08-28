using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;

namespace VARTube.Showroom.ProductCamera
{
    //TODO: make it just StandaloneInput, abstract it from ProductCamera
    public class ProductCameraStandaloneInput : IProductCameraInput
    {
        private Vector2 _rotation;
        private Vector2 _pan;
        private float _zoom;

        private Vector2 _lastMousePosition;

        private InputAction _mousePositionAction;
        private InputAction _leftMouseDownAction;
        private InputAction _rightMouseDownAction;
        private InputAction _mouseScrollAction;

        private bool _leftButtonInitiallyPressedOverUI = false;
        private bool _rightButtonInitiallyPressedOverUI = false;

        public ProductCameraStandaloneInput()
        {
            _mousePositionAction = new InputAction(binding: "<Mouse>/position", type: InputActionType.Value);
            _leftMouseDownAction = new InputAction(binding: "<Mouse>/leftButton", type: InputActionType.Button);
            _rightMouseDownAction = new InputAction(binding: "<Mouse>/rightButton", type: InputActionType.Button);
            _mouseScrollAction = new InputAction(binding: "<Mouse>/scroll", type: InputActionType.Value);

            _leftMouseDownAction.performed += _ =>
            {
                _leftButtonInitiallyPressedOverUI = EventSystem.current.IsPointerOverGameObject();
                _lastMousePosition = _mousePositionAction.ReadValue<Vector2>();
            };
            _rightMouseDownAction.performed += _ =>
            {
                _rightButtonInitiallyPressedOverUI = EventSystem.current.IsPointerOverGameObject();
                _lastMousePosition = _mousePositionAction.ReadValue<Vector2>();
            };
        }

        public void Enable()
        {
            _mousePositionAction.Enable();
            _leftMouseDownAction.Enable();
            _rightMouseDownAction.Enable();
            _mouseScrollAction.Enable();
        }

        public void Disable()
        {
            _mousePositionAction.Disable();
            _leftMouseDownAction.Disable();
            _rightMouseDownAction.Disable();
            _mouseScrollAction.Disable();
        }

        public void SetManualState(ProductCameraInputResult inputResult)
        {
            _rotation = inputResult.Rotation;
            _pan = inputResult.Pan;
            _zoom = inputResult.Zoom;
        }

        private Vector2 PrepareForRotation(Vector2 v)
        {
            return new Vector2(-v.y, v.x);
        }

        ProductCameraInputResult IProductCameraInput.Get()
        {
            Vector2 mousePosition = _mousePositionAction.ReadValue<Vector2>();
            
            _rotation = Vector3.zero;
            _pan = Vector3.zero;
            _zoom = 0;
            
            if(_leftMouseDownAction.IsPressed() && !_leftButtonInitiallyPressedOverUI)
                _rotation = PrepareForRotation( mousePosition - _lastMousePosition );
            if(_rightMouseDownAction.IsPressed() && !_rightButtonInitiallyPressedOverUI)
                _pan = _lastMousePosition - mousePosition;
            if(!EventSystem.current.IsPointerOverGameObject())
                _zoom = -_mouseScrollAction.ReadValue<Vector2>().y;

            _lastMousePosition = mousePosition;
            
            return new ProductCameraInputResult(_rotation, _pan, _zoom);
        }
    }
}