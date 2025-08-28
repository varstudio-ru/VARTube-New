using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace VARTube.UI
{
    public class ToggleItem : MonoBehaviour, IToggleItem
    {
        [SerializeField] private Image _icon;
        [SerializeField] private TextMeshProUGUI _label;
        [SerializeField] private Toggle _toggle;

        public Toggle Toggle => _toggle;

        public void SetIcon(Sprite icon)
        {
            if (_icon != null)
            {
                _icon.sprite = icon;
            }
        }

        public void SetText(string text)
        {
            if (_label != null)
            {
                _label.text = text;
            }
        }
    }
}