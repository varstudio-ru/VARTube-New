namespace VARTube.UI.ScreenManager.Samples
{
    public class UIPopup : ScreenBase
    {
        protected override void OnInit()
        {
            //bg
            animationGroups[0].AnimationConfig = new AnimationConfig()
            {
                Show = UIAnimations.FadeIn,
                Hide = UIAnimations.FadeOut
            };

            //body
            animationGroups[1].AnimationConfig = new AnimationConfig()
            {
                Show = UIAnimations.FadeInUp,
                Hide = UIAnimations.FadeOutDown,
                Delay = UIAnimations.DEFAULT_ANIMATION_DELAY,
                Duration= UIAnimations.FAST_ANIMATION_DURATION
            };
        }
    }
}