/*
===================================================================
Unity Assets by MAKAKA GAMES: https://makaka.org/o/all-unity-assets
===================================================================

Online Docs (Latest): https://makaka.org/unity-assets
Offline Docs: You have a PDF file in the package folder.

=======
SUPPORT
=======

First of all, read the docs. If it didn’t help, get the support.

Web: https://makaka.org/support
Email: info@makaka.org

If you find a bug or you can’t use the asset as you need, 
please first send email to info@makaka.org
before leaving a review to the asset store.

I am here to help you and to improve my products for the best.
*/

using UnityEngine;
using UnityEngine.Events;
using UnityEngine.InputSystem;

[HelpURL("https://makaka.org/unity-assets")]
public class SensorCameraControl : MonoBehaviour 
{
	[SerializeField]
	private Transform cameraMain;

    // Both Input Systems are used (Old and New):

	// New is used for WebGL on Mobile only, because in other cases it has
	// delay issue atfet orientation changing - Old used instead
	
	// The Old doesn't support some sensors on the WebGL

    private AttitudeSensor attitudeSensor;
	private Accelerometer accelerometerSensor;
    private UnityEngine.Gyroscope gyro;

    private bool isGyroSupportedNotInEditor = false;
    private bool isRotationWithGyro = false;
    private Quaternion rotationWithGyroFix = new(0f, 0f, 1f, 0f);

    [Tooltip("To Reset Gyro Data. If it’s “true”, then Gyro’s “Y” Rotation" +
		" is reset on Scene Closing or Reloading. Useful if you need to" +
		" Control the Start Rotation of the Camera when Restart.")]
	[SerializeField]
	private bool isGyroDisabledOnDestroy = false;

	[Header("Testing Not in Editor")]
	[SerializeField]
	private bool isGyroUnsupportedNotInEditorTest = false;

    [SerializeField]
    private bool isAccelerometerUnsupportedNotInEditorTest = false;

#if UNITY_EDITOR

    [Header("Testing In Editor")]
    [SerializeField]
	private bool isGyroSupportedInEditorTest = true;

    [SerializeField]
    private bool isAccelerometerSupportedInEditorTest = false;

    [Space]
	[SerializeField]
	private bool isMovementWASDQEInEditorTest = false;

	[SerializeField]
	private Vector3 movementWASDQESpeed = new(4f, 5f, 5f);

	private readonly string xAxisName = "Horizontal";
	private readonly string zAxisName = "Vertical";

#endif

    [Header("Events (in the order of execution)\nSensor Events")]
	[Space]
	[SerializeField]
	private UnityEvent OnGyroInitialized;

	[Space]
	[SerializeField]
	private UnityEvent OnGyroIsNotSupported;

    [Space]
    [SerializeField]
    private UnityEvent OnAccelerometerInitialized;

    [Space]
    [SerializeField]
    private UnityEvent OnAccelerometerIsNotSupported;

    [Header("Common Events")]
    [Space]
	[SerializeField]
	private UnityEvent OnInitializedNotInEditor = null;

#if UNITY_EDITOR

	[Space]
	[SerializeField]
	private UnityEvent OnInitializedInEditor = null;

#endif

	[Header("Accelerometer Settings")]
	[Tooltip("1f => no vibrations")]
	[Range(1f, 20f)]
	[SerializeField]
	private float accelerometerSensitivityXZ = 5f;

	[Tooltip("if > 1f => use it for smooth motion")]
	[Range(0f, 5f)]
	[SerializeField]
	private float accelerometerSmoothLimitXZ = 0.5f;

	private readonly float accelerometerRotationalAngleFactorXZ = -90f;
	private Vector3 accelerometerCurrentRotationXZ;
	private Quaternion accelerometerResultRotationXZ;

    [Range(0f, 1f)]
    [SerializeField]
	private float accelerometerSensitivityY = 0.11f;

	// Rotational Speed: Left and Right
	[SerializeField]
	private float accelerometerRotationalSpeedFactorY = 350f;

	private Vector3 accelerometerDirNormalized;

	private bool isRotationWithAccelerometer = false;
	private bool isAccelerometerSupportedNotInEditor = false;

    private bool isWebGLOnDesktop = false;
    private bool isWebGLOnMobile = false;

    private void Start() 
	{

#if UNITY_EDITOR

		InitInEditor();

#else

		InitNotInEditor();

#endif

	}

	private void InitNotInEditor()
	{
        isWebGLOnDesktop = !Application.isMobilePlatform
			&& Application.platform == RuntimePlatform.WebGLPlayer;

        isWebGLOnMobile = Application.isMobilePlatform
            && Application.platform == RuntimePlatform.WebGLPlayer;

        if (isWebGLOnDesktop)
		{
			isGyroSupportedNotInEditor = false;
            isAccelerometerSupportedNotInEditor = false;
        }
		else if (isWebGLOnMobile)
		{
            attitudeSensor = AttitudeSensor.current;

            if (attitudeSensor == null)
            {
                DebugPrinter.Print("Attitude Sensor is NOT SUPPORTED");

                isGyroSupportedNotInEditor = false;
            }
            else
            {
                DebugPrinter.Print("Attitude Sensor SUPPORTED");

                isGyroSupportedNotInEditor = true;
            }

			accelerometerSensor = Accelerometer.current;

            if (accelerometerSensor == null)
            {
                DebugPrinter.Print("Accelerometer Sensor is NOT SUPPORTED");

                isAccelerometerSupportedNotInEditor = false;
            }
            else
            {
                DebugPrinter.Print("Accelerometer Sensor SUPPORTED");

                isAccelerometerSupportedNotInEditor = true;
            }
        }
		else
		{
            isGyroSupportedNotInEditor =
                //this doesn't work on WebGL For Desktop
                SystemInfo.supportsGyroscope;

            isAccelerometerSupportedNotInEditor =
                //this doesn't work on WebGL For Desktop
                SystemInfo.supportsAccelerometer;
        }

		if (isGyroSupportedNotInEditor
			&& isGyroUnsupportedNotInEditorTest)
        {
			isGyroSupportedNotInEditor = false;
		}

        if (isAccelerometerSupportedNotInEditor
			&& isAccelerometerUnsupportedNotInEditorTest)
        {
            isAccelerometerSupportedNotInEditor = false;
        }

        if (isGyroSupportedNotInEditor)
		{
			cameraMain.parent.transform.rotation =
				Quaternion.Euler(90f, 180f, 0f);

			if (isWebGLOnMobile)
			{
				InputSystem.EnableDevice(attitudeSensor);
			}
			else
			{
				gyro = Input.gyro;
				gyro.enabled = true;
			}

			OnGyroInitialized.Invoke();
		}
		else
		{
			OnGyroIsNotSupported.Invoke();

			if (isAccelerometerSupportedNotInEditor)
			{
                if (isWebGLOnMobile)
                {
                    InputSystem.EnableDevice(accelerometerSensor);
                }

                OnAccelerometerInitialized.Invoke();
            }
			else
			{
                OnAccelerometerIsNotSupported.Invoke();
            }
		}

		OnInitializedNotInEditor.Invoke();
	}

#if UNITY_EDITOR

	private void InitInEditor()
	{
		if (isGyroSupportedInEditorTest)
		{
			OnGyroInitialized.Invoke();
		}
		else
		{
			OnGyroIsNotSupported.Invoke();

            if (isAccelerometerSupportedInEditorTest)
            {
                OnAccelerometerInitialized.Invoke();
            }
            else
            {
                OnAccelerometerIsNotSupported.Invoke();
            }
        }

		OnInitializedInEditor.Invoke();
	}

	private void LateUpdate()
	{
        if (isMovementWASDQEInEditorTest)
        {
			MoveXUpdateInEditor();
			MoveYUpdateInEditor();
			MoveZUpdateInEditor();
		}
	}

	private void MoveXUpdateInEditor()
	{
		transform.position += Input.GetAxis(xAxisName) * movementWASDQESpeed.x
			* Time.deltaTime * cameraMain.right;
	}

	private void MoveZUpdateInEditor()
	{
		transform.position += Input.GetAxis(zAxisName) * movementWASDQESpeed.z
			* Time.deltaTime
			* Vector3.ProjectOnPlane(cameraMain.forward, Vector3.up).normalized;
	}

	private void MoveYUpdateInEditor()
	{
		if (Input.GetKey(KeyCode.Q))
		{
			TranslateYAxis(-movementWASDQESpeed.y);
		}

		if (Input.GetKey(KeyCode.E))
		{
			TranslateYAxis(movementWASDQESpeed.y);
		}
	}

	private void TranslateYAxis(float speed)
	{
		transform.Translate(0f, speed * Time.deltaTime, 0f);
	}

#else

	private void Update() 
	{
		UpdateNotInEditor();
	}

#endif

	private void UpdateNotInEditor()
    {
		if (isGyroSupportedNotInEditor && isRotationWithGyro)
		{
			if (isWebGLOnMobile)
			{
				cameraMain.localRotation =
					attitudeSensor.attitude.ReadValue() * rotationWithGyroFix;
			}
			else
			{
				cameraMain.localRotation = gyro.attitude * rotationWithGyroFix;

                //DebugPrinter.Print(gyro.attitude);
            }
        }
		else if (isAccelerometerSupportedNotInEditor
			&& isRotationWithAccelerometer)
		{
			RotateYWithAccelerometer();
			RotateXZWithAccelerometer();
		}
	}

	private void RotateYWithAccelerometer()
	{
		if (isWebGLOnMobile)
		{
            accelerometerDirNormalized =
				accelerometerSensor.acceleration.ReadValue().normalized;
        }
		else
		{
            accelerometerDirNormalized = Input.acceleration.normalized;
        }

		if (accelerometerDirNormalized.x >= accelerometerSensitivityY
			|| accelerometerDirNormalized.x <= -accelerometerSensitivityY)
		{

            if (isWebGLOnMobile)
            {
                cameraMain.Rotate(
                    0f,
                    accelerometerSensor.acceleration.ReadValue().x
                        * accelerometerRotationalSpeedFactorY * Time.deltaTime,
                    0f);
            }
            else
            {
                cameraMain.Rotate(
                    0f,
                    Input.acceleration.x
                        * accelerometerRotationalSpeedFactorY * Time.deltaTime,
                    0f);
            }
        }
	}

	private void RotateXZWithAccelerometer()
	{
		accelerometerCurrentRotationXZ.y = cameraMain.localEulerAngles.y;

		if (isWebGLOnMobile)
		{
            accelerometerCurrentRotationXZ.x =
                accelerometerSensor.acceleration.ReadValue().z
				* accelerometerRotationalAngleFactorXZ;

            accelerometerCurrentRotationXZ.z =
                accelerometerSensor.acceleration.ReadValue().x
				* accelerometerRotationalAngleFactorXZ;
        }
		else
		{
			accelerometerCurrentRotationXZ.x =
				Input.acceleration.z * accelerometerRotationalAngleFactorXZ;

			accelerometerCurrentRotationXZ.z =
				Input.acceleration.x * accelerometerRotationalAngleFactorXZ;
		}

		accelerometerResultRotationXZ = Quaternion.Slerp(
			cameraMain.localRotation,
			Quaternion.Euler(accelerometerCurrentRotationXZ),
			accelerometerSensitivityXZ * Time.deltaTime);

		if (Quaternion.Angle(cameraMain.rotation, accelerometerResultRotationXZ)
			> accelerometerSmoothLimitXZ)
		{
			cameraMain.localRotation = accelerometerResultRotationXZ;
		}
		else
		{
			cameraMain.localRotation = Quaternion.Slerp(
				cameraMain.localRotation,
				Quaternion.Euler(accelerometerCurrentRotationXZ),
				Time.deltaTime);
		}
	}

	private void OnDestroy()
	{
		if (isGyroDisabledOnDestroy)
		{
			if (isWebGLOnMobile)
			{
				if (attitudeSensor != null)
				{
					InputSystem.DisableDevice(attitudeSensor);
				}
			}
			else
			{
				if (gyro != null)
				{
                    gyro.enabled = false;

                    //DebugPrinter.Print("Reset Gyro!");
                }
            }
		}

        if (isWebGLOnMobile)
        {
            if (accelerometerSensor != null)
            {
                InputSystem.DisableDevice(accelerometerSensor);
            }
        }
    }

    /// <summary>
    /// Used in Editor to Test a Specific Data of Camera Transform.
    /// </summary>
    public void SetPositionAndRotation(Transform transform)
	{
		cameraMain.SetPositionAndRotation(
			transform.position, transform.rotation);
	}

	public void SetRotationWithGyroActive(bool isActive)
	{
		isRotationWithGyro = isActive;
	}

	public void SetRotationWithAccelerometerActive(bool isActive)
	{
		isRotationWithAccelerometer = isActive;
	}

}
