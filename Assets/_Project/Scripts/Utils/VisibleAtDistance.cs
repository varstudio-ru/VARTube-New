using UnityEngine;
namespace VARTube.Utils
{
    public class VisibleAtDistance : MonoBehaviour
    {
        public float Distance;

        private void Update()
        {
            foreach(MeshRenderer renderer in GetComponentsInChildren<MeshRenderer>())
            {
                renderer.enabled = Vector3.Distance(Camera.main.transform.position, transform.position) < Distance;
            }
        }
    }
}