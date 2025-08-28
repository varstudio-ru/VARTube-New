using UnityEngine;
using VARTube.Core.Services;
using VARTube.Data.Settings;

namespace VARTube.Showroom.ProductCamera
{
    public class ProductCameraView : MonoBehaviour
    {
        [SerializeField] private Transform _cameraTransform;
        [SerializeField] private Transform _parentTransform;
        
        [Header("Rotation Settings")]
        [SerializeField] private float _smoothing = 5.0f;

        private IProductCameraInput _input;
        private ProductCameraInputResult _inputResult;
        private ProductCameraSettings _settings;

        private Vector3 _currentRotation;
        private Vector3 _smoothedRotation;
        private Vector3 _currentRotationVelocity;

        private const bool Debug = false;

        private void Awake()
        {
            _settings = ApplicationServices.GetService<ApplicationConfigExtended>().ProductCamera.GetSettings(Debug);

            if (Debug)
            {
                _input = new ProductCameraMobileInput();
            }
            else
            {
                switch (Application.platform)
                {
                    case RuntimePlatform.WindowsEditor:
                    case RuntimePlatform.OSXEditor: _input = new ProductCameraStandaloneInput(); break;

                    case RuntimePlatform.Android: _input = new ProductCameraMobileInput(); break;
                    case RuntimePlatform.IPhonePlayer: _input = new ProductCameraMobileInput(); break;
                    default: throw new System.Exception();
                }
            }
        }

        public void SetEnabled(bool value)
        {
            if( value )
                _input.Enable();
            else
                _input.Disable();
        }

        private void OnEnable()
        {
            SetEnabled(true);
        }

        private void OnDisable()
        {
            SetEnabled(false);
        }

        public void SetManualState(Bounds bounds)
        {
            _currentRotation = _settings.Rotation.Initial;
            
            _parentTransform.localRotation = Quaternion.identity;
            
            _parentTransform.localPosition = bounds.center;
            
            float zoomDistance = -CameraUtils.GetZoom(_cameraTransform.GetComponent<Camera>(), bounds);
            
            _cameraTransform.localPosition = new Vector3(0, 0, zoomDistance);
            
            _parentTransform.localRotation = Quaternion.Euler(_currentRotation);
        }

        private static float Clamp(float v, ProductCameraSettings.CameraFieldSettings<float> s)
        {
            return Mathf.Clamp(v, s.Min, s.Max);
        }
        
        private static Vector3 Clamp(Vector3 v, ProductCameraSettings.CameraFieldSettings<Vector3> s)
        {
            for( int i = 0; i < 3; i++ )
                v[i] = Mathf.Clamp(v[i], s.Min[i], s.Max[i]);
            return v;
        }

        private void Update()
        {
            _inputResult = _input.Get();
            
            _currentRotation += Vector3.Scale(_inputResult.Rotation, _settings.Rotation.Multiplier);
            _currentRotation = Clamp(_currentRotation, _settings.Rotation);
            _smoothedRotation = Vector3.SmoothDamp(_smoothedRotation, _currentRotation, ref _currentRotationVelocity, _smoothing * Time.deltaTime);
            _parentTransform.localRotation = Quaternion.Euler(_smoothedRotation);
         

            Vector3 translation = Vector3.Scale(_inputResult.Pan, _settings.Translation.Multiplier);
            _parentTransform.localPosition += _parentTransform.right * translation.x;
            _parentTransform.localPosition += _parentTransform.up * translation.y;
            _parentTransform.localPosition = Clamp(_parentTransform.localPosition, _settings.Translation);

            float zoom = -_cameraTransform.localPosition.z + _inputResult.Zoom * _settings.Zoom.Multiplier;
            zoom = Clamp(zoom, _settings.Zoom);
            _cameraTransform.localPosition = new Vector3(0, 0, -zoom);
        }
    }
}