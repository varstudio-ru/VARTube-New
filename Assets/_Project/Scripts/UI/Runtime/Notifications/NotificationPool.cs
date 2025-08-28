using UnityEngine;
using VARTube.Core.Factory;
using VARTube.Core.Pool;
using VARTube.Core.Services;

namespace VARTube.UI.Notifications
{
    public class NotificationsPool : GameObjectPoolBase<INotification>
    {
        private IFactory _factory;

        public NotificationsPool(GameObject @object) : base(@object)
        {
            ApplicationServices.AddServiceRegistrationListener<IFactory>(OnFactoryRegistered);
        }

        ~NotificationsPool()
        {
            ApplicationServices.RemoveSingletonRegistrationListener<IFactory>(OnFactoryRegistered);
        }

        protected override INotification CreatePooledItem()
        {
            var go = _factory.Create(@object, Vector3.zero, Quaternion.identity);
            var notification = go.GetComponent<INotification>();

            return notification;
        }

        protected override void OnTakeFromPool(INotification element)
        {
            element.OnVisibilityChanging += OnNotificationHide;
        }

        protected override void OnReturnedToPool(INotification element)
        {
            element.OnVisibilityChanging -= OnNotificationHide;
        }

        protected override void OnDestroyPoolObject(INotification element)
        {
            _factory.DestroyObject(element.GameObject);
        }

        private void OnNotificationHide(object sender, bool isVisible)
        {
            if (isVisible)
                return;

            Pool.Release(sender as INotification);
        }

        private void OnFactoryRegistered(IFactory factory)
        {
            _factory = factory;
        }
    }
}