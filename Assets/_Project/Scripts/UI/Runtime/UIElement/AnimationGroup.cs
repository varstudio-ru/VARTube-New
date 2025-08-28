using System;
using UnityEngine;

namespace VARTube.UI
{
    [Serializable]
    public class AnimationGroup
    {
        [SerializeField] private CanvasGroup _canvasGroup;

        public CanvasGroup CanvasGroup => _canvasGroup;
        public AnimationConfig AnimationConfig { get; set; } = new();
    }
}