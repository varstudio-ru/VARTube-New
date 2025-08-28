using System.Linq;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using VARTube.Core.Services;
using VARTube.Network.Models;

public class AuthorizationStateScreen : UIScreenObsolete
{
    [SerializeField] private TMP_Text _authInfoText;
    [SerializeField] private TMP_Dropdown _companyDropdown;
    [SerializeField] private Button _logoutButton;

    private AuthorizationService _authorization;
    private AuthorizationStateService _authorizationState;

    private void OnAuthorizationStateUpdate(User user)
    {
        _authInfoText.text = user.Username;
        _companyDropdown.options = user.Companies.Select(c => new TMP_Dropdown.OptionData(c.Name)).ToList();
        _companyDropdown.SetValueWithoutNotify(_companyDropdown.options.FindIndex(o => o.text == _authorizationState.Company.Name));

        Show();
    }

    private void Awake()
    {
        _companyDropdown.onValueChanged.AddListener((v) => _authorizationState?.SetCompanyByIndex(_companyDropdown.value));

        _logoutButton.onClick.AddListener(() =>
        {
            if (_authorizationState.User.IsAuthorized)
            {
                _ = _authorization?.LogOut();
            }
        });
    }

    protected override void OnStart()
    {
        _authorization = ApplicationServices.GetService<AuthorizationService>();
        _authorizationState = ApplicationServices.GetService<AuthorizationStateService>();
        _authorizationState.OnUpdate += OnAuthorizationStateUpdate;

        Hide();
    }

    private void OnDestroy()
    {
        _authorizationState.OnUpdate -= OnAuthorizationStateUpdate;
        _logoutButton.onClick.RemoveAllListeners();
        _companyDropdown.onValueChanged.RemoveAllListeners();
    }
}