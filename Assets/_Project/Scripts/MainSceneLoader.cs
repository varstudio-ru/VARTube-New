using Cysharp.Threading.Tasks;
using System;
using UnityEngine;
using VARTube.Core.Services;
using VARTube.Network.Models;
using VARTube.Stats;
using VARTube.UI;

public class MainSceneLoader : MonoBehaviour
{
    [SerializeField] private GameObject _authorizationScreen;
    [SerializeField] private WebViewScreenController _webViewScreen;

    private AuthorizationService _authorization;
    private AuthorizationStateService _authorizationStateService;
    private StatsService _statsService;
    private LoadingScreen _loadingScreen;


    private void Start()
    {
        Debug.Log("start");
        _authorization = ApplicationServices.GetService<AuthorizationService>();
        _authorizationStateService = ApplicationServices.GetService<AuthorizationStateService>();
        _statsService = ApplicationServices.GetService<StatsService>();
        _loadingScreen = ApplicationServices.GetService<LoadingScreen>();

        _authorizationStateService.OnLogout += OnLogout;

        Route().Forget();
    }

    private void OnLogout()
    {
        _authorizationScreen.SetActive(true);
        _loadingScreen?.gameObject.SetActive(false);
    }

    private void OnEnable()
    {
        Debug.Log("OnEnable");

        Route().Forget();
    }

    private async UniTaskVoid Route()
    {
        _loadingScreen?.gameObject.SetActive(true);

        if (_authorization == null)
            return;

        var auth = await _authorization.TryAuthorize();
        if (auth)
        {
            _statsService.OnEnter2DZone().Forget();
            _webViewScreen.Show();
            //await _screenManager.OpenAsync<WebViewScreenController>();
        }
        else
        {
            _authorizationScreen.SetActive(true);
            _loadingScreen?.gameObject.SetActive(false);
        }
    }
}