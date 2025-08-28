using UnityEngine;

public class OrientationEnforcer : MonoBehaviour
{
    void Awake()
    {
        if (Device.GetDeviceType() == Device.Type.TABLET)
            SetLandscapeOnly();
        else
            SetPortraitOnly();
    }

    void SetLandscapeOnly()
    {
        Screen.orientation = ScreenOrientation.AutoRotation;
        Screen.autorotateToLandscapeLeft = true;
        Screen.autorotateToLandscapeRight = true;
        Screen.autorotateToPortrait = false;
        Screen.autorotateToPortraitUpsideDown = false;
    }

    void SetPortraitOnly()
    {
        Screen.orientation = ScreenOrientation.AutoRotation;
        Screen.autorotateToPortrait = true;
        Screen.autorotateToPortraitUpsideDown = false;
        Screen.autorotateToLandscapeLeft = false;
        Screen.autorotateToLandscapeRight = false;
    }
}