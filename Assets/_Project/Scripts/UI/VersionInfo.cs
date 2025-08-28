using TMPro;
using UnityEngine;

public class VersionInfo : MonoBehaviour
{
    [Header("Components")]
    [SerializeField] private TextMeshProUGUI _text;

    private void Awake()
    {
        _text.SetText($"Vartube {Application.version} ({nkjzm.UniBuildNumber.GetCurrentBuildNumber()})");
    }
}