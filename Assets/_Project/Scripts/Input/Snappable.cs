using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace VARTube.Input
{
    public class Snappable : MonoBehaviour
    {
        [Serializable]
        private struct SnappedChild
        {
            public Draggable Target;
            public Vector3 SnapOffset;

            public SnappedChild(Snappable snappable, Draggable target)
            {
                Target = target;
                SnapOffset = snappable.transform.InverseTransformPoint(target.transform.position);
            }
        }

        public Draggable Root;
        
        private readonly List<SnappedChild> _children = new();

        public void AddChild(Draggable draggable)
        {
            if(draggable == Root)
            {
                Debug.LogError("Trying to place Root on snappable");
                return;
            }
            _children.Add(new SnappedChild( this, draggable ));
        }

        public void RemoveChild(Draggable draggable)
        {
            if(draggable == Root)
            {
                Debug.LogError("Trying to remove Root from snappable");
                return;
            }
            _children.RemoveAll(c => c.Target == draggable);
        }

        public void UpdateSnapOffset(Draggable draggable)
        {
            int targetIndex = _children.FindIndex(c => c.Target == draggable);
            if(targetIndex == -1)
                return;
            _children[targetIndex] = new SnappedChild(this, draggable);
        }

        public bool IsSnapped(Draggable draggable)
        {
            return _children.Any(c => c.Target == draggable);
        }
        
        private void Update()
        {
            if(transform.hasChanged)
            {
                foreach(SnappedChild child in _children)
                    child.Target.transform.position = transform.TransformPoint(child.SnapOffset);
                transform.hasChanged = false;
            }
        }
    }
}
