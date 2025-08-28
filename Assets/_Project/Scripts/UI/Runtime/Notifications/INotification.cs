using Cysharp.Threading.Tasks;
using System;
using UnityEngine;

namespace VARTube.UI.Notifications
{
    public interface INotification
    {
        public GameObject GameObject { get; }

        public event EventHandler<bool> OnVisibilityChanging;

        public UniTask Show(string title, string message, float time);
    }
}