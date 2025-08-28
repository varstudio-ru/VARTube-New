using UnityEngine;
using UnityEngine.InputSystem;
using VARTube.Showroom;

namespace VARTube.Input
{
    public class ProductSpawnInput : MonoBehaviour
    {
        [SerializeField] private bool _spawnAtScreenCenter;
        [SerializeField] private ProductShowroom _showroom;
        [SerializeField] private InputActionAsset _inputActions;

        private ARInputActions _actions;
        private InputAction _positionAction;

        [HideInInspector]
        public bool IsAdditiveMode;
        
        private void Awake()
        {
            _actions = new ARInputActions();
            InputAction tapAction = _actions.SpawnInput.Touch;
            _positionAction = _actions.SpawnInput.Position;
            tapAction.performed += OnTap;
        }

        private void OnEnable()
        {
            _actions.Enable();
        }

        private void OnDisable()
        {
            _actions.Disable();
        }

        private void OnTap(InputAction.CallbackContext context)
        {
            _showroom.FinishSpawningSequence(IsAdditiveMode, _positionAction.ReadValue<Vector2>());
        }
    }
}