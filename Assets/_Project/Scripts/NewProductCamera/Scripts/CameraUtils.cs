//using Cysharp.Threading.Tasks;
using UnityEngine;

namespace VARTube.Showroom.NewProductCamera
{
    public class CameraUtils
    {
        //public async static UniTask<float> GetZoomDistanceByViewportRectPoint(Camera camera, Collider targetCollider)
        //{
        //    var cameraOriginPosition = camera.transform.localPosition;

        //    var min = targetCollider.bounds.min;
        //    var minViewPort = camera.WorldToViewportPoint(min);
        //    var rect = new Rect(0, 0, 1, 1);

        //    while (rect.Contains(minViewPort))
        //    {
        //        camera.transform.localPosition += 0.01f * Vector3.forward;

        //        min = targetCollider.bounds.min;
        //        minViewPort = camera.WorldToViewportPoint(min);

        //        await UniTask.Yield();
        //    }

        //    var distance = camera.transform.localPosition - cameraOriginPosition;
        //    camera.transform.localPosition = cameraOriginPosition;

        //    return distance.z;
        //}

        //https://docs.unity3d.com/Manual/FrustumSizeAtDistance.html

        public static float GetZoomDistance(Camera camera, Bounds targetBounds)
        {
            var frustumHeightOrWidth = Mathf.Max(targetBounds.size.y, targetBounds.size.x);

            var isHeight = targetBounds.size.y > targetBounds.size.x ? true : false;
            if (isHeight)
            {

            }
            else
            {
                frustumHeightOrWidth = frustumHeightOrWidth / camera.aspect;
            }

            //var frustumWidth = frustumHeight * camera.aspect;
            //var frustumHeight = frustumWidth / camera.aspect;

            var distance = frustumHeightOrWidth * 0.5f / Mathf.Tan(camera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            var offset = 0.2f;

            var dir = targetBounds.center - (distance + targetBounds.size.z / 2) * camera.transform.forward;

            return dir.z + offset;

            //camera.transform.position = bounds.center - (distance + bounds.size.z / 2) * camera.transform.forward;
        }

        public static void ZoomOld(Camera camera, Bounds targetBounds)
        {
            float cameraDistance = 2.0f; // Constant factor
            Vector3 objectSizes = targetBounds.max - targetBounds.min;
            float objectSize = Mathf.Max(objectSizes.x, objectSizes.y, objectSizes.z);
            float cameraView = 2.0f * Mathf.Tan(0.5f * Mathf.Deg2Rad * camera.fieldOfView); // Visible height 1 meter in front
            float distance = cameraDistance * objectSize / cameraView; // Combined wanted distance from the object
            distance += 0.5f * objectSize; // Estimated offset from the center to the outside of the object
            camera.transform.position = targetBounds.center - distance * camera.transform.forward;
        }
    } 
}