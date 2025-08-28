using System;
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(Button))]
public class ToggleButton : MonoBehaviour
{
    [SerializeField] private Image _target;
    [SerializeField] private Sprite _active, _inactive;

    private Button _button;
    private bool _isOn;

    public bool IsOn { get => _isOn; set => SetIsOn(value); }
    public event Action<bool> OnClick;


    public void SetIsOn(bool value)
    {
        SetIsOnWithoutNotify(value);
        OnClick?.Invoke(value);
    }

    public void SetIsOnWithoutNotify(bool value)
    {
        _isOn = value;
        UpdateSprite();
    }

    private void Init()
    {
        _button = GetComponent<Button>();
        _button.onClick.AddListener(ToggleState);
        UpdateSprite();
    }

    private void ToggleState()
    {
        SetIsOn(!_isOn);
    }

    private void UpdateSprite()
    {
        if (_active == null || _inactive == null)
            return;

        if (_target == null)
            return;

        _target.sprite = _isOn ? _active : _inactive;
    }

    void Start()
    {
        Init();
    }
}
