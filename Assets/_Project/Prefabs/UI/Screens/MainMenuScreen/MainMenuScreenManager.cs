using Cysharp.Threading.Tasks;
using System.Collections.Generic;
using UnityEngine;
using VARTube.Core;
using VARTube.Core.Services;
using VARTube.UI.Notifications;

namespace VARTube.UI.ScreenManager
{
    public class MainMenuScreenManager : MonoBehaviour, ISerializationCallbackReceiver
    {
        [Header("Notifications")]
        [SerializeField] private string _title;
        [SerializeField] private string _text;

        [Header("Screens")]
        [OfType(typeof(IScreen))]
        [SerializeField] private List<Component> _screens;

        private NotificationManager _notificationManager;

        public List<IScreen> Screens { get; private set; }


        public async UniTask Open(int screenIndex, params object[] customData)
        {
            //TODO: feature request for ScreenManager
            //var screenContext = Screens[screenIndex].GameObject.GetComponent<IScreenContext>();
            //if (screenContext != null)
            //{
            //    var context = new ScreenContext(this, customData);
            //    screenContext.SetContext(context);
            //}

            //await ScreenManager.OpenAsync(Screens[screenIndex]);
        }

        //TODO: feature request - call screen by type
        //TODO: where T: IFooScreen
        //TODO: cache screens on Start Dictionary<IFooScreen, screenIndex>
        public async UniTask OpenAsync<T>(params object[] customData) where T : MonoBehaviour
        {
            var screen = Screens.Find(scr => scr.GameObject.GetComponent<T>());

            if (screen != null)
            {
                var index = Screens.IndexOf(screen);
                await Open(index, customData);
            }
        }

        public void Open<T>(params object[] customData) where T : MonoBehaviour
        {
            var screen = Screens.Find(scr => scr.GameObject.GetComponent<T>());

            if (screen != null)
            {
                var index = Screens.IndexOf(screen);
                _ = Open(index, customData);
            }
        }

        public void ShowBanner(string title, string text)
        {
            _notificationManager.Show(title, text, type: NotificationManager.NotificationType.banner);
        }

        public void ShowAlert()
        {
            _notificationManager.Show(_title, _text, type: NotificationManager.NotificationType.alert);
        }

        private void Init()
        {
            ApplicationServices.RegisterSingleton(this);

            //Open(0);
        }

        void ISerializationCallbackReceiver.OnBeforeSerialize()
        {
            _screens = new(Screens.Count);

            foreach (var screen in Screens)
                _screens.Add(screen as Component);
        }

        void ISerializationCallbackReceiver.OnAfterDeserialize()
        {
            Screens = new(_screens.Count);

            foreach (var screen in _screens)
                Screens.Add(screen as IScreen);
        }

        private void Awake()
        {
            Init();
        }

        private void Start()
        {
            _notificationManager = ApplicationServices.GetService<NotificationManager>();
        }

        private void OnDestroy()
        {

        }
    }

    //TODO: Generic Data -> ScreenContext<T>
    public struct ScreenContext
    {
        public MainMenuScreenManager Manager; //TODO: IScreenManager
        public object[] Data;

        public ScreenContext(MainMenuScreenManager manager, object[] data)
        {
            Manager = manager;
            Data = data;
        }
    }
}