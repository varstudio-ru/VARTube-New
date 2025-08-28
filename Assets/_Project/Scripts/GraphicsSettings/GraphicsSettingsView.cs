using UnityEngine;
using VARTube.UI;

[DefaultExecutionOrder(-100)]
public class GraphicsSettingsView : MonoBehaviour
{
    [Header("Settings")]
    [SerializeField] private string[] _labels;
    [SerializeField] private Sprite _icon;

    [Header("Components")]
    [SerializeField] private GraphicsSettingsController _controller;
    [SerializeField] private GenericToggleGroup _toggleGroup;

    private void OnValueChanged(int value)
    {
        _controller.SelectGraphicsTier(value);
    }

    private void Init()
    {
        _toggleGroup.ClearItems();

        foreach (var label in _labels)
            _toggleGroup.CreateItem(_icon, label);

        _toggleGroup.SetValue(_controller.CurrentGraphicsTier);
        _toggleGroup.OnValueChanged.AddListener(OnValueChanged);
    }

    private void Start()
    {
        Init();
    }
}