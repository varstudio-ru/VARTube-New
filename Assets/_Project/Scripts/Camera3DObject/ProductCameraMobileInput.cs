using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.LowLevel;
using TouchPhase = UnityEngine.InputSystem.TouchPhase;

namespace VARTube.Showroom.ProductCamera
{
    public class ProductCameraMobileInput : IProductCameraInput
    {
        private Vector2 _rotation;
        private Vector2 _pan;
        private float _zoom;

        private InputAction _primaryTouchAction;
        private InputAction _secondaryTouchAction;

        private bool _primaryTouchWasInitiallyOverUI = false;
        private bool _secondaryTouchWasInitiallyOverUI = false;

        private Vector2 _lastPrimaryPosition;
        private Vector2 _lastSecondaryPosition;

        public ProductCameraMobileInput()
        {
            _primaryTouchAction = new InputAction(binding: "<Touchscreen>/primaryTouch");
            _secondaryTouchAction = new InputAction(binding: "<Touchscreen>/touch1");
        }

        public void Enable()
        {
            _primaryTouchAction.Enable();
            _secondaryTouchAction.Enable();
        }
        
        public void Disable()
        {
            _primaryTouchAction.Disable();
            _secondaryTouchAction.Disable();
        }
        
        ProductCameraInputResult IProductCameraInput.Get()
        {
            _rotation = Vector2.zero;
            _pan = Vector2.zero;
            _zoom = 0;

            TouchState primaryTouch = _primaryTouchAction.ReadValue<TouchState>();
            TouchState secondaryTouch = _secondaryTouchAction.ReadValue<TouchState>();

            bool skip = false;
            if(primaryTouch.phase == TouchPhase.Began)
            {
                _primaryTouchWasInitiallyOverUI = EventSystem.current.IsPointerOverGameObject(primaryTouch.touchId);
                _lastPrimaryPosition = primaryTouch.position;
                skip = true;
            }
            if( secondaryTouch.phase == TouchPhase.Began )
            {
                _secondaryTouchWasInitiallyOverUI = EventSystem.current.IsPointerOverGameObject(secondaryTouch.touchId);
                _lastSecondaryPosition = secondaryTouch.position;
                skip = true;
            }
            if(skip)
                return new ProductCameraInputResult(_rotation, _pan, _zoom);
            if( primaryTouch.phase is TouchPhase.Moved or TouchPhase.Stationary && !_primaryTouchWasInitiallyOverUI)
            {
                if(secondaryTouch.phase is TouchPhase.Moved or TouchPhase.Stationary)
                {
                    if( !_secondaryTouchWasInitiallyOverUI )
                    {
                        Vector2 oldPosition = (_lastPrimaryPosition + _lastSecondaryPosition) / 2.0f;
                        float oldDistance = Vector2.Distance(_lastPrimaryPosition, _lastSecondaryPosition);

                        Vector2 newPosition = (primaryTouch.position + secondaryTouch.position) / 2.0f;
                        float newDistance = Vector2.Distance(primaryTouch.position, secondaryTouch.position);

                        Vector2 positionDelta = newPosition - oldPosition;
                        float distanceDelta = newDistance - oldDistance;
                        
                        _pan = -positionDelta;
                        _zoom = -distanceDelta;
                    }
                }
                else
                {
                    Vector2 rotationDelta = primaryTouch.position - _lastPrimaryPosition;
                    _rotation = new Vector2(-rotationDelta.y, rotationDelta.x);
                }
                _lastPrimaryPosition = primaryTouch.position;
            }
            if(secondaryTouch.phase is TouchPhase.Moved or TouchPhase.Stationary && !_secondaryTouchWasInitiallyOverUI)
            {
                _lastSecondaryPosition = secondaryTouch.position;
            }

            return new ProductCameraInputResult(_rotation, _pan, _zoom);
        }

        public void SetManualState(ProductCameraInputResult inputResult)
        {
            _rotation = inputResult.Rotation;
            _pan = inputResult.Pan;
            _zoom = inputResult.Zoom;
        }
    }
}