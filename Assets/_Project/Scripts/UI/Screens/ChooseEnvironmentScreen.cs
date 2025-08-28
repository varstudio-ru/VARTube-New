using Cysharp.Threading.Tasks;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using VARTube.Core.Services;
using VARTube.Network.Models;
using VARTube.UI.ScreenManager;
using VARTube.WebView;

namespace VARTube.UI
{
    public class ChooseEnvironmentScreen : MonoBehaviour, IScreenContext
    {
        [SerializeField] private Button _openIn3DButton;
        [SerializeField] private Button _openInARButton;
        [SerializeField] private Button _backButton;
        [SerializeField] private TMP_Text _guidText;
        [SerializeField] private RawImage _productIcon;
        [SerializeField] private TMP_Text _productTitle;

        private ProductEnvironmentManager _productEnvironmentManager;
        private ScreenContext _screenContext;
        private ProductCalculationInfo _productInfo;
        private LoadingScreen _loadingScreen;

        public void SetContext(ScreenContext context)
        {
            _screenContext = context;
            _productInfo = (ProductCalculationInfo)context.Data[0];

            _productIcon.texture = _productInfo.views.texture;
            _productTitle.text = _productInfo.name;
        }

        private void ShowProduct(ProductShowroomEnvironment environment)
        {
            UniTask.Void(async () =>
            {
                _loadingScreen.gameObject.SetActive(true);
                await _productEnvironmentManager.OpenShowroom(environment, new Variant("", _productInfo.Guid));
                _loadingScreen.gameObject.SetActive(false);
            });
        }

        private void Awake()
        {
            _openIn3DButton.onClick.AddListener(() => { ShowProduct(ProductShowroomEnvironment.ThreeD); });
            _openInARButton.onClick.AddListener(() => { ShowProduct(ProductShowroomEnvironment.AR); });
            _backButton.onClick.AddListener(() => { _screenContext.Manager.Open<MainMenuScreen>(); });
        }

        private void Start()
        {
            _productEnvironmentManager = ApplicationServices.GetService<ProductEnvironmentManager>();
            _loadingScreen = ApplicationServices.GetService<LoadingScreen>();
        }
    }
}