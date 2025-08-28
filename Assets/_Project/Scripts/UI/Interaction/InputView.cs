using Cysharp.Threading.Tasks;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
using VARTube.Core.Entity;
using VARTube.ProductBuilder.Design.Composite;
using VARTube.UI.Extensions;

namespace VARTube.UI.Interaction
{
    public abstract class InputView : MonoBehaviour
    {
        [SerializeField] private TMP_Text _label;
        [SerializeField] private string _labelShow = "Изменить";
        [SerializeField] private string _labelHide = "Сохранить";

        public UnityEvent OnValueChanged = new();

        protected GameObject _body;

        protected virtual void Awake()
        {
            _body = transform.Find("Body").gameObject;
        }

        protected virtual void Start()
        {
            Button changeButton = transform.Find("Label/ChangeButton").GetComponent<Button>();
            TextMeshProUGUI label = changeButton.transform.Find("Text").GetComponent<TextMeshProUGUI>();

            changeButton.onClick.AddListener(() =>
            {
                _body.gameObject.SetActive(!_body.gameObject.activeSelf);
                label.SetText(_body.gameObject.activeSelf ? _labelHide : _labelShow);
                ParamsPanel paramsPanel = GetComponentInParent<ParamsPanel>();
                if (paramsPanel)
                    paramsPanel.GetComponent<RectTransform>().UpdateLayout().Forget();
            });
            _body.gameObject.SetActive(false);
        }

        public virtual void Setup(EntityPath productPath, VARTube.Interaction.Input input)
        {
            UpdateLabel(input);
        }

        public void UpdateLabel(VARTube.Interaction.Input input)
        {
            _label.text = $"{(string.IsNullOrEmpty(input.VerboseName) ? input.Name : input.VerboseName)}   <color=#999>{(input.Value.ToString().StartsWith("s123mat") ? "" : input.Value.ToString().ToLower())}</color>";
        }
    }
}