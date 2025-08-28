using UnityEngine;
using UnityEngine.UI;

namespace VARTube.UI
{
    public interface IToggleItem
    {
        Toggle Toggle { get; }
        void SetIcon(Sprite icon);
        void SetText(string text);
    }
}