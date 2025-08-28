using Cysharp.Threading.Tasks;
using UnityEngine;

public class CameraUtils
{
    public async static UniTask<float> GetZoomDistanceByViewportRectPoint(Camera camera, Collider targetCollider)
    {
        var cameraOriginPosition = camera.transform.localPosition;

        var min = targetCollider.bounds.min;
        var minViewPort = camera.WorldToViewportPoint(min);
        var rect = new Rect(0, 0, 1, 1);

        while (rect.Contains(minViewPort))
        {
            camera.transform.localPosition += 0.01f * Vector3.forward;

            min = targetCollider.bounds.min;
            minViewPort = camera.WorldToViewportPoint(min);

            await UniTask.Yield();
        }

        var distance = camera.transform.localPosition - cameraOriginPosition;
        camera.transform.localPosition = cameraOriginPosition;

        return distance.z;
    }

    //Это DeepSeek...
    public static float GetZoom(Camera camera, Bounds bounds)
    {
        // Получаем размеры Bounds в мировых координатах
        Vector3 boundsSize = bounds.size;
        float boundsRadius = Mathf.Max(boundsSize.x, boundsSize.y, boundsSize.z) * 0.5f;

        // Учитываем поле зрения камеры (FOV) и её аспект
        float fov = camera.fieldOfView;
        float aspect = camera.aspect;

        // Для перспективной камеры
        if (!camera.orthographic)
        {
            // Вычисляем высоту фрустума на расстоянии 1 метр
            float frustumHeight = 2.0f * Mathf.Tan(fov * 0.5f * Mathf.Deg2Rad);
            float frustumWidth = frustumHeight * aspect;

            // Находим минимальный размер фрустума (чтобы гарантировать вхождение по всем осям)
            float minFrustumSize = Mathf.Min(frustumWidth, frustumHeight);

            // Вычисляем необходимое расстояние
            return boundsRadius / (minFrustumSize * 0.5f);
        }
        // Для ортографической камеры
        else
        {
            // Ортографический размер камеры (половина высоты)
            float orthoSize = camera.orthographicSize;
            float orthoWidth = orthoSize * aspect;

            // Находим минимальный размер ортографического вида
            float minOrthoSize = Mathf.Min(orthoWidth, orthoSize);

            // Для ортографической камеры расстояние не влияет на видимость, но вернём примерное расстояние
            return Mathf.Max(boundsRadius / minOrthoSize, camera.nearClipPlane + boundsRadius);
        }
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