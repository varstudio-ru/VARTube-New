using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.Controls;
using TouchPhase = UnityEngine.InputSystem.TouchPhase;

namespace VARTube.Input
{
    public class MobileInputController : InputController
    {
        private bool _isFirstTouchActive;
        private bool _isSecondTouchActive;

        private float? _previousAngle;

        private void OnDisable()
        {
            OnSelectionChanged.Invoke(null);
        }

        private void Update()
        {
            TouchControl firstTouch = Touchscreen.current.touches[0];
            TouchControl secondTouch = Touchscreen.current.touches[1];

            if(!firstTouch.isInProgress && _isFirstTouchActive)
            {
                _isFirstTouchActive = false;
                if( !_isSecondTouchActive )
                    ProcessPointerRelease();
            }
            else if(firstTouch.isInProgress && !_isFirstTouchActive)
            {
                _isFirstTouchActive = true;
                if( !_isSecondTouchActive )
                    ProcessPointerDown(firstTouch.position.ReadValue());
            }
            if(firstTouch.phase.ReadValue() == TouchPhase.Moved)
            {
                if( !secondTouch.isInProgress )
                    ProcessPointerDrag(firstTouch.position.ReadValue());
            }

            if(!secondTouch.isInProgress && _isSecondTouchActive)
            {
                _previousAngle = null;
                _isSecondTouchActive = false;
            }
            else if(secondTouch.isInProgress && !_isSecondTouchActive)
            {
                _isSecondTouchActive = true;
                
                ProcessPointerDown(firstTouch.position.ReadValue());
                
                if(_currentDraggable)
                {
                    Vector2 p1 = firstTouch.position.ReadValue();
                    Vector2 p2 = secondTouch.position.ReadValue();
                    Vector2 delta = p2 - p1;
                    _previousAngle ??= -Mathf.Atan2(delta.y, delta.x) * Mathf.Rad2Deg * 2;
                }
            }

            if(_previousAngle != null)
            {
                Vector2 p1 = firstTouch.position.ReadValue();
                Vector2 p2 = secondTouch.position.ReadValue();
                Vector2 delta = p2 - p1;
                float currentAngle = -Mathf.Atan2(delta.y, delta.x) * Mathf.Rad2Deg * 2;
                _currentDraggable.transform.Rotate(new Vector3(0, currentAngle - _previousAngle.Value, 0), Space.Self);
                _previousAngle = currentAngle;
            }
        }
    }
}