using Cysharp.Threading.Tasks;
using UnityEngine;
using VARTube.Core.Services;
using VARTube.UI;
using VARTube.UI.ScreenManager;

public class CatalogLoaderTest : MonoBehaviour
{
    //public MainMenuScreenManager screenManager;

    private AuthorizationService _authorization;
    private AuthorizationStateService _authorizationState;

    public bool IsLoaded;

    //TODO: create Root scene and load MainScene from it
    private void Start()
    {
        _authorization = ApplicationServices.GetService<AuthorizationService>();
        _authorizationState = ApplicationServices.GetService<AuthorizationStateService>();

        UniTask.Void(async () =>
        {
            //screenManager.Open<LoadingScreen>();

            await _authorization.TryAuthorize();

            //if (_authorizationState.User.IsAuthorized)
            //{
            //    await screenManager.OpenAsync<MainMenuScreen>();
            //}
            //else
            //{
            //    await screenManager.OpenAsync<AuthorizationPopup>();
            //}

            IsLoaded = true;
        });
    }

    public void OpenScreen<T>() where T : MonoBehaviour
    {
        //screenManager.Open<T>();
    }
}