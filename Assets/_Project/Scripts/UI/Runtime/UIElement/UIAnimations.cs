using Cysharp.Threading.Tasks;
using DG.Tweening;
using System.Threading;
using UnityEngine;
using VARTube.Core;

namespace VARTube.UI
{
    public static class UIAnimationHandler
    {
        public static async UniTask ProcessShow(AnimationGroup element,
                                   CancellationToken ct = default)
        {
            await OnBedoreAnimationShowStart(element, ct);
            await OnAnyAnimationStart(element, ct);
            await element.AnimationConfig.Show(element, ct);
            await OnAnyAnimationEnd(element, ct);
        }

        public static async UniTask ProcessHide(AnimationGroup element,
                                   CancellationToken ct = default)
        {
            await OnAnyAnimationStart(element, ct);
            await element.AnimationConfig.Hide(element, ct);
            await OnAnyAnimationEnd(element, ct);
        }

        private static async UniTask OnAnyAnimationStart(AnimationGroup element,
                               CancellationToken ct)
        {
            element.CanvasGroup.blocksRaycasts = false;

            await UniTask.Delay(element.AnimationConfig.Delay.FromSecToMs());
        }

#pragma warning disable CS1998
        private static async UniTask OnAnyAnimationEnd(AnimationGroup element,
                                   CancellationToken ct)
        {
            element.CanvasGroup.blocksRaycasts = true;
        }
#pragma warning restore CS1998

        private static async UniTask OnBedoreAnimationShowStart(AnimationGroup element,
                       CancellationToken ct)
        {
            await UIAnimations.InstantOut(element, ct);
        }
    }

    /// <summary>
    /// Add new animations to this class
    /// </summary>
    public static class UIAnimations
    {
        public const float FAST_ANIMATION_DURATION = .2f;
        public const float SLOW_ANIMATION_DURATION = .6f;
        public const float DEFAULT_ANIMATION_DELAY = 0f;

#pragma warning disable CS1998
        public static async UniTask InstantIn(AnimationGroup element,
                                              CancellationToken ct = default)
        {
            element.CanvasGroup.alpha = 1f;
        }

        public static async UniTask InstantOut(AnimationGroup element,
                                              CancellationToken ct = default)
        {
            element.CanvasGroup.alpha = 0f;
        }
#pragma warning restore CS1998

        public static async UniTask FadeIn(AnimationGroup element,
                                           CancellationToken ct = default)
        {
            InstantOut(element).Forget();

            await element.CanvasGroup.DOFade(1, element.AnimationConfig.Duration).ToUniTask(cancellationToken: ct);
        }

        public static async UniTask FadeOut(AnimationGroup element,
                                            CancellationToken ct = default)
        {
            InstantIn(element).Forget();

            await element.CanvasGroup.DOFade(0, element.AnimationConfig.Duration).ToUniTask(cancellationToken: ct);
        }

        public static async UniTask FadeInUp(AnimationGroup element,
                                           CancellationToken ct = default)
        {
            var rect = element.CanvasGroup.GetComponent<RectTransform>();
            var targetPos = rect.anchoredPosition;
            var pos = targetPos;

            pos.y -= rect.sizeDelta.y;
            rect.anchoredPosition = pos;
            InstantOut(element).Forget();

            var move = rect.DOAnchorPosY(targetPos.y, element.AnimationConfig.Duration).ToUniTask(cancellationToken: ct);
            var fade = FadeIn(element, ct);

            await UniTask.WhenAll(move, fade);

            rect.anchoredPosition = targetPos;
        }

        public static async UniTask FadeInDown(AnimationGroup element,
                                   CancellationToken ct = default)
        {
            var rect = element.CanvasGroup.GetComponent<RectTransform>();
            var targetPos = rect.anchoredPosition;
            var pos = targetPos;

            pos.y += rect.sizeDelta.y;
            rect.anchoredPosition = pos;
            InstantOut(element).Forget();

            var move = rect.DOAnchorPosY(targetPos.y, element.AnimationConfig.Duration).ToUniTask(cancellationToken: ct);
            var fade = FadeIn(element, ct);

            await UniTask.WhenAll(move, fade);

            rect.anchoredPosition = targetPos;
        }

        public static async UniTask FadeOutUp(AnimationGroup element,
                                   CancellationToken ct = default)
        {
            var rect = element.CanvasGroup.GetComponent<RectTransform>();
            var targetPosY = rect.anchoredPosition.y + rect.sizeDelta.y;
            var pos = rect.anchoredPosition;

            InstantIn(element).Forget();

            var move = rect.DOAnchorPosY(targetPosY, element.AnimationConfig.Duration).ToUniTask(cancellationToken: ct);
            var fade = FadeOut(element, ct);

            await UniTask.WhenAll(move, fade);

            rect.anchoredPosition = pos;
        }

        public static async UniTask FadeOutDown(AnimationGroup element,
                                 CancellationToken ct = default)
        {
            var rect = element.CanvasGroup.GetComponent<RectTransform>();
            var targetPosY = rect.anchoredPosition.y - rect.sizeDelta.y;
            var pos = rect.anchoredPosition;

            InstantIn(element).Forget();

            var move = rect.DOAnchorPosY(targetPosY, element.AnimationConfig.Duration).ToUniTask(cancellationToken: ct);
            var fade = FadeOut(element, ct);

            await UniTask.WhenAll(move, fade);

            rect.anchoredPosition = pos;
        }
    }
}