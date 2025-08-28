using UnityEngine;
using VARTube.ProductBuilder.Design.Composite;

namespace VARTube.Input
{
    public class Draggable : MonoBehaviour
    {
        public bool IsLocked = false;
        public ConnectionType SurfaceType = ConnectionType.FLOOR;
        private Snappable _parentSnappable;
        
        public void SnapTo(Snappable parentSnappable)
        {
            if(_parentSnappable == parentSnappable)
            {
                _parentSnappable.UpdateSnapOffset(this);
                return;
            }
            Unsnap();
            _parentSnappable = parentSnappable;
            _parentSnappable.AddChild(this);
        }

        public void Unsnap()
        {
            if(_parentSnappable == null)
                return;
            _parentSnappable.RemoveChild(this);
            _parentSnappable = null;
        }
    }
}