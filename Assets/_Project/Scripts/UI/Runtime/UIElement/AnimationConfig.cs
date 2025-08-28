using Cysharp.Threading.Tasks;
using System;
using System.Threading;

namespace VARTube.UI
{
    public class AnimationConfig
    {
        public Func<AnimationGroup, CancellationToken, UniTask> Show { get; set; } = UIAnimations.InstantIn;
        public Func<AnimationGroup, CancellationToken, UniTask> Hide { get; set; } = UIAnimations.InstantOut;
        public float Duration { get; set; } = UIAnimations.FAST_ANIMATION_DURATION;
        public float Delay { get; set; } = UIAnimations.DEFAULT_ANIMATION_DELAY;
    }
}