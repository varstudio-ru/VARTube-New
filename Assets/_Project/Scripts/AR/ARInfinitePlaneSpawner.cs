using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;
using VARTube.Input;

public enum PlaneSpawnerMode
{
    Infinite,
    Complex
}

public class ARInfinitePlaneSpawner : MonoBehaviour
{
    [SerializeField]
    private ARPlaneManager _manager;
    [SerializeField]
    private GameObject _infinitePlanePrefab;

    private GameObject _currentInfinitePlane;

    private void OnEnable()
    {
        _manager.planesChanged += OnPlanesChanged;
    }

    private void OnDisable()
    {
        _manager.planesChanged -= OnPlanesChanged;
    }

    private void OnPlanesChanged(ARPlanesChangedEventArgs args)
    {
        List<float> heights = new();
        foreach(ARPlane plane in _manager.trackables)
        {
//#if UNITY_IOS
//            if( plane.classifications != PlaneClassifications.Floor )
//                continue;
//#endif
            if( plane.alignment == PlaneAlignment.Vertical )
                continue;
            heights.Add(plane.transform.localPosition.y);
        }
        if(heights.Count == 0)
            return;
        if( _currentInfinitePlane != null )
            heights.Add(_currentInfinitePlane.transform.localPosition.y);
        else
        {
            _currentInfinitePlane = Instantiate(_infinitePlanePrefab, _manager.transform);
            _currentInfinitePlane.transform.localScale = new Vector3(100, 1, 100);
        }

        float minY = Mathf.Min(heights.ToArray());
        _currentInfinitePlane.transform.localPosition = new Vector3(0, minY, 0);
    }
}
