using Cysharp.Threading.Tasks;
using System;
using System.Collections.Generic;
using UnityEngine;

namespace VARTube.UI
{
    public abstract class UIElementBase : MonoBehaviour, IUIElement
    {
        [SerializeField] private Canvas _canvas;
        [SerializeField] private AnimationGroup[] _animationGroups;

        private bool _isVisible;

        public event EventHandler<bool> OnVisibilityChanging;
        public event Action<IUIElement> OnBeforeShow;
        public event Action<IUIElement> OnAfterHide;

        protected AnimationGroup[] animationGroups => _animationGroups;
        public Canvas Canvas => _canvas;
        public bool IsVisible => _isVisible;
        public GameObject GameObject => gameObject;


        public void Show()
           => ShowAsync().Forget();

        public void Hide()
           => HideAsync().Forget();

        public void Toggle()
        {
            if (_isVisible)
                Show();
            else
                Hide();
        }

        public async UniTask ShowAsync()
        {
            OnBeforeShow?.Invoke(this);
            await OnBeforeShowAsync();

            ChangeVisibility(true);
            List<UniTask> tasks = new List<UniTask>(animationGroups.Length + 1)
            {
                OnShowAsync()
            };
            tasks.AddRange(animationGroups.Select(x => UIAnimationHandler.ProcessShow(x, this.GetCancellationTokenOnDestroy())));
            await UniTask.WhenAll(tasks);
        }

        public async UniTask HideAsync()
        {
            ChangeVisibility(false);

            List<UniTask> tasks = new List<UniTask>(animationGroups.Length + 1)
            {
                OnShowAsync()
            };
            tasks.AddRange(animationGroups.Select(x => UIAnimationHandler.ProcessHide(x, this.GetCancellationTokenOnDestroy())));
            await UniTask.WhenAll(tasks);

            OnAfterHide?.Invoke(this);
            await OnAfterHideAsync();
        }

        /// <summary>
        /// Override this for initialization instead of Awake() method
        /// </summary>
        protected abstract void OnInit();

#pragma warning disable CS1998
        /// <summary>
        /// Override this for Show() animation
        /// </summary>
        protected virtual async UniTask OnShowAsync()
        { }

        /// <summary>
        /// Override this for Hide() animation
        /// </summary>
        protected virtual async UniTask OnHideAsync()
        { }

        /// <summary>
        /// Override this for Show() animation
        /// </summary>
        protected virtual async UniTask OnBeforeShowAsync()
        { }

        /// <summary>
        /// Override this for Hide() animation
        /// </summary>
        protected virtual async UniTask OnAfterHideAsync()
        { }
#pragma warning restore CS1998

        private void ChangeVisibility(bool isVisible)
        {
            if (isVisible == _isVisible)
                return;

            OnVisibilityChanging?.Invoke(this, isVisible);
            _isVisible = isVisible;
        }

        protected virtual void Awake()
            => OnInit();
    }
}