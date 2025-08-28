using System.Collections.Generic;
using Cysharp.Threading.Tasks;
using DG.Tweening;
using RailwayMuseum.UI.NewSwipePanel;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using VARTube.UI.Extensions;

public class RulerSliderHandle : MonoBehaviour, IBeginDragHandler, IDragHandler, IEndDragHandler, IPointerDownHandler
{
    [SerializeField]
    private float _lineStep = 10;
    [SerializeField]
    private float _accelerationMultiplier = 1;
    [SerializeField]
    private float _decelerationMultiplier = 1;
    [SerializeField]
    private RectTransform _linePrefab;
    [SerializeField]
    private TMP_Text _textPrefab;
    
    private Vector2 _dragStartPointerPosition;
    private Vector2 _dragStartPosition;

    private RectTransform _selfRect;
    private HorizontalOrVerticalLayoutGroup _layout;

    private RectTransform _parentCanvas;

    private float _velocity;
    private float _currentMin;
    private float _currentMax;
    private float _step;
    private float _currentMinStep;
    private float _currentValue;

    private Tweener _currentTween;
    
    private bool m_routeToParent = false;
    private IBeginDragHandler[] m_parentBeginDragHandlers = null;
    private IDragHandler[] m_parentDragHandlers = null;
    private IEndDragHandler[] m_parentEndDragHandlers = null;

    private SwipePanel parentSwipePanel;

    public UnityEvent<float> OnValueChanged = new();

    private void Awake()
    {
        _selfRect = GetComponent<RectTransform>();
        _layout = GetComponent<HorizontalOrVerticalLayoutGroup>();
        _layout.spacing = _lineStep;
        _parentCanvas = GetComponentInParent<Canvas>().GetComponent<RectTransform>();
        parentSwipePanel = GetComponentInParent<SwipePanel>();
        m_parentBeginDragHandlers = parentSwipePanel.GetComponents<IBeginDragHandler>();
        m_parentDragHandlers = parentSwipePanel.GetComponents<IDragHandler>();
        m_parentEndDragHandlers = parentSwipePanel.GetComponents<IEndDragHandler>();
    }

    public async UniTask Setup(float minValue, float maxValue, float step = 0)
    {
        _currentMin = minValue;
        _currentMax = maxValue;
        _step = step;
        float range = maxValue - minValue;
        float bigStep = 1f;
        float smallStep = 0.1f;
        if(step == 0)
        {
            if((int)range / 1000 >= 1)
            {
                bigStep = 100;
                smallStep = 10;
            }
            else if((int)range / 100 >= 1)
            {
                bigStep = 10;
                smallStep = 1;
            }
        }
        else
        {
            bigStep = step;
            smallStep = step;
            _layout.spacing = 50;
        }
        float start = minValue - minValue % smallStep;
        float end = maxValue - maxValue % smallStep;
        Dictionary<float, RectTransform> lines = new();
        for(float i = start; i <= end; i += smallStep)
        {
            bool isBig = i % bigStep == 0;
            RectTransform line = Instantiate(_linePrefab, _selfRect);
            Vector2 newSize = line.sizeDelta;
            newSize.y = isBig ? _selfRect.sizeDelta.y / 2.0f : _selfRect.sizeDelta.y / 4.0f;
            line.sizeDelta = newSize;
            lines.Add(i, line);
        }
        RectOffset padding = _layout.padding;
        padding.left = (int)(minValue % smallStep / smallStep * _layout.spacing);
        padding.right = (int)(maxValue % smallStep / smallStep * _layout.spacing) - 2;
        _layout.padding = padding;
        await _selfRect.UpdateLayout();
        for(float i = start; i <= end; i += smallStep)
        {
            bool isBig = i % bigStep == 0;
            if(isBig)
            {
                TMP_Text textItem = Instantiate(_textPrefab, _selfRect);
                textItem.text = i.ToString("0");
                RectTransform textItemRect = textItem.GetComponent<RectTransform>();
                Vector2 targetPosition = lines[i].anchoredPosition;
                targetPosition.y = -_selfRect.sizeDelta.y + textItemRect.sizeDelta.y / 2.0f;
                textItemRect.anchoredPosition = targetPosition;
            }
        }
    }

    private Vector2 GetScaledPosition( Vector2 v )
    {
        Vector2 inversed = new Vector2(1 / _parentCanvas.lossyScale.x, 1 / _parentCanvas.lossyScale.y);
        return Vector2.Scale(v, inversed);
    }
    
    public void OnPointerDown(PointerEventData eventData)
    {
        _velocity = 0;
    }

    public void OnBeginDrag(PointerEventData eventData)
    {
        m_routeToParent = Mathf.Abs(eventData.delta.x) < Mathf.Abs(eventData.delta.y);

        if (m_routeToParent)
        {
            foreach(IBeginDragHandler t in m_parentBeginDragHandlers)
                t.OnBeginDrag(eventData);
        }
        else
        {
            _velocity = 0;
            if(_currentTween != null)
            {
                _currentTween.Kill();
                _currentTween = null;
            }
            _dragStartPosition = _selfRect.anchoredPosition;
            _dragStartPointerPosition = GetScaledPosition(eventData.position);
        }
    }

    private Vector2 Clamp(Vector2 newPosition)
    {
        if(newPosition.x < -_selfRect.sizeDelta.x / 2.0f)
            newPosition.x = -_selfRect.sizeDelta.x / 2.0f;
        else if(newPosition.x > _selfRect.sizeDelta.x / 2.0f)
            newPosition.x = _selfRect.sizeDelta.x / 2.0f;
        return newPosition;
    }
    
    public void OnDrag(PointerEventData eventData)
    {
        if (m_routeToParent)
        {
            foreach(IDragHandler t in m_parentDragHandlers)
                t.OnDrag(eventData);
        }
        else
        {
            Vector2 newPosition = _dragStartPosition + GetScaledPosition(eventData.position) - _dragStartPointerPosition;
            newPosition.y = _selfRect.anchoredPosition.y;
            newPosition = Clamp(newPosition);
            _currentValue = _currentMin + (-newPosition.x + _selfRect.sizeDelta.x / 2.0f) / _selfRect.sizeDelta.x * (_currentMax - _currentMin);
            _selfRect.anchoredPosition = newPosition;
            OnValueChanged.Invoke(_currentValue);
        }
    }

    private float GetCurrentValueBasedOnStep()
    {
        float rest = _currentValue % _step / _step;
        if(rest < 0.5f)
            return _currentValue - _currentValue % -_step;
        return _currentValue - _currentValue % -_step + _step;
    }

    public void SetValue(float newValue)
    {
        _currentValue = newValue;
        float targetPositionX = -((_currentValue - _currentMin) / (_currentMax - _currentMin)) * _selfRect.sizeDelta.x + _selfRect.sizeDelta.x / 2.0f;
        _selfRect.anchoredPosition = new Vector2(targetPositionX, _selfRect.anchoredPosition.y);
    }
    
    public void OnEndDrag(PointerEventData eventData)
    {
        if (m_routeToParent)
        {
            foreach(IEndDragHandler t in m_parentEndDragHandlers)
                t.OnEndDrag(eventData);
        }
        else
        {
            _velocity = eventData.delta.x * _accelerationMultiplier * Time.deltaTime;
        }

        m_routeToParent = false;
    }

    private void ProcessStepped()
    {
        if(_step != 0)
        {
            _currentValue = GetCurrentValueBasedOnStep();
            float startPositionX = _selfRect.anchoredPosition.x;
            float targetPositionX = -((_currentValue - _currentMin) / (_currentMax - _currentMin)) * _selfRect.sizeDelta.x + _selfRect.sizeDelta.x / 2.0f;
            float alpha = startPositionX;
            _currentTween = DOTween.To(() => alpha, v => alpha = v, targetPositionX, 0.2f).SetEase(Ease.InOutSine);
            _currentTween.onUpdate += () =>
            {
                Vector2 newPosition = _selfRect.anchoredPosition;
                newPosition.x = alpha;
                _selfRect.anchoredPosition = newPosition;
            };
        }
        OnValueChanged.Invoke(_currentValue);
    }

    private void Update()
    {
        bool isZeroVelocity = _velocity == 0;
        if(isZeroVelocity)
            return;
        _velocity = Mathf.MoveTowards(_velocity, 0, _decelerationMultiplier * Time.deltaTime);
        Vector2 newPosition = _selfRect.anchoredPosition;
        newPosition.x += _velocity;
        newPosition = Clamp(newPosition);
        _selfRect.anchoredPosition = newPosition;
        _currentValue = _currentMin + (-newPosition.x + _selfRect.sizeDelta.x / 2.0f) / _selfRect.sizeDelta.x * (_currentMax - _currentMin);
        if( _step == 0 )
            OnValueChanged.Invoke(_currentValue);
        if(_velocity == 0 && _step != 0)
            ProcessStepped();
    }
}
