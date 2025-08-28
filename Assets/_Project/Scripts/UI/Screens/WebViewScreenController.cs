using Cysharp.Threading.Tasks;
using System;
using System.Linq;
using System.Text.RegularExpressions;
using UnityEngine;
using VARTube.Core.Services;
using VARTube.Network;
using VARTube.Network.Models;
using VARTube.UI.ScreenManager;
using VARTube.WebView2DZone;
using static VARTube.WebView2DZone.Browser2DZoneController;

namespace VARTube.UI
{
    public class WebViewScreenController : MonoBehaviour, IScreenContext
    {
        [SerializeField] private Browser2DZoneController _controller;

        private ProductEnvironmentManager _productEnvironmentManager;
        private AuthorizationService _authorizationService;
        private AuthorizationStateService _authorizationStateService;
        private NetworkService _networkService;
        private ScreenContext _screenContext;
        private MainMenuScreenManager _mainMenuScreenManager;
        private LoadingScreen _loadingScreen;

        public void SetContext(ScreenContext context)
        {
            _screenContext = context;
        }

        public void Open(Variant variant)
        {
            //  _webViewController.Open(variant.calculationGuid, variant.projectGuid);
        }

        public void ClearCache()
        {
            //_webViewController.ClearCache();
        }

        public void Show()
        {
            _controller.Show();

            if (_controller.CurrentStatus==Status.Loaded)
                _loadingScreen.gameObject.SetActive(false);
        }

        public void Hide()
        {
            _controller.Hide();
        }

        private async void Init()
        {
            ApplicationServices.RegisterSingleton(this);

            _networkService = ApplicationServices.GetService<NetworkService>();
            _productEnvironmentManager = ApplicationServices.GetService<ProductEnvironmentManager>();
            _authorizationService = ApplicationServices.GetService<AuthorizationService>();
            _authorizationStateService = ApplicationServices.GetService<AuthorizationStateService>();
            //_mainMenuScreenManager = ApplicationServices.GetService<MainMenuScreenManager>();
            _loadingScreen = ApplicationServices.GetService<LoadingScreen>();

            _authorizationStateService.OnUpdate += OnUserUpdate;
            _authorizationStateService.OnLogout += OnLogout;

            _controller.On2DZoneStatusChanged += On2DZoneStatusChanged;
            _controller.OnSceneOpenRequest += OnSceneOpenRequest;
            _controller.OnActionRequest += OnActionRequest;
            _controller.OnCompanySelectRequest += OnCompanySelectRequest;

            await _controller.Init($"Vartube {Application.version} ({nkjzm.UniBuildNumber.GetCurrentBuildNumber()})");
            _controller.Hide();

            if (await Auth())
            {
                //ShowPreloader(true);
                await _controller.Load();
            }
        }

        private void OnActionRequest(ActionType actionType)
        {
            switch (actionType)
            {
                case ActionType.OpenUrl:
                    OpenFromClipboardAsync().Forget();
                    break;
                case ActionType.Qr:
                    throw new NotImplementedException();
                case ActionType.Reload:
                    break;
                case ActionType.Debug:
                    const string testUrl = "?pr=5c0ecdd1-b4a2-43f9-989a-57a75bdd1e95&variant=f0375352-233f-4f11-bc42-a628309603dd";
                    TryToOpenFromString(testUrl).Forget();
                    break;
                case ActionType.Logout:
                    _ = _authorizationService?.LogOut();
                    _controller.Logout().Forget();
                    //_mainMenuScreenManager.Open<AuthorizationPopup>();
                    break;
                default:
                    break;
            }
        }

        private async UniTask OpenFromClipboardAsync()
        {
            string url = GUIUtility.systemCopyBuffer;

            await TryToOpenFromString(url);
        }

        private async UniTask TryToOpenFromString(string inStr)
        {
            if (ToGuid(inStr) != null)
            {
                var projectGuid = (await _networkService.GetProjectInfoByCalculation(inStr)).ProjectGuid;
                await OpenFromGuid(projectGuid);
            }
            else
            {
                await OpenFromURLAsync(inStr);
            }
        }

        private async UniTask OpenFromURLAsync(string url)
        {
            var variantGuid = ToGuid(GetVariant(url));
            var projectGuid = ToGuid(GetProject(url));

            if (projectGuid == null)
            {
                var caclulationGuid = ToGuid(GetCalculation(url));
                if (caclulationGuid == null)
                {
                    _screenContext.Manager.ShowBanner("Empty URL", "Clipboard is empty");
                    return;
                }

                projectGuid = (await _networkService.GetProjectInfoByCalculation(caclulationGuid.Value.ToString())).ProjectGuid;
            }

            await OpenFromGuid(projectGuid, variantGuid);
        }

        private static Guid? ToGuid(string guid)
            => Guid.TryParse(guid, out var g) ? g : (Guid?)null;


        private static string? GetCalculation(string url)
        {
            var m = Regex.Match(url, @"[?#&]calculation=([^&#]+)", RegexOptions.IgnoreCase);
            return m.Success ? Uri.UnescapeDataString(m.Groups[1].Value) : null;
        }

        private static string? GetProject(string url)
        {
            var m = Regex.Match(url, @"[?#&]pr=([^&#]+)", RegexOptions.IgnoreCase);
            return m.Success ? Uri.UnescapeDataString(m.Groups[1].Value) : null;
        }

        private static string? GetVariant(string url)
        {
            var m = Regex.Match(url, @"[?#&]variant=([^&#]+)", RegexOptions.IgnoreCase);
            return m.Success ? Uri.UnescapeDataString(m.Groups[1].Value) : null;
        }

        private async UniTask OpenFromGuid(Guid? projectGuid, Guid? variantGuid = null)
        {
            ShowPreloader(true);

            await _controller.Load($"pr={projectGuid.Value.ToString()}{(variantGuid == null ? "" : $"&variant={variantGuid.Value.ToString()}")}");
        }

        private void OnSceneOpenRequest((SceneType sceneType, string projectGuid, string calcualtionGuid) eventData)
        {
            _controller.Hide();
            LoadSceneAsync(eventData.sceneType, eventData.projectGuid, eventData.calcualtionGuid).Forget();
        }

        private async UniTask LoadSceneAsync(SceneType sceneType, string projectGuid, string calcualtionGuid)
        {
            ShowPreloader(true);

            switch (sceneType)
            {
                case SceneType.Menu:
                    _mainMenuScreenManager.Open<MainMenuScreen>();
                    break;

                case SceneType.ThreeD:
                    await _productEnvironmentManager.OpenShowroom(ProductShowroomEnvironment.ThreeD, new Variant(projectGuid, calcualtionGuid));
                    break;

                case SceneType.AR:
                    await _productEnvironmentManager.OpenShowroom(ProductShowroomEnvironment.AR, new Variant(projectGuid, calcualtionGuid));
                    break;

                case SceneType.FakeAR:
                    await _productEnvironmentManager.OpenShowroom(ProductShowroomEnvironment.FakeAR, new Variant(projectGuid, calcualtionGuid));
                    break;
                default:
                    break;
            }

            ShowPreloader(false);
        }

        private void On2DZoneStatusChanged(Status status)
        {
            switch (status)
            {
                case Status.NotInitialized:
                    _controller.Hide();
                    break;

                case Status.Initialized:
                    _controller.Hide();
                    break;

                case Status.Loading:
                    ShowPreloader(true);
                    Debug.Log("Loading 2DZone");
                    _controller.Hide();
                    break;

                case Status.Loaded:
                    _controller.Show();
                    ShowPreloader(false);
                    break;

                case Status.Error:
                    UniTask.Void(async () =>
                    {
                        await _controller.Logout();
                        await _controller.ClearLocalStorage();

                        _controller.Hide();
                        ShowPreloader(false);
                        _ = _authorizationService.LogOut();
                        _mainMenuScreenManager.Open<AuthorizationPopup>();
                    });
                    break;

                default:
                    break;
            }


        }

        private void OnCompanySelectRequest(string companyName)
        {
            //  _authorizationStateService.SetCompany(_authorizationStateService.User.Companies.First(x => x.Name.Trim().ToLower() == companyName).Id);
        }

        private async UniTask<bool> Auth()
        {
            if (await _controller.CheckAuth())
                return true;

            _ = _authorizationService.LogOut();
            _controller.Hide();

            return false;
        }

        private void OnCompanyUpdate(Company company)
        {
            _controller.SetCompany(company.Name).Forget();
        }

        private void OnUserUpdate(User user)
        {
            if (!user.IsAuthorized)
                return;

            if (string.IsNullOrEmpty(_authorizationService.GetCredentials.login))
                return;

            UniTask.Void(async () =>
            {
                var cred = _authorizationService.GetCredentials;
                if (await _controller.Authorize(cred.login, cred.password))
                    await _controller.Load();
            });

        }

        private void OnLogout()
        {
            _controller.Hide();
            _controller.Logout().Forget();
        }


        private void ShowPreloader(bool showPreloader)
        {
            _loadingScreen.gameObject.SetActive(showPreloader);
        }

        private void Start()
        {
            Init();
        }
    }
}