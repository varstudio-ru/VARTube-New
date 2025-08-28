using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Camera3DObject : MonoBehaviour
{
    public GameObject ParentGO;
    public GameObject target;
    public float distance = 5;

    float xInput, yInput;

    [Space]
    public float RotationFactor = 2;
    public float ZoomFactor = 1;
    public float PanFactor = 2;
    [Space]


    Vector3 rotVector;
    //LookAt; RotateAroundX, RotateAroundY;

    bool _isRotating;
    Vector3 resultPos;

    private void Start()
    {
        ParentGO.transform.position = target.transform.position + ParentGO.transform.forward * -distance;
    }

    private void Update()
    {
        _isRotating = Input.GetMouseButton(0);

        if (_isRotating)
        {
            xInput += Input.GetAxisRaw("Mouse X");
            yInput -= Input.GetAxisRaw("Mouse Y");
        }       
    }

    private void LateUpdate()
    {
        if (!target) { return; }

        //SOLUTION:
        //It looks a bit like you want to have an orbit camera around that point.In this case it’s way easier to place an empty gameobject at the point you want to look at, make the camera a child of it, place it locally at(0, 0, -distanceFromOjbect) by setting the localPosition of the camera to this vector and finally just rotate the empty gameobject manually.



        Zoom();

        if (Input.GetMouseButton(2))
        {
            Pan();
        }

        if (!_isRotating)
        {
            //return;
        }

        //var horInp = Input.GetAxis("Mouse X");
        //var vertInp = Input.GetAxis("Mouse Y");

       //var rotVector = new Vector3(vertInp, horInp, 0) * RotationFactor;

        //var dir

        rotVector = new Vector3(yInput, xInput, 0) * RotationFactor;
        var orbit = Vector3.forward * -distance;
        orbit = Quaternion.Euler(rotVector) * orbit;
        resultPos = target.transform.position + orbit;
        ParentGO.transform.position = resultPos;


        //var orbit = Vector3.forward * -distance;
        //orbit = Quaternion.Euler(rotVector) * orbit;
        //resultPos = target.transform.position + orbit;


        //ParentGO.transform.LookAt(target.transform);
        // TODO: use Quaternion.LookRotation + try empty go solution



        //xInput = Input.GetAxis("Mouse X");
        //yInput = Input.GetAxis("Mouse Y");

        //Camera.transform.position = target.transform.position - (Camera.transform.forward * distance);
        //Camera.transform.RotateAround(target.transform.position, Vector3.up, xInput);
        //Camera.transform.RotateAround(target.transform.position, Vector3.left, yInput);

        Debug.Log($"{ xInput } {yInput}");
    }

    public void Zoom()
    {
        var res = Input.GetAxisRaw("Mouse ScrollWheel") * ZoomFactor;
        //ParentGO.transform.localPosition = new Vector3(ParentGO.transform.localPosition.x, ParentGO.transform.localPosition.y, ParentGO.transform.localPosition.z + res);
        distance += res;
    }

    public void Pan()
    {
        var dir = new Vector3(Input.GetAxisRaw("Mouse X"), Input.GetAxisRaw("Mouse Y")) * PanFactor;
        target.transform.localPosition -= dir;
        //target.transform.Translate(-dir, Space.Self);
    }

    private void FixedUpdate()
    {
        //if (
        //    _isRotating)
        //{
        //    Camera.GetComponentInParent<Rigidbody>().AddTorque(resultPos, ForceMode.Impulse);
        //}

    }
}
