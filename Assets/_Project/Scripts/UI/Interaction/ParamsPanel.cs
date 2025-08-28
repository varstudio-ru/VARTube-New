using Cysharp.Threading.Tasks;
using Newtonsoft.Json;
using RailwayMuseum.UI.New;
using RailwayMuseum.UI.NewSwipePanel;
using System;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using VARTube.Input;
using VARTube.Interaction;
using VARTube.ProductBuilder.Controller;
using VARTube.UI.Extensions;
using Product = VARTube.ProductBuilder.Design.Composite.Product;

namespace VARTube.UI.Interaction
{
    [Serializable]
    public class InputPrefab
    {
        [SerializeField]
        private InputType _type;
        [SerializeField]
        private InputView _view;
        [SerializeField]
        private InputView _alternativeView;

        public InputType Type => _type;
        public InputView View => _view;
        public InputView AlternativeView => _alternativeView;
    }
    
    public class ParamsPanel : MonoBehaviour
    {
        [SerializeField] private Transform _content;
        [SerializeField] private InputPrefab[] _prefabs;
        
        [SerializeField]
        private TMP_Text _priceText;
        [SerializeField]
        private TMP_Text _dateText;

        [SerializeField] 
        private Button _lockTransformButton;

        [SerializeField]
        private Sprite _lockTransformSprite;
        [SerializeField]
        private Sprite _unlockTransformSprite;

        private Dictionary<string, InputView> children = new();

        private JsonSerializerSettings _jsonSettings = new() { NullValueHandling = NullValueHandling.Ignore };

        public event Action<(Product product, int inputsCount)> OnSetup;
        public event Action OnClearSelect;

        private bool isBusy = false;

        private Product _currentProduct;

        private void Awake()
        {
            _lockTransformButton.onClick.AddListener(ToggleLockTransform);
        }

        private void UpdateLockTransform()
        {
            if(_currentProduct == null)
                return;
            
            Draggable draggable = _currentProduct.Controller.GetComponent<Draggable>();

            _lockTransformButton.transform.GetChild(0).GetComponent<Image>().sprite = draggable.IsLocked ? _lockTransformSprite : _unlockTransformSprite;
        }

        private void ToggleLockTransform()
        {
            if(_currentProduct == null)
                return;

            Draggable draggable = _currentProduct.Controller.GetComponent<Draggable>();
            draggable.IsLocked = !draggable.IsLocked;
            
            UpdateLockTransform();
        }

        private void Clear()
        {
            foreach ( InputView child in children.Values )
                Destroy(child.gameObject);
            children.Clear();
        }

        public void ClearSelect()
        {
            if (FindObjectsByType<ProductController>(FindObjectsSortMode.None).Length < 2)
                return;

            OnClearSelect?.Invoke();
            Clear();
        }
        
        private static string FormatDay(string input)
        {
            if (!int.TryParse(input, out int n))
                return string.Empty;

            int number = Math.Abs(n) % 100;
            int lastDigit = number % 10;

            string suffix;
            if (number is >= 11 and <= 19)
                suffix = "дней";
            else
            {
                suffix = lastDigit switch
                {
                    1 => "день",
                    >= 2 and <= 4 => "дня",
                    _ => "дней"
                };
            }

            return $"{n} {suffix}";
        }


        public async void UpdateOutputs()
        {
            if(_currentProduct == null)
                return;
            string outputsData = await _currentProduct.Core.GetOutputsStringAsync();
            Output[] allOutputs = JsonConvert.DeserializeObject<Output[]>( outputsData );
            Output priceOutput = allOutputs.FirstOrDefault(o => o.Type == OutputType.PRICE);
            Output dateOutput = allOutputs.FirstOrDefault(o => o.Type == OutputType.DATE);
            _priceText.text = priceOutput == null ? "" : $"{priceOutput.ProperName}: {priceOutput.Value} ₽";
            _dateText.text = dateOutput == null ? "" : $"{dateOutput.ProperName}: {FormatDay(dateOutput.Value.ToString())}";
            _priceText.transform.parent.gameObject.SetActive(!string.IsNullOrEmpty(_priceText.text));
            _dateText.transform.parent.gameObject.SetActive(!string.IsNullOrEmpty(_dateText.text));
        }

        public async UniTask Setup(Product product)
        {
            if(isBusy)
                return;
            
            _currentProduct?.OnRecalculated.RemoveListener(UpdateOutputs);
            _currentProduct = product.Parent ?? product;
            _currentProduct.OnRecalculated.AddListener(UpdateOutputs);
            isBusy = true;
            Clear();
            
            UpdateLockTransform();
            UpdateOutputs();
            
            string inputsString = await ( product.Parent ?? product ).Core.GetInputsStringAsync();
            List<VARTube.Interaction.Input> inputs = JsonHelper.ToClass<List<VARTube.Interaction.Input>>(inputsString, _jsonSettings) ?? new List<VARTube.Interaction.Input>();

            string relatedInputsString = product.IsRelated ? await product.Parent.Core.GetRelatedInputsStringAsync() : "";
            Dictionary<string, List<VARTube.Interaction.Input>> relatedInputs = JsonHelper.ToClass<Dictionary<string, List<VARTube.Interaction.Input>>>(relatedInputsString, _jsonSettings);
            SwipePanel swipePanel = GetComponent<SwipePanel>();
            
            List<VARTube.Interaction.Input> targetInputs = product.IsRelated ? relatedInputs[product.RelatedGuid] : inputs;
            
            foreach(VARTube.Interaction.Input input in targetInputs.OrderBy(i => i.Order))
            {
                InputPrefab targetPrefab = _prefabs.FirstOrDefault(p => p.Type == input.Type);
                if(targetPrefab == null)
                    continue;
                InputView targetViewPrefab = targetPrefab.View;
                if(input.Settings is not InputSettings settings)
                    throw new InvalidCastException("Wrong settings type");
                if(input.Type is InputType.FLOAT or InputType.INT && settings.Tag != "width" &&
                                                                     settings.Tag != "height" &&
                                                                     settings.Tag != "depth")
                {
                    targetViewPrefab = targetPrefab.AlternativeView;
                }
                InputView targetView = Instantiate(targetViewPrefab, _content);
                VARTube.Interaction.Input localInput = input;
                if(targetView != null)
                {
                    targetView.Setup(product.Path, input);
                    targetView.OnValueChanged.AddListener(async () =>
                    {
                        if( !product.IsRelated && !string.IsNullOrEmpty(settings.Event) )
                            await product.Core.InvokeAsync(settings.Event, localInput.Value.ToString());
                        targetView.UpdateLabel(input);
                        _currentProduct.Recalculate( JsonConvert.SerializeObject(inputs), JsonConvert.SerializeObject(relatedInputs), default).Forget();
                    });
                    children.Add(input.guid, targetView);
                }
            }

            if (swipePanel != null)
            {
                swipePanel.UpdateScrolls();
                swipePanel.UpdateLayout().Forget();
                swipePanel.ResetPosition();
                await swipePanel.UpdateLayout();
            }
            else
            {
                UpdateScrolls();
                GetComponent<RectTransform>().UpdateLayout().Forget();
            }
            _content.GetComponent<RectTransform>().UpdateLayout().Forget();

            OnSetup?.Invoke((product, inputs.Count));
            isBusy = false;
        }

        public void UpdateScrolls()
        {
            foreach (ScrollRect scroll in GetComponentsInChildren<ScrollRect>(true))
            {
                if (scroll.horizontal && !scroll.vertical)
                    NestedScrollRect.ReplaceScrollRect(scroll);
            }

            foreach (var slider in GetComponentsInChildren<Slider>(true))
                NestedSlider.ReplaceSlider(slider);

            foreach (var input in GetComponentsInChildren<TMP_InputField>(true))
                NestedInputField.ReplaceInputField(input);
        }
    }
}
