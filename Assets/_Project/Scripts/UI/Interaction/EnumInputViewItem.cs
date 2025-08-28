using Cysharp.Threading.Tasks;
using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

public class EnumInputViewItem : MonoBehaviour
{
    [SerializeField]
    private Button _button;
    [SerializeField]
    private TMP_Text _label;
    [SerializeField]
    private Color _selectedBackgroundColor;
    [SerializeField]
    private Color _deselectedBackgroundColor;
    [SerializeField]
    private Color _selectedBackgroundPressColor;
    [SerializeField]
    private Color _deselectedBackgroundPressColor;
    [SerializeField]
    private Color _selectedTextColor;
    [SerializeField]
    private Color _deselectedTextColor;

    public UnityEvent OnSelected => _button.onClick;

    private Tweener _currentTween;

    public void SetText(string text)
    {
        _label.text = text;
    }

    public async UniTask SetSelected(bool value, bool withAnimation = false)
    {
        _currentTween?.Kill();
        ColorBlock block = _button.colors;
        Color targetBackgroundColor = value ? _selectedBackgroundColor : _deselectedBackgroundColor;
        Color targetTextColor = value ? _selectedTextColor : _deselectedTextColor;
        block.pressedColor = value ? _selectedBackgroundPressColor : _deselectedBackgroundPressColor;
        if( !withAnimation )
        {
            block.normalColor = targetBackgroundColor;
            block.selectedColor = targetBackgroundColor;
            block.highlightedColor = targetBackgroundColor;
            _button.colors = block;

            _label.color = targetTextColor;
        }
        else
        {
            Color startBackgroundColor = block.normalColor;
            Color startTextColor = _label.color;
            
            float alpha = 0;
            _currentTween = DOTween.To(() => alpha, v => alpha = v, 1, 0.5f);
            _currentTween.SetEase(Ease.InOutSine);
            _currentTween.onUpdate += () =>
            {
                Color color = Color.Lerp(startBackgroundColor, targetBackgroundColor, alpha);
                block.normalColor = color;
                block.selectedColor = color;
                block.highlightedColor = color;
                _button.colors = block;

                _label.color = Color.Lerp(startTextColor, targetTextColor, alpha);
            };
            await _currentTween.AsyncWaitForCompletion().AsUniTask();
        }
    }
}
