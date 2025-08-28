using System;
using UnityEngine;
using UnityEngine.InputSystem;

public class ProductInteractionInput : MonoBehaviour
{
    [SerializeField] private InputActionAsset _inputActions;

    private InputAction _primaryTouchAction;
    private InputAction _secondaryTouchAction;
    private InputAction _tapAction;

    private void Awake()
    {
        InputActionMap map = _inputActions.FindActionMap("ARControls");
        _primaryTouchAction = map.FindAction("PrimaryTouch");
        _secondaryTouchAction = map.FindAction("SecondaryTouch");
        _tapAction = map.FindAction("Tap");
    }

    private void OnEnable()
    {
        _tapAction.performed += OnTap;
        _primaryTouchAction.Enable();
        _secondaryTouchAction.Enable();
        _tapAction.Enable();
    }

    private void OnDisable()
    {
        _tapAction.performed -= OnTap;
        _primaryTouchAction.Disable();
        _secondaryTouchAction.Disable();
        _tapAction.Disable();
    }

    private void OnTap(InputAction.CallbackContext context)
    {
    }
}
