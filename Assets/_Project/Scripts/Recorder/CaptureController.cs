using Cysharp.Threading.Tasks;
using RenderHeads.Media.AVProMovieCapture;
using System;
using System.IO;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Rendering.Universal;
using UnityEngine.XR.ARFoundation;
using VARTube.Core.Services;
using VARTube.Data.Settings;
using VARTube.Network;
using VARTube.Showroom;

[RequireComponent(typeof(CaptureFromCamera))]
public class CaptureController : MonoBehaviour
{
    private const string _CAPTURES_FOLDER_NAME = "captures";

    [SerializeField] private LayerMask _includeLayers;
    [SerializeField] private SkyboxSettingsController _skyboxSettings;


    private CaptureFromCamera _captureFromCamera;
    private NetworkService _networkService;
    private AuthorizationStateService _authorizationState;
    private ProductShowroom _productShowroom;
    private Camera _camera;

    public async UniTask StartRecordingAsync()
    {
        CreateCamera();
        await AskVideoPermissionsAsync();

        _captureFromCamera.OutputTarget = OutputTarget.VideoFile;
        _captureFromCamera.StopMode = StopMode.None;
        _captureFromCamera.AudioCaptureSource = AudioCaptureSource.Microphone;
        _captureFromCamera.StartCapture();
    }

    public async UniTask StopRecordingAsync()
    {
        TaskCompletionSource<bool> tcs = new();

        _captureFromCamera.CompletedFileWritingAction += SaveVideo;
        _captureFromCamera.StopCapture();

        Destroy(_camera.gameObject);
        RestartARCamera();

        await tcs.Task;

        void SaveVideo(FileWritingHandler o)
        {
            _captureFromCamera.CompletedFileWritingAction -= SaveVideo;

            UniTask.Void(async () =>
            {
                try
                {
                    await _networkService.SendMessageWithFileAsync(_authorizationState.User.GUID, _productShowroom.CurrentVariant.projectGuid, _captureFromCamera.LastFilePath);

                    ApplicationConfigExtended config = ApplicationServices.GetService<ApplicationConfigExtended>();
                    NativeGallery.SaveVideoToGallery(_captureFromCamera.LastFilePath, config.ScreenCaptureFile.FolderName, Path.GetFileName(_captureFromCamera.LastFilePath));

                    tcs.SetResult(true);
                }
                catch (Exception e)
                {
                    Debug.LogException(e);
                    tcs.SetResult(false);
                }
            });
        }
    }

    public async UniTask TakeScreenshotAsync()
    {
        await AskPermissionsAsync();
        //CreateCamera();

        LayerMask oldLayers = Camera.main.cullingMask;
        Camera.main.cullingMask = _includeLayers;
        _captureFromCamera.SetCamera(Camera.main);

        TaskCompletionSource<bool> tcs = new();

        _captureFromCamera.OutputTarget = OutputTarget.ImageSequence;
        _captureFromCamera.StopMode = StopMode.FramesEncoded;
        _captureFromCamera.StopAfterFramesElapsed = 1;
        _captureFromCamera.StartCapture();
        _captureFromCamera.CompletedFileWritingAction += SaveScreenshot;

        await tcs.Task;

        Camera.main.cullingMask = oldLayers;
        //Destroy(_camera.gameObject);
        //RestartARCamera();

        void SaveScreenshot(FileWritingHandler o)
        {
            _captureFromCamera.CompletedFileWritingAction -= SaveScreenshot;

            UniTask.Void(async () =>
            {
                try
                {
                    var dir = Path.GetDirectoryName(_captureFromCamera.LastFilePath);

                    await _networkService.SendMessageWithFileAsync(_authorizationState.User.GUID, _productShowroom.CurrentVariant.projectGuid, Path.Combine(dir, "frame-000000.png"));

                    ApplicationConfigExtended config = ApplicationServices.GetService<ApplicationConfigExtended>();
                    NativeGallery.SaveImageToGallery(Path.Combine(dir, "frame-000000.png"), config.ScreenCaptureFile.FolderName, new DirectoryInfo(dir).Name);

                    tcs.SetResult(true);
                }
                catch (Exception e)
                {
                    Debug.LogException(e);
                    tcs.SetResult(false);
                }
            });
        }
    }

    private async UniTask AskVideoPermissionsAsync()
    {
        if (Application.platform == RuntimePlatform.WindowsEditor || Application.platform == RuntimePlatform.OSXEditor || Application.platform == RuntimePlatform.LinuxEditor)
            return;

        if (CaptureBase.HasUserAuthorisationToCaptureAudio() != CaptureBase.AudioCaptureDeviceAuthorisationStatus.Authorised)
            await CaptureBase.RequestAudioCaptureDeviceUserAuthorisation();

        await AskPermissionsAsync();
    }

    private async UniTask AskPermissionsAsync()
    {
        if (!NativeGallery.CheckPermission(NativeGallery.PermissionType.Write, NativeGallery.MediaType.Video))
            await NativeGallery.RequestPermissionAsync(NativeGallery.PermissionType.Write, NativeGallery.MediaType.Video).AsUniTask();

        if (!NativeGallery.CheckPermission(NativeGallery.PermissionType.Read, NativeGallery.MediaType.Video))
            await NativeGallery.RequestPermissionAsync(NativeGallery.PermissionType.Read, NativeGallery.MediaType.Video).AsUniTask();
    }

    private void CreateCamera()
    {
        if (_camera != null)
            Destroy(_camera.gameObject);

        _camera = new GameObject("CaptureCamera", typeof(Camera)).GetComponent<Camera>();
        if (Camera.main.GetComponent<ARCameraBackground>() != null)
            _camera.gameObject.AddComponent<ARCameraBackground>();
        _camera.transform.SetParent(Camera.main.transform);
        _camera.transform.localPosition = Vector3.zero;
        _camera.transform.localRotation = Quaternion.identity;

        _camera.cullingMask = _includeLayers;
        _camera.depth = -1;
        _camera.orthographic = false;
        _camera.fieldOfView = Camera.main.fieldOfView;
        _camera.backgroundColor = Camera.main.backgroundColor;
        _camera.clearFlags = Camera.main.clearFlags;
        _camera.nearClipPlane = Camera.main.nearClipPlane;
        _camera.farClipPlane = Camera.main.farClipPlane;
        _camera.GetUniversalAdditionalCameraData().renderPostProcessing = Camera.main.GetUniversalAdditionalCameraData().renderPostProcessing;
        _camera.GetUniversalAdditionalCameraData().antialiasing = Camera.main.GetUniversalAdditionalCameraData().antialiasing;
        _camera.GetUniversalAdditionalCameraData().antialiasingQuality = Camera.main.GetUniversalAdditionalCameraData().antialiasingQuality;

        _captureFromCamera.SetCamera(_camera);
    }

    private async void RestartARCamera()
    {
        if (Camera.main.GetComponent<ARCameraBackground>() == null)
            return;
        await UniTask.NextFrame();
        DestroyImmediate(Camera.main.GetComponent<ARCameraBackground>());
        DestroyImmediate(Camera.main.GetComponent<ARCameraManager>());

        Camera.main.gameObject.AddComponent<ARCameraManager>();
        Camera.main.gameObject.AddComponent<ARCameraBackground>();
    }

    private void Init()
    {
        _productShowroom = FindFirstObjectByType<ProductShowroom>();
        _networkService = ApplicationServices.GetService<NetworkService>();
        _authorizationState = ApplicationServices.GetService<AuthorizationStateService>();
        _captureFromCamera = GetComponent<CaptureFromCamera>();
        _captureFromCamera.OutputFolder = CaptureBase.OutputPath.RelativeToPeristentData;
        _captureFromCamera.OutputFolderPath = _CAPTURES_FOLDER_NAME;
    }

    private void Start()
    {
        Init();
    }
}
