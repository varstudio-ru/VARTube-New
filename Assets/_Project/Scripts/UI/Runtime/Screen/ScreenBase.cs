using Cysharp.Threading.Tasks;
using UnityEngine;

namespace VARTube.UI
{
    public abstract class ScreenBase : UIElementBase, IScreen
    {
        [Header("Config")]
        [SerializeField] protected bool showOnStart = false;
        [SerializeField] protected ScreenType type = ScreenType.FullScreen;

        public ScreenType Type => type;

#pragma warning disable CS1998
        protected override async UniTask OnShowAsync()
        {
            Canvas.enabled = true;
                Canvas.gameObject.SetActive(true);
        }

        protected override async UniTask OnAfterHideAsync()
        {
            Debug.Log("OnAfterHideAsync");
            Canvas.enabled = false;
            Canvas.gameObject.SetActive(false);

        }
#pragma warning restore CS1998

        protected override void Awake()
        {
            base.Awake();

            if (showOnStart)
                Show();
            else
                Canvas.enabled = false;
        }
    }
}