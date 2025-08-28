using UnityEngine;
using UnityEngine.Events;

namespace VARTube.UI.BasicUI
{
    public abstract class SimpleDialog : MonoBehaviour
    {
        public UnityEvent OnHidden = new();
        
        public abstract void Hide();
    }
}