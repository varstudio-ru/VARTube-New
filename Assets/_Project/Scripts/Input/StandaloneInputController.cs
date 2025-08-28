using UnityEngine;
using UnityEngine.InputSystem;

namespace VARTube.Input
{
    public class StandaloneInputController : InputController
    {
        private InputAction _mouseScrollAction;

        private InputAction _pointerPositionAction;
        private InputAction _pointerPressAction;

        public void Awake()
        {
            _pointerPositionAction = new InputAction(binding: "<Mouse>/position", type: InputActionType.Value);
            _pointerPressAction = new InputAction(binding: "<Mouse>/leftButton", type: InputActionType.Button);
            _mouseScrollAction = new InputAction(binding: "<Mouse>/scroll", type: InputActionType.Value, processors: "ScaleVector2(x=2,y=2)");
            _mouseScrollAction.performed += OnMouseScrollPerformed;
            _pointerPressAction.performed += OnPointerDown;
            _pointerPressAction.canceled += OnPointerUp;
            _pointerPositionAction.performed += OnPointerDrag;
        }

        protected void OnEnable()
        {
            _pointerPositionAction.Enable();
            _pointerPressAction.Enable();
            _mouseScrollAction.Enable();
        }

        protected void OnDisable()
        {
            OnSelectionChanged?.Invoke(null);

            _pointerPositionAction.Disable();
            _pointerPressAction.Disable();
            _mouseScrollAction.Disable();
        }

        private void OnPointerDown(InputAction.CallbackContext context)
        {
            ProcessPointerDown(_pointerPositionAction.ReadValue<Vector2>());
        }

        private void OnPointerDrag(InputAction.CallbackContext context)
        {
            ProcessPointerDrag(context.ReadValue<Vector2>());
        }

        private void OnPointerUp(InputAction.CallbackContext _)
        {
            ProcessPointerRelease();
        }

        private void OnMouseScrollPerformed(InputAction.CallbackContext context)
        {
            if (_currentDraggable == null || _dragStartDraggablePosition == null || _dragStartHitPoint == null)
                return;
            _currentDraggable.transform.Rotate(new Vector3(0, context.ReadValue<Vector2>().y, 0), Space.Self);
        }

    }
}