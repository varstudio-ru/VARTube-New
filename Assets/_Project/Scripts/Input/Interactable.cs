using UnityEngine;
using UnityEngine.Events;

namespace VARTube.Input
{
    public class Interactable : MonoBehaviour
    {
        public UnityEvent<Ray> OnInteractionStarted = new();
        public UnityEvent<Ray, Ray> OnInteractionContinue = new();

        public void StartInteraction(Ray startRay)
        {
            OnInteractionStarted.Invoke(startRay);
        }
        
        public void ContinueInteraction( Ray startRay, Ray currentRay )
        {
            OnInteractionContinue.Invoke(startRay, currentRay);
        }
    }
}