using System;
using UnityEngine;
using UnityEngine.InputSystem;
using Gyroscope = UnityEngine.InputSystem.Gyroscope;

public class FakeARCameraView : MonoBehaviour
{
    [SerializeField] private float _translationMultiplier;
    [SerializeField] private float _rotationMultiplier;
    [SerializeField] private float _smoothFactor;
    private float _yAxisRotationMultiplier = 0f;

    [SerializeField] private GameObject _cameraPrefab;
    [SerializeField] private Transform _cameraParent;


    private Vector3 _angularVelocity;
    private Quaternion _attitude;
    private Vector3 _acceleration;

    private Quaternion _targetRotation;
    private float _additionalRotation;
    private Vector3 _targetPosition;

    public void ResetRotation()
    {
        _additionalRotation = -_targetRotation.eulerAngles.y;
    }

    public void CreateCamera()
    {
        Instantiate(_cameraPrefab, _cameraParent);
    }

    public void DestroyCamera()
    {
        for (int i = _cameraParent.childCount - 1; i >= 0; i--)
            Destroy(_cameraParent.GetChild(i));
    }

    private void Update()
    {
        if (Gyroscope.current != null)
        {
            if (Gyroscope.current.enabled)
            {
                _angularVelocity = Gyroscope.current.angularVelocity.ReadValue();
            }
            else
            {
                InputSystem.EnableDevice(Gyroscope.current);
            }
        }
        if (AttitudeSensor.current != null)
        {
            if (AttitudeSensor.current.enabled)
            {
                _attitude = AttitudeSensor.current.attitude.ReadValue();
            }
            else
            {
                InputSystem.EnableDevice(AttitudeSensor.current);
            }
        }
        if (Accelerometer.current != null)
        {
            if (Accelerometer.current.enabled)
            {
                _acceleration = Accelerometer.current.acceleration.ReadValue();
            }
            else
            {
                InputSystem.EnableDevice(Accelerometer.current);
            }
        }

        // Quaternion rotationDelta = Quaternion.Euler(
        //     -_angularVelocity.x * _rotationMultiplier,
        //     -_angularVelocity.y * _rotationMultiplier,
        //     _angularVelocity.z * _rotationMultiplier);

        // _targetRotation *= rotationDelta;

        //Debug.Log(_attitude * Vector3.down);

        _targetPosition += new Vector3(
            _acceleration.x * _translationMultiplier,
            _acceleration.y * _translationMultiplier,
            _acceleration.z * _translationMultiplier);

        _targetRotation = Quaternion.Euler(90, 0, 0) * new Quaternion(_attitude.x, _attitude.y, -_attitude.z, -_attitude.w);

        Vector3 euler = _targetRotation.eulerAngles;
        euler.y *= _yAxisRotationMultiplier;
        _targetRotation = Quaternion.Euler(euler);
        //_targetRotation = new Quaternion(_attitude.x, _attitude.y, -_attitude.z, -_attitude.w);
        //Quaternion trQuat = Quaternion.Euler(-90, 0, 0);
        //Debug.Log("____________________________");
        //Quaternion attCorrQuat = trQuat * _attitude * Quaternion.Inverse(trQuat);
        Quaternion attCorrQuat = new Quaternion(_attitude.x, _attitude.y, -_attitude.z, -_attitude.w);
        //Debug.Log(_attitude.eulerAngles);

        //  1  0  0
        //  0  0 -1
        //  0 -1  1

        // -1  0  0
        //  0  1  0
        //  0  0  1

        Matrix4x4 attTrMat = new Matrix4x4(new Vector4(1, 0, 0, 0),
                                            new Vector4(0, 0, 1, 0),
                                            new Vector4(0, -1, 0, 0),
                                            new Vector4(0, 0, 0, 1));

        Matrix4x4 accTrMat = new Matrix4x4(new Vector4(-1, 0, 0, 0),
                                            new Vector4(0, 1, 0, 0),
                                            new Vector4(0, 0, 1, 0),
                                            new Vector4(0, 0, 0, 1));

        // Debug.Log(_attitude * Vector3.down);
        // Debug.Log( _attitude *( accTrMat * Vector3.down ));
        // Debug.Log(accTrMat * _acceleration);
        //_targetRotation = _targetRotation * Quaternion.Euler(90, 0, 0);

        // Плавное применение изменений
        transform.rotation = Quaternion.Slerp(transform.rotation, _targetRotation, Time.deltaTime * _smoothFactor);
        transform.Rotate(0, _additionalRotation, 0, Space.World);

        //transform.position = Vector3.Lerp(transform.position, _targetPosition, Time.deltaTime * _smoothFactor);
    }

    private void OnEnable()
    {
        CreateCamera();
    }

    private void OnDisable()
    {
        DestroyCamera();
    }
}
