namespace VARTube.UI.ScreenManager.Samples
{
    public class UIScreen : ScreenBase
    {
        protected override void OnInit()
        {
            animationGroups[0].AnimationConfig = new AnimationConfig()
            {
                Show = UIAnimations.InstantIn,
                Hide = UIAnimations.InstantOut
            };
        }
    }
}