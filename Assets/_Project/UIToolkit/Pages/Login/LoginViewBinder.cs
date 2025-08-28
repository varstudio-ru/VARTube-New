using System;
using UnityEngine;
using UnityEngine.UIElements;
using VARTube.UI.Components;
using Button = VARTube.UI.Components.Button;
using Input = VARTube.UI.Components.Input;

public sealed class LoginViewBinder
{
    private bool _allowSubmit = false;
    private bool _isBusy = false;

    public VisualElement Root { get; }
    public FormStatus Status { get; }
    public Input Username { get; }
    public Input Password { get; }
    public Button Submit { get; }

    public event Action<string, string> OnSubmitRequested;


    public LoginViewBinder(VisualElement root)
    {
        Root = root;
        Username = Root.Q<Input>("username");
        Password = Root.Q<Input>("password");
        Submit = Root.Q<Button>("submit");
        Status = Root.Q<FormStatus>("status");

        Username.RegisterValueChangedCallback(_ => Validate());
        Password.RegisterValueChangedCallback(_ => Validate());

        Submit.clicked += OnSubmit;

        //Username.RegisterCallback<KeyDownEvent>(OnKeyDownSubmit);
        //Password.RegisterCallback<KeyDownEvent>(OnKeyDownSubmit);

        Validate();
    }

    public void ShowError()
    {
        Status.SetVisible(true);
    }

    public void SetBusy(bool isBusy)
    {
        _isBusy = isBusy;
        Validate();
    }

    public void Clear()
    {
        Username.value = string.Empty;
        Password.value = string.Empty;
    }

    private void OnSubmit()
    {
        if (!_allowSubmit)
            return;

        OnSubmitRequested?.Invoke(Username.value ?? string.Empty, Password.value ?? string.Empty);
    }


    void OnKeyDownSubmit(KeyDownEvent e)
    {
        if (!_allowSubmit)
            return;

        if (e.keyCode != KeyCode.Return && e.keyCode != KeyCode.KeypadEnter)
            return;

        OnSubmitRequested?.Invoke(Username.value ?? string.Empty, Password.value ?? string.Empty);
        e.StopPropagation();
    }

    void Validate()
    {
        int u = (Username.value ?? string.Empty).Trim().Length;
        int p = (Password.value ?? string.Empty).Length;
        _allowSubmit = u >= 3 && p >= 3;

        Submit.SetEnabled(_allowSubmit && !_isBusy);
        Status.SetVisible(false);
    }
}
