using UnityEngine;
using UnityEngine.SceneManagement;
using VARTube.Core.Factory;
using VARTube.Core.Services;
using VARTube.Data.Settings;
using VARTube.Utils;

namespace VARTube.Controller
{
    public class ApplicationLoader : MonoBehaviour
    {
        public ApplicationConfigExtended Config;
        public DefaultFactory DefaultFactory;
        private ApplicationServicesInstaller _installer;

        private void Awake()
        {
            _installer = new(DefaultFactory, transform);
            _installer.Install( Config );

            DontDestroyOnLoad(gameObject);
        }

        private void Start()
        {
            _ = ApplicationServices.GetService<SceneManagement>().LoadAsync(Config.Scenes.MainMenu, LoadSceneMode.Single);
        }
    }
}