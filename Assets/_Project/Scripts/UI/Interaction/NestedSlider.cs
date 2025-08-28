using Cysharp.Threading.Tasks;
using System.Linq;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class NestedSlider : Slider, IBeginDragHandler, IEndDragHandler, IPointerClickHandler
{
    private ScrollRect _parentScrollRect;

    private IInitializePotentialDragHandler _parentInitializePotentialDragHandler;
    private IBeginDragHandler _parentBeginDragHandler;
    private IDragHandler _parentDragHandler;
    private IEndDragHandler _parentEndDragHandler;

    private bool _shouldRouteToParent = false;
    private bool _init = false;


    protected override void Awake()
    {
        base.Awake();

        _parentScrollRect = GetComponentsInParent<ScrollRect>(true)
              .FirstOrDefault(s => s != this);

        if (_parentScrollRect == null)
            return;

        _parentInitializePotentialDragHandler = _parentScrollRect.GetComponent<IInitializePotentialDragHandler>();
        _parentBeginDragHandler = _parentScrollRect.GetComponent<IBeginDragHandler>();
        _parentDragHandler = _parentScrollRect.GetComponent<IDragHandler>();
        _parentEndDragHandler = _parentScrollRect.GetComponent<IEndDragHandler>();

        _init = true;
    }

    public override void OnPointerDown(PointerEventData eventData)
    { }

    public void OnPointerClick(PointerEventData eventData)
    {
        if (_shouldRouteToParent)
            return;

        base.OnPointerDown(eventData);
        base.OnPointerUp(eventData);
        UniTask.Void(async () =>
        {
           
        });
    }

    public override void OnInitializePotentialDrag(PointerEventData eventData)
    {
        if (!_init)
            return;

        _parentInitializePotentialDragHandler.OnInitializePotentialDrag(eventData);

        base.OnInitializePotentialDrag(eventData);
    }

    public void OnBeginDrag(PointerEventData eventData)
    {
        _shouldRouteToParent = ShouldRouteToParent(eventData);

        if (!_shouldRouteToParent)
            return;

        if (!_init)
            return;

        _parentBeginDragHandler.OnBeginDrag(eventData);
    }

    private bool ShouldRouteToParent(PointerEventData eventData)
    {
        return (!direction.Equals(Direction.LeftToRight) && !direction.Equals(Direction.RightToLeft) && Mathf.Abs(eventData.delta.x) > Mathf.Abs(eventData.delta.y))
               || (!direction.Equals(Direction.TopToBottom) && !direction.Equals(Direction.BottomToTop) && Mathf.Abs(eventData.delta.x) < Mathf.Abs(eventData.delta.y));
    }

    public override void OnDrag(PointerEventData eventData)
    {
        if (!_shouldRouteToParent)
        {
            base.OnDrag(eventData);

            if (value == maxValue || value == minValue)
                onValueChanged?.Invoke(value);

            return;
        }

        if (!_init)
            return;

        _parentDragHandler.OnDrag(eventData);
    }

    public void OnEndDrag(PointerEventData eventData)
    {
        if (!_shouldRouteToParent)
            return;

        if (!_init)
            return;

        _parentEndDragHandler.OnEndDrag(eventData);
        _shouldRouteToParent = false;
    }

    public static NestedSlider ReplaceSlider(Slider target)
    {
        var interactable = target.interactable;
        var transition = target.transition;
        var colors = target.colors;
        var spriteState = target.spriteState;
        var animationTriggers = target.animationTriggers;
        var targetGraphic = target.targetGraphic;
        var direction = target.direction;
        var handleRect = target.handleRect;
        var fillRect = target.fillRect;
        var value = target.value;
        var minValue = target.minValue;
        var maxValue = target.maxValue;
        var wholeNumbers = target.wholeNumbers;
        var onValueChanged = target.onValueChanged;

        GameObject targetGameObject = target.gameObject;
        DestroyImmediate(target);

        NestedSlider nestedSlider = targetGameObject.AddComponent<NestedSlider>();

        nestedSlider.interactable = interactable;
        nestedSlider.transition = transition;
        nestedSlider.colors = colors;
        nestedSlider.spriteState = spriteState;
        nestedSlider.animationTriggers = animationTriggers;
        nestedSlider.targetGraphic = targetGraphic;
        nestedSlider.direction = direction;
        nestedSlider.fillRect = fillRect;
        nestedSlider.handleRect = handleRect;
        nestedSlider.minValue = minValue;
        nestedSlider.maxValue = maxValue;
        nestedSlider.wholeNumbers = wholeNumbers;
        nestedSlider.value = value;
        nestedSlider.onValueChanged = onValueChanged;

        Destroy(target);

        return nestedSlider;
    }
}

