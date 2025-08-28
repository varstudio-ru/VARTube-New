using UnityEngine;

public class RotationWithDamp : MonoBehaviour
{
    public Vector2 sensitivity;
    private float xInput;
    private float yInput;
    private Vector2 targetRotation;
    private Vector2 currentRotation;

    public float smoothTime = 0.3F;
    private Vector2 velocity;
    private Vector3 lastMousePosition;
    private Vector2 lastTouchPosition;
    private bool isDragging;
    private float angularVeclocityX;
    private float angularVeclocityY;
    public float speed;
    public bool isMobile;

    private void Update()
    {
        if (isMobile)
        {
            if (Input.touchCount == 1)
            {
                Touch touch = Input.GetTouch(0);

                if (touch.phase == TouchPhase.Began)
                {
                    lastTouchPosition = touch.position;
                    isDragging = true;

                }
                else if (touch.phase == TouchPhase.Moved)
                {
                    isDragging = true;

                    if (isDragging)
                    {
                        var touchDelta = touch.position - lastTouchPosition;
                        angularVeclocityX = touchDelta.x * speed;
                        angularVeclocityY = touchDelta.y * speed;

                        targetRotation.x += angularVeclocityX;
                        targetRotation.y -= angularVeclocityY;

                        lastTouchPosition = touch.position;
                    }
                }
                else if (touch.phase == TouchPhase.Ended)
                {
                    isDragging = false;
                }
            }
            else
            {
                isDragging = false;
            }

            currentRotation = Vector2.SmoothDamp(currentRotation, targetRotation, ref velocity, smoothTime);
            transform.localRotation = Quaternion.Euler(currentRotation.y, currentRotation.x, 0);
        }
        else
        {

            if (Input.GetMouseButtonDown(0))
            {
                lastMousePosition = Input.mousePosition;
                isDragging = true;
            }
            else if (Input.GetMouseButtonUp(0))
            {
                isDragging = false;
            }

            if (isDragging)
            {
                var mouseDelta = Input.mousePosition - lastMousePosition;
                angularVeclocityX = mouseDelta.x * speed;
                angularVeclocityY = mouseDelta.y * speed;

                targetRotation.x += angularVeclocityX;
                targetRotation.y -= angularVeclocityY;

                lastMousePosition = Input.mousePosition;
            }

            currentRotation = Vector2.SmoothDamp(currentRotation, targetRotation, ref velocity, smoothTime);
            transform.localRotation = Quaternion.Euler(currentRotation.y, currentRotation.x, 0);
        }
    }
}
