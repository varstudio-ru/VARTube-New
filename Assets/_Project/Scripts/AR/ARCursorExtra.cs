using System.Linq;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Serialization;
using VARTube.Input;
using VARTube.ProductBuilder.Design.Composite;

public class ARCursorExtra : MonoBehaviour
{
    public GameObject cursorChildObj;
    public bool useCursor = true;
    [FormerlySerializedAs("TargetSurfaceType")]
    public ConnectionType TargetConnectionType = ConnectionType.NONE;

    private RaycastHit[] _hitsBuffer = new RaycastHit[10];

    private float rotationOffset = 0;

    private void Start()
    {
        cursorChildObj.SetActive(useCursor);
    }

    private void Update()
    {
        var isPointerOverUI = EventSystem.current != null && EventSystem.current.IsPointerOverGameObject(-1);

        if (isPointerOverUI)
        {
            //return;
        }

        if (useCursor)
        {
            UpdateCursor();
        }

        cursorChildObj.transform.Rotate(new Vector3(0, 0, -Camera.main.transform.eulerAngles.z * 4), Space.Self);
    }

    public void HideCursor()
    {
        useCursor = false;
        cursorChildObj.SetActive(false);
    }

    public void ResetRotation()
    {
        cursorChildObj.transform.eulerAngles = new Vector3(-90, 0, 0);
    }

    public void ShowCursor()
    {
        useCursor = true;
        cursorChildObj.SetActive(true);
        rotationOffset = Camera.main.transform.eulerAngles.z;
    }

    private void UpdateCursor()
    {
        Ray ray = Camera.main.ScreenPointToRay(new Vector2(Screen.width / 2.0f, Screen.height / 2.0f));
        int hitsCount = Physics.RaycastNonAlloc(ray, _hitsBuffer, float.PositiveInfinity);
        RaycastHit? hit = InputController.GetProperHit(GetComponentInChildren<Draggable>(), _hitsBuffer.Take(hitsCount), null, TargetConnectionType);

        if(hit != null && hit.Value.collider != null)
        {
            cursorChildObj.SetActive(true);
            cursorChildObj.transform.position = hit.Value.point;
            cursorChildObj.transform.LookAt(cursorChildObj.transform.position + hit.Value.normal);
        }
        else
        {
            cursorChildObj.SetActive(false);
        }
    }
}