using Cysharp.Threading.Tasks;
using UnityEngine;
using UnityEngine.Events;

public class RulerSlider : MonoBehaviour
{
    [SerializeField]
    private RulerSliderHandle _handle;

    public UnityEvent<float> OnValueChanged => _handle.OnValueChanged;

    public async UniTask Setup(float minValue, float maxValue, float step = 0)
    {
        await _handle.Setup(minValue, maxValue, step);
    }

    public void SetValue(float newValue)
    {
        _handle.SetValue(newValue);
    }
}
