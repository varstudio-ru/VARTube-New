namespace VARTube.Showroom.ProductCamera
{
    public interface IProductCameraInput
    {
        void Enable();
        void Disable();
        ProductCameraInputResult Get();
        void SetManualState(ProductCameraInputResult inputResult);
    }
}