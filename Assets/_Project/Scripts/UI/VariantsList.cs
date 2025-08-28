using Cysharp.Threading.Tasks;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
using VARTube.Core.Services;
using VARTube.Network;
using VARTube.Network.Models;

public class VariantsList : MonoBehaviour
{
    [SerializeField]
    private RectTransform _content;
    [SerializeField]
    private Button _itemPrefab;

    [SerializeField] private Color _highlightedBackgroundColor;
    [SerializeField] private Color _highlightedTextColor;
    [SerializeField] private Color _unhighlightedBackgroundColor;
    [SerializeField] private Color _unhighlightedTextColor;

    public UnityEvent<Variant> OnSelected = new();
    private Button _current;

    public async UniTask Setup(Variant currentVariant)
    {
        if( !currentVariant.IsValid )
            return;
        NetworkService _networkService = ApplicationServices.GetService<NetworkService>();
        Variant[] variants = await _networkService.GetVariants(currentVariant.projectGuid);

        foreach(Variant variant in variants)
        {
            AddItem(variant, variant.calculationGuid == currentVariant.calculationGuid);
        }
    }
    
    private void SetButtonHighlight( Button target, bool value )
    {
        ColorBlock colors = target.colors;
        colors.normalColor = value ? _highlightedBackgroundColor : _unhighlightedBackgroundColor;
        colors.selectedColor = colors.normalColor;
        colors.highlightedColor = colors.normalColor;
        target.colors = colors;
        target.GetComponentInChildren<TMP_Text>().color = value ? _highlightedTextColor : _unhighlightedTextColor;
    }
    
    public void AddItem(Variant variant, bool isSelected)
    {
        Button item = Instantiate(_itemPrefab, _content);
        item.GetComponentInChildren<TMP_Text>().text = "v" + (_content.childCount - 1);
        if(isSelected)
        {
            if( _current )
                SetButtonHighlight(_current, false);
            _current = item;
        }
        SetButtonHighlight(item, isSelected);
        item.onClick.AddListener(() =>
        {
            if( _current )
                SetButtonHighlight(_current, false);
            _current = item;
            SetButtonHighlight(item, true);
            OnSelected.Invoke(variant);
        } );
    }
}
