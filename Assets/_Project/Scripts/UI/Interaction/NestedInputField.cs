using Cysharp.Threading.Tasks;
using System.Linq;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class NestedInputField : TMP_InputField
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

    public override void OnPointerClick(PointerEventData eventData)
    {
        if (_shouldRouteToParent)
            return;

        base.OnPointerDown(eventData);
        base.OnPointerUp(eventData);
        UniTask.Void(async () =>
        {
       
        });
    }

    public void OnInitializePotentialDrag(PointerEventData eventData)
    {
        if (!_init)
            return;

        _parentInitializePotentialDragHandler.OnInitializePotentialDrag(eventData);
    }

    public override void OnBeginDrag(PointerEventData eventData)
    {
        _shouldRouteToParent = ShouldRouteToParent(eventData);

        if (!_shouldRouteToParent)
        {
            base.OnBeginDrag(eventData);
            return;
        }

        if (!_init)
            return;

        _parentBeginDragHandler.OnBeginDrag(eventData);
    }

    public override void OnDrag(PointerEventData eventData)
    {
        if (!_shouldRouteToParent)
        {
            base.OnDrag(eventData);
            return;
        }

        if (!_init)
            return;

        _parentDragHandler.OnDrag(eventData);
    }

    private bool ShouldRouteToParent(PointerEventData eventData)
    {
        return Mathf.Abs(eventData.delta.x) < Mathf.Abs(eventData.delta.y);
    }

    public override void OnEndDrag(PointerEventData eventData)
    {
        if (!_shouldRouteToParent)
        {
            base.OnEndDrag(eventData);
            return;
        }

        if (!_init)
            return;

        _parentEndDragHandler.OnEndDrag(eventData);
        _shouldRouteToParent = false;
    }

    public static NestedInputField ReplaceInputField(TMP_InputField target)
    {
        var text = target.text;
        var textComponent = target.textComponent;
        var placeholder = target.placeholder;
        var onValueChanged = target.onValueChanged;
        var onEndEdit = target.onEndEdit;
        var contentType = target.contentType;
        var lineType = target.lineType;
        var characterLimit = target.characterLimit;
        var inputType = target.inputType;
        var keyboardType = target.keyboardType;
        var characterValidation = target.characterValidation;
        var readOnly = target.readOnly;
        var richText = target.richText;
        var caretBlinkRate = target.caretBlinkRate;
        var caretColor = target.caretColor;
        var customCaretColor = target.customCaretColor;
        var selectionColor = target.selectionColor;
        var caretWidth = target.caretWidth;
        var textViewport = target.textViewport;
        var restoreOriginal = target.restoreOriginalTextOnEscape;

        GameObject targetGameObject = target.gameObject;
        DestroyImmediate(target);

        NestedInputField nestedInput = targetGameObject.AddComponent<NestedInputField>();

        nestedInput.text = text;
        nestedInput.textComponent = textComponent;
        nestedInput.placeholder = placeholder;
        nestedInput.onValueChanged = onValueChanged;
        nestedInput.onEndEdit = onEndEdit;
        nestedInput.contentType = contentType;
        nestedInput.lineType = lineType;
        nestedInput.characterLimit = characterLimit;
        nestedInput.inputType = inputType;
        nestedInput.keyboardType = keyboardType;
        nestedInput.characterValidation = characterValidation;
        nestedInput.readOnly = readOnly;
        nestedInput.richText = richText;
        nestedInput.caretBlinkRate = caretBlinkRate;
        nestedInput.caretColor = caretColor;
        nestedInput.customCaretColor = customCaretColor;
        nestedInput.selectionColor = selectionColor;
        nestedInput.caretWidth = caretWidth;
        nestedInput.textViewport = textViewport;
        nestedInput.restoreOriginalTextOnEscape = restoreOriginal;

        return nestedInput;
    }
}
