using Cysharp.Threading.Tasks;
using DG.Tweening;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using VARTube.UI.BasicUI;

public class CaptureView : MonoBehaviour, IPointerDownHandler, IPointerUpHandler
{
    [SerializeField] private CaptureController _controller;

    [Header("Settings")]
    [SerializeField] private float _longPressTime = 1f;
    [SerializeField] private Color _progressColor = Color.red;
    [SerializeField] private Color _progressBgColorNormal = Color.white;
    [SerializeField] private Color _progressBgColorActive = Color.white;
    [SerializeField] private Color _disabledColor = Color.gray;
    [SerializeField] private float _progressDuration = 15f;

    [Header("Components")]
    [SerializeField] private Image _progress;
    [SerializeField] private Image _progressBg;
    [SerializeField] private Image _stopIcon;
    [SerializeField] private Image _startIcon;
    [SerializeField] private BasicUIController _infoPanel;//TODO remove


    private CaptureState _currentState = CaptureState.Idle;
    private float _pressStartTime;


    public void TakeScreenshot()
    {
        SetBusyState();

        UniTask.Void(async () =>
        {
            await _controller.TakeScreenshotAsync();

            _infoPanel.ShowInfoDialog("Saved", InfoType.REGULAR, 1);
            SetIdleState();
        });
    }

    public void StartVideoRecording()
    {
        _currentState = CaptureState.Recording;

        UniTask.Void(async () =>
        {
            await ShowRecordingVisualStateAsync();
            await _controller.StartRecordingAsync();
        });
    }

    public void StopVideoRecording()
    {
        SetBusyState();

        UniTask.Void(async () =>
        {
            await ResetVisualStateAsync();
            await _controller.StopRecordingAsync();

            _infoPanel.ShowInfoDialog("Saved", InfoType.REGULAR, 1);
            SetIdleState();
        });
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        if (_currentState == CaptureState.Idle)
        {
            _pressStartTime = Time.time;
            SetState(CaptureState.Pressed);
        }
        else if (_currentState == CaptureState.Recording)
        {
            SetState(CaptureState.Idle);
        }
    }

    public void OnPointerUp(PointerEventData eventData)
    {
        if (_currentState == CaptureState.Pressed)
        {
            TakeScreenshot();
        }
    }

    private async UniTask ShowRecordingVisualStateAsync()
    {
        await _startIcon.transform.DOScale(0, 0.3f).SetEase(Ease.InOutExpo).AsyncWaitForCompletion();

        _progress.fillAmount = 0;
        _progressBg.color = _progressBgColorActive;
        _ = _progress.DOFillAmount(1, _progressDuration).SetEase(Ease.Linear);
    }


    private async UniTask ResetVisualStateAsync()
    {
        await _startIcon.transform.DOScale(1, 0.3f).SetEase(Ease.InOutExpo).AsyncWaitForCompletion();

        _progress.DOKill();
        await UniTask.WaitForEndOfFrame();

        _progress.fillAmount = 0;
        _progressBg.color = _progressBgColorNormal;
    }

    private void SetState(CaptureState newState)
    {
        if (_currentState == CaptureState.Recording && newState != CaptureState.Recording)
        {
            StopVideoRecording();
        }

        _currentState = newState;

        if (newState == CaptureState.Recording)
        {
            StartVideoRecording();
        }
    }

    private void SetBusyState()
    {
        _currentState = CaptureState.Wait;

        _progressBg.color=_disabledColor;
        _startIcon.color = _disabledColor;
        _stopIcon.color = new Color(0, 0, 0, 0);
        _progress.color = new Color(0, 0, 0, 0);
    }

    private void SetIdleState()
    {
        _currentState = CaptureState.Idle;

        _progressBg.color = _progressBgColorNormal;
        _startIcon.color = _progressBgColorNormal;
        _stopIcon.color = _progressBgColorNormal;
        _progress.color = _progressColor;
    }

    private void HandleLongPress()
    {
        if (_currentState != CaptureState.Pressed)
            return;

        if (Time.time - _pressStartTime < _longPressTime)
            return;

        SetState(CaptureState.Recording);
    }

    private void Init()
    {
        ResetVisualStateAsync().Forget();
        _progress.color = _progressColor;
    }

    private void Start()
    {
        Init();
    }

    private void Update()
    {
        HandleLongPress();
    }

    public enum CaptureState
    {
        Idle,
        Pressed,
        Recording,
        Wait
    }
}