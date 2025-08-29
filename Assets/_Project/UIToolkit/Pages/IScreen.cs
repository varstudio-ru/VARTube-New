using UnityEngine.UIElements;

public interface IScreen
{
    VisualElement Root { get; }
    void OnExit();
    bool HandleBack() => false;
}

public interface IScreen<in TArgs> : IScreen
{
    void OnEnter(TArgs args);
}

public interface IScreenNoArgs : IScreen
{
    void OnEnter();
}