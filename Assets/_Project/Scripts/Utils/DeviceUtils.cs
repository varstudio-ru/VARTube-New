using UnityEngine;

public static class Device
{
    public enum Type
    {
        PHONE,
        TABLET
    }
        

    private static float DeviceDiagonalSizeInInches()
    {
        float screenWidth = Screen.width / Screen.dpi;
        float screenHeight = Screen.height / Screen.dpi;
        float diagonalInches = Mathf.Sqrt(Mathf.Pow(screenWidth, 2) + Mathf.Pow(screenHeight, 2));

        return diagonalInches;
    }

    public static Type GetDeviceType()
    {
#if UNITY_IOS
        bool deviceIsIpad = UnityEngine.iOS.Device.generation.ToString().Contains("iPad");
        if (deviceIsIpad)
            return Type.TABLET;

        bool deviceIsIphone = UnityEngine.iOS.Device.generation.ToString().Contains("iPhone");
        if (deviceIsIphone)
            return Type.PHONE;
#endif
          
        float aspectRatio = Mathf.Max(Screen.width, Screen.height) / (float)Mathf.Min(Screen.width, Screen.height);
        bool isTablet = DeviceDiagonalSizeInInches() > 6.5f && aspectRatio < 2f;

        return isTablet ? Type.TABLET : Type.PHONE;
    }
}
