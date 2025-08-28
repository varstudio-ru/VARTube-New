using Cysharp.Threading.Tasks;
using UnityEngine;
using UnityEngine.Events;

namespace VARTube.Input
{
    public class VARInput : MonoBehaviour
    {
        private const bool IsDebug = false;//Для тестирования через UnityRemote
       
        [SerializeField] private bool isActive = true;

        public UnityEvent<Selectable> OnSelectionChanged => _inputController.OnSelectionChanged;
        public UnityEvent<bool> OnInputCaptureChanged => _inputController.OnInputCaptureChanged;

        private InputController _inputController;
        
        private void Awake()
        {
            if(IsDebug || Application.platform is RuntimePlatform.Android or RuntimePlatform.IPhonePlayer)
                _inputController = gameObject.AddComponent<MobileInputController>();
            else
                _inputController = gameObject.AddComponent<StandaloneInputController>();

            UniTask.Void(async () =>
            {
                await UniTask.DelayFrame(10);

                gameObject.SetActive(isActive);
            });
       
        }
    }
}
