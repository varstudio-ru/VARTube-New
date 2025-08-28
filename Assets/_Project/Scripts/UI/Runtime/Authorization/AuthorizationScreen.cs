using Cysharp.Threading.Tasks;
using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using VARTube.Core.Services;
using VARTube.Localization;
using VARTube.Network.Models;

public class AuthorizationScreen : UIScreenObsolete
{
    [SerializeField] private TMP_InputField _loginInput;
    [SerializeField] private TMP_InputField _passwordInput;
    [SerializeField] private InfoText _infoText;
    [SerializeField] private Button _applyButton;
    [Space]
    //TODO: move to GameConfig sub storage
    [SerializeField] private string _enterCredentialsLocalizationKey = "authorization_screen_enter_credentials_warning";
    [SerializeField] private string _invalidCredentialsLocalizationKey = "authorization_screen_invalid_credentials_error";
    [SerializeField] private string _commonErrorLocalizationKey = "authorization_screen_common_error";

    private const string server_resp_invalid_grant = "invalid_grant";

    private AuthorizationService _authorization;
    private AuthorizationStateService _authorizationState;

    private void OnAuthorizationStateUpdate(User user)
    {
        if (!user.IsAuthorized) { Show(); }
    }

    private void OnApplyButtonClick()
    {
        UniTask.Void(async () =>
        {
            try
            {
                if (string.IsNullOrEmpty(_loginInput.text) || string.IsNullOrEmpty(_passwordInput.text))
                {
                    var enterCredentialsText = _localization.Get(LocalizationTableType.UI, _enterCredentialsLocalizationKey);
                    _infoText.Show(enterCredentialsText, Color.red);

                    return;
                }

                await _authorization.LogIn(_loginInput.text, _passwordInput.text);
            }
            catch (Exception ex) when (!(ex is OperationCanceledException))
            {
                var invalidCredentialsText = _localization.Get(LocalizationTableType.UI, _invalidCredentialsLocalizationKey);
                var commonErrorText = _localization.Get(LocalizationTableType.UI, _commonErrorLocalizationKey, ex.Message);
                _infoText.Show(ex.Message == server_resp_invalid_grant ? invalidCredentialsText : commonErrorText, Color.red);

                return;
            }

            Hide();
        });
    }

    protected override void OnStart()
    {
        UniTask.Void(async () =>
        {
            Hide();

            _authorization = ApplicationServices.GetService<AuthorizationService>();
            _authorizationState = ApplicationServices.GetService<AuthorizationStateService>();

            _authorizationState.OnUpdate += OnAuthorizationStateUpdate;
            _applyButton.onClick.AddListener(OnApplyButtonClick);

            var isAuthorized = await _authorization.TryAuthorize();
            if (!isAuthorized) { Show(); }
        });
    }

    private void OnDestroy()
    {
        _authorizationState.OnUpdate -= OnAuthorizationStateUpdate;
        _applyButton.onClick.RemoveListener(OnApplyButtonClick);
    }
}