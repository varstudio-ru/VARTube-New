using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.XR.ARFoundation;

public class ARCursor : MonoBehaviour
{
    public GameObject cursorChildObj;
    public GameObject objectToPlace;
    public ARRaycastManager raycastManager;
    public ARPlaneManager m_PlaneManager;

    public bool useCursor = true;

    //
    //Active AR features can cause the device to consume more power,
    //so it is a good practice to disable managers when your app isn't using their features.
    //

    private void Start()
    {
        cursorChildObj.SetActive(useCursor);
        m_PlaneManager.planesChanged += OnPlaneChanged;
        //aRPlacement.placementPrefab;
    }

    private void Update()
    {
        var isPointerOverUI = EventSystem.current != null && EventSystem.current.IsPointerOverGameObject(-1);

        if (isPointerOverUI)
        {
            return;
        }

        if (useCursor)
        {
            UpdateCursor();
        }

        if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began)
        {
            if (useCursor)
            {
                Instantiate(objectToPlace, transform.position, transform.rotation);
            }
            else
            {
                var hits = new List<ARRaycastHit>();
                raycastManager.Raycast(Input.GetTouch(0).position, hits, UnityEngine.XR.ARSubsystems.TrackableType.Planes);

                if (hits.Count > 0)
                {
                    Instantiate(objectToPlace, hits[0].pose.position, hits[0].pose.rotation);
                }
            }
        }
    }

    List<ARDummyComponent> planes = new List<ARDummyComponent>();

    void OnPlaneChanged(ARPlanesChangedEventArgs eventArgs)
    {
        if (eventArgs.added.Count > 0)
        {
            foreach (var plane in eventArgs.added)
            {
                if (plane.TryGetComponent<ARDummyComponent>(out var visualizer))
                {
                    planes.Add(visualizer);
                    visualizer.SetVisible(useCursor);
                    //visualizer.visualizeSurfaces = (m_DebugPlaneSlider.value != 0);
                }
            }
        }

        if (eventArgs.removed.Count > 0)
        {
            foreach (var plane in eventArgs.removed)
            {
                if (plane.TryGetComponent<ARDummyComponent>(out var visualizer))
                    planes.Remove(visualizer);
            }
        }

        // Fallback if the counts do not match after an update
        if (m_PlaneManager.trackables.count != planes.Count)
        {
            planes.Clear();
            foreach (var trackable in m_PlaneManager.trackables)
            {
                if (trackable.TryGetComponent<ARDummyComponent>(out var visualizer))
                {
                    planes.Add(visualizer);
                    //visualizer.SetVisible(useCursor);
                    //visualizer.visualizeSurfaces = (m_DebugPlaneSlider.value != 0);
                }
            }
        }
    }

    public void ShowHideCursor()
    {
        useCursor = !useCursor;
        cursorChildObj.SetActive(useCursor);
        ChangePlaneVis(useCursor);
    }

    private void ChangePlaneVis(bool val)
    {
        foreach (var item in planes)
        {
            item.SetVisible(val);
        }
    }

    private void UpdateCursor()
    {
        var screenPos = Camera.main.ViewportToScreenPoint(new Vector2(.5f, .5f));
        var hits = new List<ARRaycastHit>();
        raycastManager.Raycast(screenPos, hits, UnityEngine.XR.ARSubsystems.TrackableType.Planes);

        if (hits.Count > 0)
        {
            transform.position = hits[0].pose.position;
            transform.rotation = hits[0].pose.rotation;
        }
    }
}

public class ARDummyComponent : MonoBehaviour
{
    internal void SetVisible(bool val)
    {
        throw new System.NotImplementedException();
    }
}
