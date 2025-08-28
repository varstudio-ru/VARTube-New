using UnityEngine;
using VARTube.Showroom;

public class CameraSceneSwitchGuard : MonoBehaviour
{
    [SerializeField] private FakeARCameraView _cameraController;

    private ProductShowroom _productShowroom;


    private void Start()
    {
        _productShowroom = gameObject.GetComponent<ProductShowroom>();
    }

    public void GoBack()
    {
        if (_cameraController != null)
            _cameraController.DestroyCamera();

        _productShowroom.GoBack();
    }

    public void SwitchShowroom()
    {
        if (_cameraController != null)
            _cameraController.DestroyCamera();

        _productShowroom.SwitchShowroom();
    }

    public void SwitchToAR()
    {
        if (_cameraController != null)
            _cameraController.DestroyCamera();

        _productShowroom.SwitchToAR();
    }

    public void SwitchToFakeAR()
    {
        if (_cameraController != null)
            _cameraController.DestroyCamera();

        _productShowroom.SwitchToFakeAR();
    }

    public void SwitchTo3D()
    {
        if (_cameraController != null)
            _cameraController.DestroyCamera();

        _productShowroom.SwitchTo3D();
    }
}