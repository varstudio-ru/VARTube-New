using UnityEngine;
using VARTube.Core.Services;
using VARTube.Localization;

public abstract class UIScreenObsolete : MonoBehaviour
{
    protected LocalizationService _localization;

    protected virtual void Show()
    {
        gameObject.SetActive(true);
    }

    protected virtual void Hide()
    {
        gameObject.SetActive(false);
    }

    protected virtual void OnStart() { }

    private void Start()
    {
        _localization = ApplicationServices.GetService<LocalizationService>();

        OnStart();
    }
}