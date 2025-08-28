using DG.Tweening;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
using UnityEngine.UI.ProceduralImage;

public class RoundToggle : MonoBehaviour
{
    [SerializeField]
    private Graphic _background;
    [SerializeField]
    private Graphic _handle;
    [SerializeField]
    private ProceduralImage _outline;
    [SerializeField]
    private float _transitionTime = 0.35f;
    [SerializeField]
    private Color _backgroundOffColor;
    [SerializeField]
    private Color _backgroundOnColor;
    [SerializeField]
    private Color _handleOffColor;
    [SerializeField]
    private Color _handleOnColor;

    private RectTransform _selfRect;
    private RectTransform _handleRect;

    private float _outlineWidth;

    private bool _isOn;

    private Tweener _currentTween;

    public bool IsOn => _isOn;

    public UnityEvent<bool> OnValueChanged = new();
    
    private void Awake()
    {
        _selfRect = GetComponent<RectTransform>();
        _handleRect = _handle.GetComponent<RectTransform>();
        _outlineWidth = _outline.BorderWidth;
        float handleSize = _selfRect.sizeDelta.y - _outlineWidth * 2;
        _handleRect.sizeDelta = new Vector2(handleSize, handleSize);
        _isOn = true;
        SetIsOn(false);
    }

    public void Toggle( bool withTransition = true )
    {
        SetIsOn(!_isOn, withTransition);
    }

    public void SetIsOn(bool value, bool withTransition = false)
    {
        _currentTween?.Kill();
        if(_isOn == value)
            return;
        _isOn = value;
        OnValueChanged.Invoke(_isOn);
        
        Vector2 targetPosition = new( !_isOn ? _outlineWidth : _selfRect.sizeDelta.x - _handleRect.sizeDelta.x - _outlineWidth, 0 );
        Color targetBackgroundColor = _isOn ? _backgroundOnColor : _backgroundOffColor;
        Color targetHandleColor = _isOn ? _handleOnColor : _handleOffColor;

        if(!withTransition)
        {
            _handleRect.anchoredPosition = targetPosition;
            _background.color = targetBackgroundColor;
            _handle.color = targetHandleColor;
        }
        else
        {
            float alpha = 0;

            Vector2 startPosition = _handleRect.anchoredPosition;
            Color startBackgroundColor = _background.color;
            Color startHandleColor = _handle.color;
            
            _currentTween = DOTween.To(() => alpha, v => alpha = v, 1, _transitionTime).SetEase(Ease.InOutSine);
            _currentTween.onUpdate += () =>
            {
                _handleRect.anchoredPosition = Vector2.Lerp(startPosition, targetPosition, alpha);
                _background.color = Color.Lerp(startBackgroundColor, targetBackgroundColor, alpha);
                _handle.color = Color.Lerp(startHandleColor, targetHandleColor, alpha);
            };
        }
    }
}
