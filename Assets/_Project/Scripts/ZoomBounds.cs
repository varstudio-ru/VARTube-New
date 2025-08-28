using Cysharp.Threading.Tasks;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ZoomBounds : MonoBehaviour
{
    public GameObject target;
    public Camera Camera;

    public bool isDone;
    public float step = 0.01f;
    public float cameraDistance = -5;
    public float marginPercentage = 1;

    //https://docs.unity3d.com/Manual/FrustumSizeAtDistance.html

    public void Zoom()
    {
        var collider = target.GetComponent<Collider>();
        var bounds = collider.bounds;
        //var bounds = target.GetComponent<MeshFilter>().mesh.bounds;




        var frustumHeightOrWidth = Mathf.Max(bounds.size.y, bounds.size.x);

        var isHeight = bounds.size.y > bounds.size.x ? true : false;
        if (isHeight)
        {

        }
        else
        {
            frustumHeightOrWidth = frustumHeightOrWidth / Camera.aspect;
        }

        //var frustumWidth = frustumHeight * camera.aspect;
        //var frustumHeight = frustumWidth / camera.aspect;

        var distance = frustumHeightOrWidth * 0.5f / Mathf.Tan(Camera.fieldOfView * 0.5f * Mathf.Deg2Rad);

        Camera.transform.position = bounds.center - (distance + bounds.size.z / 2) * Camera.transform.forward;
    }

    public async void ZoomRect()
    {
        var collider = target.GetComponent<Collider>();

        var targetObjectTransform = target.transform;

        var fovYRad = Camera.fieldOfView * Mathf.Deg2Rad;
        //calculate field of view in x (horizontal) axis
        var fovXRad = Mathf.Atan(Camera.aspect * Mathf.Tan(fovYRad / 2f)) * 2f;

        //get the width of the target quad
        var width = targetObjectTransform.GetComponent<MeshFilter>().mesh.bounds.size.x * targetObjectTransform.localScale.x;
        var height = targetObjectTransform.GetComponent<MeshFilter>().mesh.bounds.size.y * targetObjectTransform.localScale.y;


        //calculate distance of the camera so the width of the target quad match the camera width at that point in the world

        var distX = (width / 2f) / Mathf.Tan(fovXRad / 2f);
        var distY = (height / 2f) / Mathf.Tan(fovYRad / 2f);

        var targetDistance = distX > distY ? distX : distY;

        //move camera to wanted position
        Camera.transform.position = targetObjectTransform.transform.position - targetObjectTransform.transform.forward.normalized * targetDistance;

        //make sure that camera looks at the wanted target
        //Camera.transform.LookAt(targetObjectTransform.transform);

    }

    public void ZoomOld()
    {
        var collider = target.GetComponent<Collider>();
        var bounds = collider.bounds;

        //float cameraDistance = 2.0f; // Constant factor
        Vector3 objectSizes = bounds.max - bounds.min;
        float objectSize = Mathf.Max(objectSizes.x, objectSizes.y, objectSizes.z);
        float cameraView = 2.0f * Mathf.Tan(0.5f * Mathf.Deg2Rad * Camera.fieldOfView); // Visible height 1 meter in front
        float distance = cameraDistance * objectSize / cameraView; // Combined wanted distance from the object
        distance += 0.5f * objectSize; // Estimated offset from the center to the outside of the object
        Camera.transform.position = bounds.center - distance * Camera.transform.forward;
    }
}
