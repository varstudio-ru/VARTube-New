using UnityEngine;
using VARTube.Core.Services;

public class LoadingScreen : MonoBehaviour
{
    private void Start()
    {
        ApplicationServices.RegisterSingleton(this);
    }
}