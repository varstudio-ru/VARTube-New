using Controllers.Material;
using Cysharp.Threading.Tasks;
using System;
using System.Linq;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.XR.ARFoundation;
using VARTube.Core.Entity;
using VARTube.Core.Services;
using VARTube.Data.Settings;
using VARTube.Network.Models;
using VARTube.ProductBuilder;
using VARTube.ProductBuilder.Design.Composite;
using VARTube.ProductBuilder.Materials;
using VARTube.Showroom;
using VARTube.Stats;
using VARTube.UI;
using VARTube.UI.ScreenManager;
using VARTube.Utils;
#if UNITY_ANDROID
using UnityEngine.Android;
#endif

//TODO: refactoring
public class ProductEnvironmentManager
{
    private readonly SceneManagement _sceneManager;

    public ProductEnvironmentManager()
    {
        _sceneManager = ApplicationServices.GetService<SceneManagement>();
    }
    private async UniTask AskVideoPermissionsAsync()
    {
        if (Application.platform == RuntimePlatform.WindowsEditor || Application.platform == RuntimePlatform.OSXEditor || Application.platform == RuntimePlatform.LinuxEditor)
            return;

        await AskPermissionsAsync();
    }

    private async UniTask AskPermissionsAsync()
    {
#if UNITY_ANDROID
        if (!Permission.HasUserAuthorizedPermission(Permission.Camera))
            Permission.RequestUserPermission(Permission.Camera);

        await UniTask.WaitUntil(() =>
            Permission.HasUserAuthorizedPermission(Permission.Camera)
        );
#endif

        if (!NativeGallery.CheckPermission(NativeGallery.PermissionType.Write, NativeGallery.MediaType.Video))
            await NativeGallery.RequestPermissionAsync(NativeGallery.PermissionType.Write, NativeGallery.MediaType.Video).AsUniTask();

        if (!NativeGallery.CheckPermission(NativeGallery.PermissionType.Read, NativeGallery.MediaType.Video))
            await NativeGallery.RequestPermissionAsync(NativeGallery.PermissionType.Read, NativeGallery.MediaType.Video).AsUniTask();
    }

    public async UniTask OpenShowroom(ProductShowroomEnvironment targetEnvironment, Variant variant, Product[] products = null, int? targetGraphicsTier = null)
    {
        ApplicationConfigExtended config = ApplicationServices.GetService<ApplicationConfigExtended>();
        // if (targetEnvironment == ProductShowroomEnvironment.AR)
        // {
        //     if (ARSession.state == ARSessionState.None || ARSession.state == ARSessionState.CheckingAvailability)
        //         await ARSession.CheckAvailability().ToUniTask();
        //     if (ARSession.state == ARSessionState.Unsupported)
        //         targetEnvironment = ProductShowroomEnvironment.FakeAR;
        // }
        string sceneName = targetEnvironment switch
        {
            ProductShowroomEnvironment.ThreeD => config.Scenes.ThreeDShowroom,
            ProductShowroomEnvironment.AR => config.Scenes.ARShowroom,
            ProductShowroomEnvironment.FakeAR => config.Scenes.FakeARShowroom,
            _ => throw new Exception()
        };

        switch (targetEnvironment)
        {
            case ProductShowroomEnvironment.AR:
            case ProductShowroomEnvironment.FakeAR:
                await AskVideoPermissionsAsync();

                break;
        }

        Scene previousScene = _sceneManager.GetActiveScene();
        Scene nextScene = await _sceneManager.LoadAsync(sceneName);

        if (products != null)
        {
            foreach (Product product in products)
            {
                product.Root.SetParent(null);
                product.Root.gameObject.SetActive(false);
                SceneManager.MoveGameObjectToScene(product.Root.gameObject, nextScene);
            }
        }

        if (previousScene.name == config.Scenes.MainMenu || previousScene.name == config.Scenes.MainMenu + "Tablet")
            ApplicationServices.GetService<StatsService>().OnLeft2DZone().Forget();
        else if (previousScene.name == config.Scenes.ARShowroom || previousScene.name == config.Scenes.ARShowroom + "Tablet" ||
                previousScene.name == config.Scenes.FakeARShowroom || previousScene.name == config.Scenes.FakeARShowroom + "Tablet")
        {
            ApplicationServices.GetService<StatsService>().OnLeftAR().Forget();
        }
        else if (previousScene.name == config.Scenes.ThreeDShowroom || previousScene.name == config.Scenes.ThreeDShowroom + "Tablet")
            ApplicationServices.GetService<StatsService>().OnLeft3D().Forget();

        switch (targetEnvironment)
        {
            case ProductShowroomEnvironment.AR:
            case ProductShowroomEnvironment.FakeAR:
                ApplicationServices.GetService<StatsService>().OnEnterAR(variant.projectGuid, variant.calculationGuid).Forget();
                break;

            case ProductShowroomEnvironment.ThreeD:
                ApplicationServices.GetService<StatsService>().OnEnter3D(variant.projectGuid, variant.calculationGuid).Forget();
                break;

            default:
                break;
        }

        if (previousScene.name != config.Scenes.MainMenu)
            await _sceneManager.UnloadAsync(previousScene);

        IShowroomSceneContent nextShowroomSceneContent = _sceneManager.GetSceneContent(nextScene) as IShowroomSceneContent;
        await nextShowroomSceneContent.Run(variant, products, targetGraphicsTier);

        if (previousScene.name == config.Scenes.MainMenu)
        {
            MainMenuSceneContent mainContent = _sceneManager.GetSceneContent(previousScene) as MainMenuSceneContent;
            mainContent.gameObject.SetActive(false);
        }
    }

    public async UniTask GoToMainMenuScene(Variant variant = null)
    {
        Scene previousScene = _sceneManager.GetActiveScene();

        ApplicationConfigExtended config = ApplicationServices.GetService<ApplicationConfigExtended>();

        if (previousScene.name.StartsWith(config.Scenes.ThreeDShowroom))
            ApplicationServices.GetService<StatsService>().OnLeft3D(variant.projectGuid, variant.calculationGuid).Forget();
        else if (previousScene.name.StartsWith(config.Scenes.ARShowroom))
            ApplicationServices.GetService<StatsService>().OnLeftAR(variant.projectGuid, variant.calculationGuid).Forget();

        ApplicationServices.GetService<StatsService>().OnEnter2DZone().Forget();

        _sceneManager.SetActiveScene(config.Scenes.MainMenu);

        await _sceneManager.UnloadAsync(previousScene);

        (_sceneManager.GetSceneContent(_sceneManager.GetActiveScene()) as MainMenuSceneContent).gameObject.SetActive(true);

        EntityContainer<MeshEntity>.ClearCache();
        EntityContainer<TextureEntity>.ClearCache();
        MaterialProvider.ClearCache();

        //if (variant != null)
        //    ApplicationServices.GetService<WebViewScreenController>().Open(variant);
    }
}