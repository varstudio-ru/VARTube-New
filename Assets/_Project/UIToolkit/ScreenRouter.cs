using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public enum ScreenId { Login, Home }

public interface IEnterNoArgs : IScreen
{
    void OnEnter();
}

public class ScreenRouter : MonoBehaviour
{
    [SerializeField] UIDocument doc;
    VisualElement _host; 


    readonly Stack<IScreen> _stack = new();
    readonly Dictionary<ScreenId, Func<IScreen>> _factories = new();


    void Awake()
    {
        if (!doc) doc = GetComponent<UIDocument>();
        _host = doc.rootVisualElement.Q("appRoot") ?? doc.rootVisualElement;
    }


    public void Register(ScreenId id, Func<IScreen> factory) => _factories[id] = factory;


    // --- Без аргументов ---
    public void Push(ScreenId id)
    {
        var s = _factories[id]();
        if (s is IEnterNoArgs enter) enter.OnEnter();
        Mount(s);
    }


    public void Replace(ScreenId id)
    {
        while (_stack.Count > 0) Pop();
        Push(id);
    }


    // --- С аргументами ---
    public void Push<TArgs>(ScreenId id, TArgs args)
    {
        var s = _factories[id]();
        if (s is IScreen<TArgs> typed) typed.OnEnter(args);
        else Debug.LogError($"Screen {id} не реализует IScreen<{typeof(TArgs).Name}>");
        Mount(s);
    }


    public void Replace<TArgs>(ScreenId id, TArgs args)
    {
        while (_stack.Count > 0) Pop();
        Push(id, args);
    }


    void Mount(IScreen s)
    {
        _host.Add(s.Root);
        _stack.Push(s);
    }


    public bool Pop()
    {
        if (_stack.Count == 0) return false;
        var top = _stack.Pop();
        top.OnExit();
        _host.Remove(top.Root);
        return true;
    }


    void Update()
    {
        if (Application.platform == RuntimePlatform.Android && Input.GetKeyDown(KeyCode.Escape))
        {
            if (_stack.Count > 0 && _stack.Peek().HandleBack()) return;
            if (!Pop()) Application.Quit();
        }
    }
}