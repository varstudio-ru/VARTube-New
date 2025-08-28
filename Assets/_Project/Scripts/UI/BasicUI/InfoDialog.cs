using Cysharp.Threading.Tasks;
using TMPro;
using UnityEngine;
using VARTube.UI.Extensions;

namespace VARTube.UI.BasicUI
{
    public enum InfoType
    {
        REGULAR,
        ERROR
    }
    
    public class InfoDialog : SimpleDialog
    {
        [SerializeField] private TMP_Text _label;

        public async void Show(string text, InfoType type = InfoType.REGULAR, float hideAfter = 0)
        {
            gameObject.SetActive(true);
            _label.text = text;
            _label.color = Color.black;
            if( type == InfoType.ERROR )
                _label.color = Color.red;
            if(hideAfter == 0)
                return;
            await GetComponent<RectTransform>().UpdateLayout();
            await UniTask.WaitForSeconds(hideAfter);
            Hide();
        }

        public override void Hide()
        {
            gameObject.SetActive(false);
            OnHidden.Invoke();
        }
    }
}
