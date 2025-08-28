using Cysharp.Threading.Tasks;
using System;
using UnityEngine;

namespace VARTube.UI
{
    public interface IUIElement
    {
        public Canvas Canvas { get; }
        public GameObject GameObject { get; }
        public bool IsVisible { get; }

        public event EventHandler<bool> OnVisibilityChanging;
        public event Action<IUIElement> OnBeforeShow;
        public event Action<IUIElement> OnAfterHide;

        public void Show();
        public void Hide();
        public UniTask ShowAsync();
        public UniTask HideAsync();
    }


}