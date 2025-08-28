using Cysharp.Threading.Tasks;
using DG.Tweening;
using Newtonsoft.Json;
using RailwayMuseum.UI.NewSwipePanel;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using VARTube.ProductBuilder.Controller;
using VARTube.UI.BasicUI;
using VARTube.UI.Extensions;
using VARTube.UI.Interaction;
using static UnityEngine.Rendering.GPUSort;
using Product = VARTube.ProductBuilder.Design.Composite.Product;

[DefaultExecutionOrder(300)]
public class ParamsPanelView : MonoBehaviour
{
    [SerializeField] private Button _toggleButton;
    [SerializeField] private TextMeshProUGUI _toggleButtonText;
    [SerializeField] private BasicUIController _infoPanel;//TODO remove
    [SerializeField] private GameObject _input;//TODO remove
    [SerializeField] private Toggle _arInputToggle;//TODO remove
    [SerializeField] private TMP_Text _productLabel;

    [Header("Settings")]
    [SerializeField] private bool _isTablet = true;
    [SerializeField] private bool _isAR = false;


    [Space]
    [SerializeField] private string _tipText = "Выберите изделие";
    [SerializeField] private string _labelBack = "Назад";

    [Space]
    [SerializeField] private string _productLabelDefault = "Интерактивные параметры";
    [SerializeField] private string _productLabelARDefault = "Выберете изделие";
    [SerializeField] private string _labelShow = "Изменить";
    [SerializeField] private string _labelHide = "Скрыть";
    [SerializeField] private Vector2 _hiddenPosition = new Vector2(0, -500);
    [SerializeField] private float _animationDuration = 0.5f;
    [SerializeField] private Ease _ease = Ease.OutCubic;

    private PanelStateType _state = PanelStateType.close;
    private RectTransform _windowRect;
    private Tweener _currentTween;
    private bool _isVisible;
    private JsonSerializerSettings _jsonSettings = new() { NullValueHandling = NullValueHandling.Ignore };

    private bool arInputToggleIsOn => _arInputToggle != null ? _arInputToggle.isOn : true;


    //TODO дальше начинается стрем чухня которую мы перепишем
    public void Show()
    {
        if (!_isAR && !arInputToggleIsOn && ProductController.Active.Count > 1)
        {
            switch (_state)
            {
                case PanelStateType.close:
                    {
                        _infoPanel.ShowInfoDialog(_tipText, InfoType.REGULAR, 1);
                        _input.SetActive(true);

                        if (_toggleButtonText != null)
                            _toggleButtonText.text = _labelBack;

                        _state = PanelStateType.select;

                        return;
                    }

                case PanelStateType.select:
                    {
                        _input.SetActive(false);
                        Hide();
                        _state = PanelStateType.close;
                        return;
                    }

                default:
                    break;

            }
        }

        _currentTween?.Kill();
        _currentTween = _windowRect.DOAnchorPos3DY(0, _animationDuration)
                                  .SetEase(_ease)
                                  .OnStart(() =>
                                  {
                                      _isVisible = true;
                                      if (_toggleButtonText != null)
                                          _toggleButtonText.text = (!_isAR && !arInputToggleIsOn && ProductController.Active.Count > 1) ? _labelBack : _labelHide;
                                  });
    }

    public void Hide()
    {

        if (!_isAR && !arInputToggleIsOn && ProductController.Active.Count > 1)
        {
            switch (_state)
            {
                case PanelStateType.open:
                    {
                        _input.SetActive(false);


                        _state = PanelStateType.close;
                        break;
                    }

                default:
                    break;
            }

        }

        _currentTween?.Kill();
        _currentTween = _windowRect.DOAnchorPosY(_hiddenPosition.y, _animationDuration)
                                  .SetEase(_ease)
                                  .OnStart(() =>
                                  {
                                      _isVisible = false;
                                      if (_toggleButtonText != null)
                                          _toggleButtonText.text = _labelShow;
                                  });
    }


    public void Toggle()
    {
        if (_isVisible)
            Hide();
        else
            Show();
    }

    private void OnClearSelect()
    {

        if (!arInputToggleIsOn && ProductController.Active.Count > 1 && _input.activeSelf && _state != PanelStateType.close)
        {
            if (!_isAR)
                _input.SetActive(false);
        }

        Hide();

        if (ProductController.Active.Count > 1)
            _productLabel.SetText(_isAR ? _productLabelARDefault : _productLabelDefault);

        if (_toggleButton != null)
            _toggleButton.gameObject.SetActive(_isTablet || ProductController.Active.Count > 1);

        _state = PanelStateType.close;
    }

    private void OnSetup((Product product, int inputsCount) args)
    {
        UpdateUIState();
        if (!_isTablet && ProductController.Active.Count < 2)
        {
            SwipePanel swipePanel = GetComponent<SwipePanel>();

            if (swipePanel != null)
            {
                swipePanel.enabled = args.inputsCount != 0;
                swipePanel.SetGrabberVisibility(args.inputsCount != 0);

                if (args.inputsCount == 0)
                    GetComponent<RectTransform>().anchoredPosition = new Vector2(0, 40);
            }
        }

        if (_isTablet && args.inputsCount == 0)
        {
            _currentTween?.Kill();
            _currentTween = _windowRect.DOAnchorPosY(_hiddenPosition.y, _animationDuration)
                                      .SetEase(_ease)
                                      .OnStart(() =>
                                      {
                                          _isVisible = false;
                                          if (_toggleButtonText != null)
                                              _toggleButtonText.text = _labelShow;
                                      });

            if (_toggleButton != null)
                _toggleButton.gameObject.SetActive(false);
        }


        _productLabel.SetText(args.product.Name);

        if (arInputToggleIsOn)
            return;

        if (_isTablet && ProductController.Active.Count > 1 && args.inputsCount != 0)
        {
            _currentTween?.Kill();
            _currentTween = _windowRect.DOAnchorPos3DY(0, _animationDuration)
                                      .SetEase(_ease)
                                      .OnStart(() =>
                                      {
                                          _isVisible = true;
                                          if (_toggleButtonText != null)
                                              _toggleButtonText.text = (!_isAR && ProductController.Active.Count > 1) ? _labelBack : _labelHide;
                                      });
        }

        if (_state != PanelStateType.close)
        {
            _state = PanelStateType.open;
            _productLabel.SetText(args.product.Name);
        }

    }

    private void OnArToggleChanged(bool value)
    {
        if (ProductController.Active.Count > 1)
            _productLabel.SetText(value ? _productLabelARDefault : _productLabelDefault);

        Hide();
    }

    private void Init()
    {
        _windowRect = GetComponent<RectTransform>();
        var paramsPanel = GetComponent<ParamsPanel>();

        if (_toggleButton != null)
            _toggleButton.onClick.AddListener(Toggle);

        if (_toggleButtonText != null)
            _toggleButtonText.text = _isVisible ? _labelHide : _labelShow;

        paramsPanel.OnClearSelect += OnClearSelect;
        paramsPanel.OnSetup += OnSetup;

        if (_arInputToggle != null)
            _arInputToggle.onValueChanged.AddListener(OnArToggleChanged);

        ProductController.OnActiveCountChanged += ProductsCountChanged;
    }

    private void UpdateUIState()
    {
        if (_toggleButton != null)
            _toggleButton.gameObject.SetActive(_isTablet || ProductController.Active.Count > 1);

        if (_productLabel != null)
            if (ProductController.Active.Count > 1)
                _productLabel.SetText(_tipText);
    }

    private void ProductsCountChanged(int count)
    {
        UpdateUIState();
    }

    private void OnEnable()
    {
        if (_windowRect == null)
            _windowRect.UpdateLayout().Forget();

        //if (_toggleButtonText == null)
        //    Show();
    }

    private void OnDisable()
    {
        //Hide();
    }

    private void Awake()
    {
        Init();
    }

    private enum PanelStateType
    {
        open,
        close,
        select
    }
}
