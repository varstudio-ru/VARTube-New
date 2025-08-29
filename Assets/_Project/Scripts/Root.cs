using UnityEngine;
using UnityEngine.Android;
using VARTube.Core;
using VARTube.Core.Factory;
using VARTube.Core.Services;
using VARTube.Data;
using VARTube.Data.PlayerPreferences;
using VARTube.Data.Settings;
using VARTube.GeometryImport;
using VARTube.IIK;
using VARTube.Localization;
using VARTube.Network;
using VARTube.Stats;
using VARTube.Utils;

public class ApplicationServicesInstaller
{
    //TODO: move to config
    private DefaultFactory _defaultFactory;
    private IntervalActionService _intervalActionService;
    private ThreadDispatcherService _threadDispatcherService;
    private DisplayUtils _displayUtilsService;
    private readonly Transform _parent;

    public ApplicationServicesInstaller(DefaultFactory DefaultFactory, Transform parent)
    {
        _defaultFactory = DefaultFactory;
        _parent = parent;

        _intervalActionService = new GameObject("IntervalActionService").AddComponent<IntervalActionService>();
        _intervalActionService.transform.SetParent(_parent, false);

        _threadDispatcherService = new GameObject("ThreadDispatcherService").AddComponent<ThreadDispatcherService>();
        _threadDispatcherService.transform.SetParent(_parent, false);

        _displayUtilsService = new GameObject("DisplayUtilsService").AddComponent<DisplayUtils>();
        _displayUtilsService.transform.SetParent(_parent, false);
    }

    public void Install(ApplicationConfigExtended config)
    {
        QualitySettings.vSyncCount = 0;
        Application.targetFrameRate = (int)Screen.currentResolution.refreshRateRatio.value;
        Screen.sleepTimeout = SleepTimeout.NeverSleep;
        AndroidDevice.SetSustainedPerformanceMode(true);

        ApplicationServices.RegisterSingleton<ApplicationConfig>(config);
        ApplicationServices.RegisterSingleton<ApplicationConfigExtended>(config);
        ApplicationServices.RegisterSingleton(_intervalActionService);
        ApplicationServices.RegisterSingleton(_threadDispatcherService);
        ApplicationServices.RegisterSingleton(_displayUtilsService);
        ApplicationServices.RegisterSingleton<NetworkService>();
        ApplicationServices.RegisterSingleton<AuthorizationService>();
        ApplicationServices.RegisterSingleton<AuthorizationStateService>();
        ApplicationServices.RegisterSingleton<LocalizationService>();
        ApplicationServices.RegisterSingleton<GeometryImport>();
        ApplicationServices.RegisterSingleton<PrefsStorage>();
        ApplicationServices.RegisterSingleton<CacheData>();
        ApplicationServices.RegisterSingleton<SceneManagement>();
        ApplicationServices.RegisterSingleton<ProductEnvironmentManager>();
        ApplicationServices.RegisterSingleton<IFactory>(_defaultFactory);
        ApplicationServices.RegisterSingleton<PlayerPreferences>();
        ApplicationServices.RegisterSingleton<StatsService>();

        InitializeIIKCore(true, config.IIKDebugLevel);
    }

    private async void InitializeIIKCore(bool useLocalSource = false, int debugLevel = 0)
    {
        await IIKCore.InitializeAsync(useLocalSource);
        await IIKCore.SetDebugLevelAsync(debugLevel);
    }
}