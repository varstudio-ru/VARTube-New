using UnityEngine;

namespace VARTube.Showroom.ProductCamera
{
    public struct ProductCameraInputResult
    {
        public Vector2 Rotation;
        public Vector2 Pan;
        public float Zoom;

        public ProductCameraInputResult(Vector2 rotation, Vector2 pan, float zoom)
        {
            Rotation = rotation;
            Pan = pan;
            Zoom = zoom;
        }
    } 
}
