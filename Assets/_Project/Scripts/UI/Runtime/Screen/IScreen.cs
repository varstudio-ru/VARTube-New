namespace VARTube.UI
{
    public interface IScreen : IUIElement
    {
        public ScreenType Type { get; }
    }
}