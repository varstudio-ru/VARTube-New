using UnityEngine;

namespace VARTube.Showroom
{
    public class MainMenuSceneContent : MonoBehaviour, ISceneContent
    {
        [SerializeField] private MainSceneLoader _loader;

        public void SetLoadingScreenVisibility(bool value)
        {
           // _loader.ScreenManager.ShowLoadingScreen(value);
        }
    }
}