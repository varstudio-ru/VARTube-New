using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using VARTube.ProductBuilder.Design.Composite;

namespace VARTube.Input
{
    public abstract class InputController : MonoBehaviour
    {
        protected Draggable _currentDraggable;
        protected Selectable _currentSelected;
        protected Interactable _currentInteractable;
        
        protected Vector3? _dragStartHitPoint;
        protected Ray? _dragStartRay;
        protected Vector3? _dragStartDraggablePosition;
        protected Vector3? _dragStartInteractablePosition;

        private RaycastHit[] _hitsBuffer = new RaycastHit[100];//Выделяем 100 на случай если несколько изделий стоят друг за другом и у каждого по несколько коллайдеров

        [HideInInspector]
        public UnityEvent<Selectable> OnSelectionChanged = new();
        [HideInInspector]
        public UnityEvent<bool> OnInputCaptureChanged = new();

        private Vector3 GetCurrentDraggableTempInfinitePlaneRaycastPoint(Ray ray)
        {
            Plane plane = new(Vector3.up, _currentDraggable.transform.position);
            plane.Raycast(ray, out float enter);
            return ray.GetPoint(enter);
        }

        public static RaycastHit? GetProperHit(Draggable current, IEnumerable<RaycastHit> hits, Vector3? rayOrigin = null, ConnectionType surfaceType = ConnectionType.NONE )
        {
            return hits.Where(IsProperHit).OrderBy(h => Vector3.Distance(h.point, rayOrigin ?? Camera.main.transform.position)).FirstOrDefault();

            bool IsProperHit( RaycastHit hit )
            {
                if(!hit.collider)
                    return false;
                
                if( surfaceType != ConnectionType.NONE )
                {
                    if(surfaceType == ConnectionType.WALL && Mathf.Abs(hit.normal.y) > 0.01f )
                        return false;
                    if(surfaceType == ConnectionType.FLOOR && hit.normal.y < 0.99f)
                        return false;
                }
                
                Snappable snappable = hit.collider.GetComponent<Snappable>();
                if(!snappable)
                    return false;
                if(!snappable.Root)//Is infinite plane
                    return true;
                if(current == null)
                    return true;
                Draggable draggable = snappable.Root;
                if( draggable == current )
                    return false;
                if( current.GetComponentsInChildren<Snappable>().Any(c => c.IsSnapped(draggable)))
                    return false;
                
                return true;
            }
        }
        
        protected void ProcessPointerDown( Vector2 position )
        {
            if(EventSystem.current.IsPointerOverGameObject())
                return;
            Ray ray = Camera.main.ScreenPointToRay(position);
            if(Physics.Raycast(ray, out RaycastHit hit, float.PositiveInfinity))
            {
                _currentInteractable = hit.collider.GetComponentInParent<Interactable>();
                if(_currentInteractable != null)
                {
                    _dragStartInteractablePosition = _currentInteractable.transform.position;
                    _dragStartRay = ray;
                    _currentInteractable.StartInteraction(ray);
                    OnInputCaptureChanged.Invoke(true);
                    return;
                }
                
                _dragStartInteractablePosition = null;
                _dragStartRay = null;

                Selectable oldSelected = _currentSelected;
                _currentSelected = hit.collider.GetComponentInParent<Selectable>();
                if( _currentSelected != oldSelected )
                    OnSelectionChanged.Invoke(_currentSelected);
                
                _currentDraggable = hit.collider.GetComponentInParent<Draggable>();
                if(_currentDraggable == null)
                {
                    _currentDraggable = null;
                    _currentInteractable = hit.collider.GetComponentInParent<Interactable>();
                    return;
                }
                
                OnInputCaptureChanged.Invoke(true);
                _dragStartDraggablePosition = _currentDraggable.transform.position;
                if(_currentDraggable.SurfaceType == ConnectionType.FLOOR)
                    _dragStartHitPoint = GetCurrentDraggableTempInfinitePlaneRaycastPoint(ray);
                else
                    _dragStartHitPoint = hit.point;
            }
            else
            {
                if(_currentSelected != null)
                {
                    _currentSelected = null;
                    OnSelectionChanged.Invoke(null);
                }
            }
        }
        
        protected void ProcessPointerDrag( Vector2 position )
        {
            if(!Camera.main)
                return;
            Ray ray = Camera.main.ScreenPointToRay(position);
            
            if(!_currentDraggable || _dragStartDraggablePosition == null || _dragStartHitPoint == null)
            {
                if(_currentInteractable && _dragStartRay != null)
                {
                    _currentInteractable.ContinueInteraction(_dragStartRay.Value, ray);
                }
                return;
            }
            if(_currentDraggable.IsLocked)
                return;
            int hitsCount = Physics.RaycastNonAlloc(ray, _hitsBuffer, float.PositiveInfinity);
            RaycastHit? targetDragSurfaceHit = GetProperHit(_currentDraggable, _hitsBuffer.Take(hitsCount));
            if(targetDragSurfaceHit == null || targetDragSurfaceHit.Value.collider == null)
                return;
            
            //if(!targetDragSurfaceHit.Value.normal.ApproximatelyEqual(Vector3.up, 0.001f))
            //    return;

            Vector3 delta = targetDragSurfaceHit.Value.point - _dragStartHitPoint.Value;
            
            if(delta.magnitude > 5)
                return;
            
            Vector3 newPosition = _dragStartDraggablePosition.Value + delta;
            _currentDraggable.transform.position = newPosition;
            Snappable targetSnappable = targetDragSurfaceHit.Value.collider.GetComponent<Snappable>();
            _currentDraggable.SnapTo(targetSnappable);
        }
        
        protected void ProcessPointerRelease()
        {
            _dragStartDraggablePosition = null;
            _dragStartHitPoint = null;
            _dragStartInteractablePosition = null;
            _dragStartRay = null;
            OnInputCaptureChanged.Invoke(false);
        }
    }
}