using UnityEngine;

public class AlwaysOnGroundPlane : MonoBehaviour
{
    private void Update()
    {
        GameObject plane = GameObject.FindWithTag("ARInfinitePlane");
        if(plane != null)
            transform.position = plane.transform.position;
    }
}
