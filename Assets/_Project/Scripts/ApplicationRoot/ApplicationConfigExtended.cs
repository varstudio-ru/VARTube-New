using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEngine;
using VARTube.Showroom.ProductCamera;

namespace VARTube.Data.Settings
{
    [CreateAssetMenu(fileName = "ApplicationConfig", menuName = "VARTube/ApplicationConfig")]
    public class ApplicationConfigExtended : ApplicationConfig
    {
        public int IIKDebugLevel = 1;
        public GameLoaderScenes Scenes;
        public ProductCameraFinal ProductCamera;
        public ScreenCaptureFile ScreenCaptureFile;
        public Material ShadowPlaneMaterial;
    }

    [Serializable]
    public class GameLoaderScenes
    {
        public string Root = "Root";
        public string ARShowroom = "ARShowroom";
        public string ThreeDShowroom = "3DShowroom";
        public string FakeARShowroom = "FakeARShowroom";
        public string MainMenu = "MainMenu";
    }

    [Serializable]
    public class UI
    {
        public AuthorizationPopup AuthorizationPopup;
    }

    [Serializable]
    public class AuthorizationPopup
    {
        public string EnterCredentialsLocalization = "authorization_screen_enter_credentials_warning";
        public string InvalidCredentialsLocalization = "authorization_screen_invalid_credentials_error";
        public string CommonErrorLocalization = "authorization_screen_common_error";
    }

    //TODO: refactoring
    [Serializable]
    public class ProductCameraFinal
    {
        public ProductCameraView ProductCamera;
        public FakeARCameraView FakeARCamera;
        [SerializeField] private List<ProductCamera> Cameras;

        public ProductCameraSettings GetSettings(bool androidDebug = false)
        {
            if (androidDebug)
                return Cameras.FirstOrDefault(c => c.Platform == RuntimePlatform.Android).Settings;
            return Cameras.FirstOrDefault(c => Application.platform == c.Platform).Settings;
        }
    }

    [Serializable]
    public class ProductCamera
    {
        public RuntimePlatform Platform;
        public ProductCameraSettings Settings;
    }

    [Serializable]
    public class ProductCameraSettings
    {
        [Serializable]
        public class CameraFieldSettings<T>
        {
            public T Multiplier;
            public T Min;
            public T Max;
            public T Initial;
        }
        
        public CameraFieldSettings<Vector3> Rotation;
        public CameraFieldSettings<Vector3> Translation;
        public CameraFieldSettings<float> Zoom;
    }

    [Serializable]
    public class ScreenCaptureFile
    {
        public string PrefixName = "VARTube_Screenshot_";
        public string DateFormat = "yyyy-MM-dd_HH-mm-ss-fff";
        public string ExtensionName = ".png";
        public string FolderName = "VARTubeScreenshots";

        public string GenerateName()
        {
            var dateName = DateTime.Now.ToString(DateFormat);
            var fileName = PrefixName + dateName + ExtensionName;
            return fileName;
        }

        public string GeneratePath()
        {
            var fileName = GenerateName();
            return Path.Combine(GetDirectoryName(), fileName);
        }

        public string GetDirectoryName()
        {
            return Path.Combine(Application.persistentDataPath, FolderName);
        }
    }
}