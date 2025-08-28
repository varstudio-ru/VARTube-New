using Cysharp.Threading.Tasks;
using System;
using UnityEngine;
using VARTube.Core.Services;

namespace VARTube.UI.Notifications
{
    public class NotificationManager : MonoBehaviour
    {
        public const float DEFAULT_DURATION = 3;

        [SerializeField] private NotificationObject[] notificationPrefabs;

        public void Show(string title, string text, float duration = DEFAULT_DURATION, NotificationType type = NotificationType.banner)
            => ShowAsync(title, text, duration, type).Forget();

        public async UniTask ShowAsync(string title, string text, float duration = DEFAULT_DURATION, NotificationType type = NotificationType.banner)
        {
            var notification = notificationPrefabs[(int)type].Pool.Get();
            notification.GameObject.transform.SetParent(transform, false);
            await notification.Show(title, text, duration);
        }

        private void Init()
        {
            ApplicationServices.RegisterSingleton(this);
        }

        private void Start()
        {
            Init();
        }

        public enum NotificationType : int
        {
            banner = 0,
            alert = 1
        }

        [Serializable]
        public class NotificationObject
        {
            [SerializeField] private GameObject notificationPrefab;

            private NotificationsPool _pool;
            public NotificationsPool Pool => _pool ?? (_pool = new(notificationPrefab));
        }
    }
}
