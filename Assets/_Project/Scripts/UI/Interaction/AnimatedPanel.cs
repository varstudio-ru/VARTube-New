using DG.Tweening;
using UnityEngine;
using VARTube.UI.Extensions;
using VARTube.UI.Interaction;
using Cysharp.Threading.Tasks;
using System;

[DefaultExecutionOrder(300)]
public class AnimatedPanel : MonoBehaviour
{

    [Header("Settings")]
    [SerializeField] private bool _isTablet = true;

    [SerializeField] private Vector2 _hiddenPosition = new Vector2(0, -500);
    [SerializeField] private float _animationDuration = 0.5f;
    [SerializeField] private Ease _ease = Ease.OutCubic;

    private RectTransform _windowRect;
    private Tweener _currentTween;

    public bool IsVisible { get; private set; }
    public event Action<bool> OnChangeVisibility;

    public void Show()
    {
        if (!_isTablet)
        {
            IsVisible = true;
            gameObject.SetActive(true);
            OnChangeVisibility?.Invoke(IsVisible);
            return;
        }

        _currentTween?.Kill();
        _currentTween = _windowRect.DOAnchorPos3DY(0, _animationDuration)
                                  .SetEase(_ease)
                                  .OnStart(() =>
                                  {
                                      IsVisible = true;
                                      OnChangeVisibility?.Invoke(IsVisible);
                                  });
    }

    public void Hide()
    {
        if (!_isTablet)
        {
            IsVisible = false;
            gameObject.SetActive(false);
            OnChangeVisibility?.Invoke(IsVisible);
            return;
        }

        _currentTween?.Kill();
        _currentTween = _windowRect.DOAnchorPosY(_hiddenPosition.y, _animationDuration)
                                  .SetEase(_ease)
                                  .OnStart(() =>
                                  {
                                      IsVisible = false;
                                      OnChangeVisibility?.Invoke(IsVisible);
                                  });
    }


    public void Toggle()
    {
        if (IsVisible)
            Hide();
        else
            Show();
    }

    private void Init()
    {
        _windowRect = GetComponent<RectTransform>();
        var paramsPanel = GetComponent<ParamsPanel>();

        if (_windowRect == null)
            _windowRect.UpdateLayout().Forget();

        UniTask.Void(async () =>
        {
            gameObject.SetActive(false);
            await UniTask.WaitForEndOfFrame();

            gameObject.SetActive(true);
            await UniTask.WaitForEndOfFrame();

            gameObject.SetActive(false);
            await UniTask.WaitForEndOfFrame();

            gameObject.SetActive(true);
            await UniTask.WaitForEndOfFrame();
        });
    }

    private void Awake()
    {
        Init();
    }
}
