using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.Interaction.Toolkit;
using VARTube.Input;
using VARTube.Core.Services;
using VARTube.Data.PlayerPreferences;
using VARTube.Showroom;

namespace VARTube.UI.AR
{
    public class OptionsMenuUI : MonoBehaviour
    {
        public GameObject m_ModalMenu;
        private bool m_ShowOptionsModal;

        bool m_InitializingDebugMenu;
        public ARShowroom ARShowroom;

        [SerializeField]
        private AROcclusionManager _arOcclusionManager;

        bool m_ShowObjectMenu;
        Vector2 m_ObjectButtonOffset = Vector2.zero;
        Vector2 m_ObjectMenuOffset = Vector2.zero;
        [SerializeField] private XRScreenSpaceController m_ScreenSpaceController;
        public ARDebugMenu m_DebugMenu;

        public bool IsShowIndicator { get; private set; }
        public ARPlaneManager m_PlaneManager;
        public RoundToggle m_DebugPlaneSlider;
        public RoundToggle VisualizeSelectorSlider;
        public RoundToggle PeopleOcclusionSlider;
        private bool m_IsPointerOverUI;

        public ARProductSelectorIndicator ProductSelectorIndicator;
        private ARProfileLocalStorage _settings;
        readonly List<ARFeatheredPlane> featheredPlaneMeshVisualizerCompanions = new List<ARFeatheredPlane>();

        public AnimationCurve curve;

        public void ShowHideModal()
        {
            if (m_ModalMenu.activeSelf)
            {
                m_ShowOptionsModal = false;
                m_ModalMenu.SetActive(false);
            }
            else
            {
                m_ShowOptionsModal = true;
                m_ModalMenu.SetActive(true);
            }
        }

        void AdjustARDebugMenuPosition()
        {
            if (m_DebugMenu == null)
                return;
            float screenWidthInInches = Screen.width / Screen.dpi;

            if (screenWidthInInches < 5)
            {
                Vector2 menuOffset = m_ShowObjectMenu ? m_ObjectMenuOffset : m_ObjectButtonOffset;

                if (m_DebugMenu.toolbar.TryGetComponent<RectTransform>(out var rect))
                {
                    rect.anchorMin = new Vector2(0.5f, 0);
                    rect.anchorMax = new Vector2(0.5f, 0);
                    rect.eulerAngles = new Vector3(rect.eulerAngles.x, rect.eulerAngles.y, 90);
                    rect.anchoredPosition = new Vector2(0, 20) + menuOffset;
                }

                if (m_DebugMenu.displayInfoMenuButton.TryGetComponent<RectTransform>(out var infoMenuButtonRect))
                    infoMenuButtonRect.localEulerAngles = new Vector3(infoMenuButtonRect.localEulerAngles.x, infoMenuButtonRect.localEulerAngles.y, -90);

                if (m_DebugMenu.displayConfigurationsMenuButton.TryGetComponent<RectTransform>(out var configurationsMenuButtonRect))
                    configurationsMenuButtonRect.localEulerAngles = new Vector3(configurationsMenuButtonRect.localEulerAngles.x, configurationsMenuButtonRect.localEulerAngles.y, -90);

                if (m_DebugMenu.displayCameraConfigurationsMenuButton.TryGetComponent<RectTransform>(out var cameraConfigurationsMenuButtonRect))
                    cameraConfigurationsMenuButtonRect.localEulerAngles = new Vector3(cameraConfigurationsMenuButtonRect.localEulerAngles.x, cameraConfigurationsMenuButtonRect.localEulerAngles.y, -90);

                if (m_DebugMenu.displayDebugOptionsMenuButton.TryGetComponent<RectTransform>(out var debugOptionsMenuButtonRect))
                    debugOptionsMenuButtonRect.localEulerAngles = new Vector3(debugOptionsMenuButtonRect.localEulerAngles.x, debugOptionsMenuButtonRect.localEulerAngles.y, -90);

                if (m_DebugMenu.infoMenu.TryGetComponent<RectTransform>(out var infoMenuRect))
                {
                    infoMenuRect.anchorMin = new Vector2(0.5f, 0);
                    infoMenuRect.anchorMax = new Vector2(0.5f, 0);
                    infoMenuRect.pivot = new Vector2(0.5f, 0);
                    infoMenuRect.anchoredPosition = new Vector2(0, 150) + menuOffset;
                }

                if (m_DebugMenu.configurationMenu.TryGetComponent<RectTransform>(out var configurationsMenuRect))
                {
                    configurationsMenuRect.anchorMin = new Vector2(0.5f, 0);
                    configurationsMenuRect.anchorMax = new Vector2(0.5f, 0);
                    configurationsMenuRect.pivot = new Vector2(0.5f, 0);
                    configurationsMenuRect.anchoredPosition = new Vector2(0, 150) + menuOffset;
                }

                if (m_DebugMenu.cameraConfigurationMenu.TryGetComponent<RectTransform>(out var cameraConfigurationsMenuRect))
                {
                    cameraConfigurationsMenuRect.anchorMin = new Vector2(0.5f, 0);
                    cameraConfigurationsMenuRect.anchorMax = new Vector2(0.5f, 0);
                    cameraConfigurationsMenuRect.pivot = new Vector2(0.5f, 0);
                    cameraConfigurationsMenuRect.anchoredPosition = new Vector2(0, 150) + menuOffset;
                }

                if (m_DebugMenu.debugOptionsMenu.TryGetComponent<RectTransform>(out var debugOptionsMenuRect))
                {
                    debugOptionsMenuRect.anchorMin = new Vector2(0.5f, 0);
                    debugOptionsMenuRect.anchorMax = new Vector2(0.5f, 0);
                    debugOptionsMenuRect.pivot = new Vector2(0.5f, 0);
                    debugOptionsMenuRect.anchoredPosition = new Vector2(0, 150) + menuOffset;
                }
            }
        }

        //void OnPlaneChanged(ARPlanesChangedEventArgs eventArgs)
        //{
        //    if (eventArgs.added.Count > 0)
        //    {
        //        foreach (var plane in eventArgs.added)
        //        {
        //            if (plane.TryGetComponent<ARFeatheredPlane>(out var visualizer))
        //            {
        //                featheredPlaneMeshVisualizerCompanions.Add(visualizer);
        //                //visualizer.visualizeSurfaces = (m_DebugPlaneSlider.value != 0);
        //                visualizer.SetVisualActive(m_DebugPlaneSlider.IsOn);
        //            }
        //        }
        //    }

        //    if (eventArgs.removed.Count > 0)
        //    {
        //        foreach (var plane in eventArgs.removed)
        //        {
        //            if (plane.TryGetComponent<ARFeatheredPlane>(out var visualizer))
        //                featheredPlaneMeshVisualizerCompanions.Remove(visualizer);
        //        }
        //    }

        //    if (m_PlaneManager.trackables.count != featheredPlaneMeshVisualizerCompanions.Count)
        //    {
        //        featheredPlaneMeshVisualizerCompanions.Clear();
        //        foreach (var trackable in m_PlaneManager.trackables)
        //        {
        //            if (trackable.TryGetComponent<ARFeatheredPlane>(out var visualizer))
        //            {
        //                featheredPlaneMeshVisualizerCompanions.Add(visualizer);
        //                //visualizer.visualizeSurfaces = (m_DebugPlaneSlider.value != 0);
        //                visualizer.SetVisualActive(m_DebugPlaneSlider.IsOn);
        //            }
        //        }
        //    }
        //}

        public void SetShowDebugPlane( bool value )
        {
            SetPlaneVisibility(value);
            //_settings.VisualizePlane = value;
        }

        public void SetActivePeopleOcclusion( bool value )
        {
            ActivateOcclusion(value);
            //_settings.PeopleOcclusion = value;
        }

        void ActivateOcclusion(bool val)
        {
            if (_arOcclusionManager == null)
                return;

            var manager = _arOcclusionManager;

            if (val)
            {
                manager.requestedEnvironmentDepthMode = UnityEngine.XR.ARSubsystems.EnvironmentDepthMode.Medium;
                manager.environmentDepthTemporalSmoothingRequested = true;
                manager.requestedHumanStencilMode = UnityEngine.XR.ARSubsystems.HumanSegmentationStencilMode.Medium;
                manager.requestedHumanDepthMode = UnityEngine.XR.ARSubsystems.HumanSegmentationDepthMode.Fastest;
                manager.requestedOcclusionPreferenceMode = UnityEngine.XR.ARSubsystems.OcclusionPreferenceMode.PreferHumanOcclusion;
            }
            else
            {
                manager.requestedEnvironmentDepthMode = UnityEngine.XR.ARSubsystems.EnvironmentDepthMode.Disabled;
                manager.environmentDepthTemporalSmoothingRequested = false;
                manager.requestedHumanStencilMode = UnityEngine.XR.ARSubsystems.HumanSegmentationStencilMode.Disabled;
                manager.requestedHumanDepthMode = UnityEngine.XR.ARSubsystems.HumanSegmentationDepthMode.Disabled;
                manager.requestedOcclusionPreferenceMode = UnityEngine.XR.ARSubsystems.OcclusionPreferenceMode.NoOcclusion;
            }
        }

        void SetPlaneVisibility(bool value)
        {
            var count = featheredPlaneMeshVisualizerCompanions.Count;
            for (int i = 0; i < count; ++i)
            {                
                featheredPlaneMeshVisualizerCompanions[i].SetVisualActive(value);
            }
        }

        void Update()
        {
            if (m_InitializingDebugMenu)
            {
                m_DebugMenu.gameObject.SetActive(false);
                m_InitializingDebugMenu = false;
            }

            if (m_ShowOptionsModal)
            {
                m_IsPointerOverUI = EventSystem.current != null && EventSystem.current.IsPointerOverGameObject(-1);
            }
            else
            {
                m_IsPointerOverUI = false;
            }

            if (!m_IsPointerOverUI && m_ShowOptionsModal)
            {
                m_IsPointerOverUI = EventSystem.current != null && EventSystem.current.IsPointerOverGameObject(-1);
            }
        }

        //void HideTapOutsideUI(InputAction.CallbackContext context)
        //{
        //    if (!m_IsPointerOverUI)
        //    {
        //        if (m_ShowOptionsModal)
        //            m_ModalMenu.SetActive(false);
        //    }
        //}

        private void Start()
        {
            _settings = ApplicationServices.GetService<PlayerPreferences>().AR;

            if( m_DebugMenu != null )
                m_DebugMenu.gameObject.SetActive(_settings.ShowDebugMenu);
            AdjustARDebugMenuPosition();

            if (m_DebugPlaneSlider != null)
            {  
                m_DebugPlaneSlider.OnValueChanged.AddListener(SetShowDebugPlane);
                m_DebugPlaneSlider.SetIsOn( false );
                SetShowDebugPlane(false);
            }
            if (PeopleOcclusionSlider != null)
            {
                PeopleOcclusionSlider.OnValueChanged.AddListener(SetActivePeopleOcclusion);
                PeopleOcclusionSlider.SetIsOn( false );
                SetActivePeopleOcclusion(false);
            }
        }

        //private void OnEnable()
        //{
        //    m_ScreenSpaceController.dragCurrentPositionAction.action.started += HideTapOutsideUI;
        //    m_ScreenSpaceController.tapStartPositionAction.action.started += HideTapOutsideUI;
        //    m_PlaneManager.planesChanged += OnPlaneChanged;

        //    TransparentSlider.value = TransparentSlider.minValue;
        //    TransparentSlider.onValueChanged.AddListener(OnTransparentSliderValueChanged);
        //}

        //private void ProductSelectorIndicator_OnCast()
        //{
        //    if (ProductSelectorIndicator.currentProduct != null)
        //    {
        //        var renderers = ProductSelectorIndicator.currentProduct.productGameObject.GetComponentsInChildren<MeshRenderer>();

        //        //TODO: public class ProductElement : ProductElementBase

        //        var item = renderers[0];
        //        var originColor = item.material.color;
        //        TransparentSlider.value = 255 * originColor.a;
        //        TransparentSlider.interactable = true;
        //        TransparentSlider.transform.Find("Fill Area/Fill").GetComponent<Image>().enabled = true;
        //    }
        //    else
        //    {
        //        TransparentSlider.value = TransparentSlider.minValue;
        //        TransparentSlider.interactable = false;
        //        TransparentSlider.transform.Find("Fill Area/Fill").GetComponent<Image>().enabled = false;
        //    }
        //}

        //private void OnTransparentSliderValueChanged(float arg0)
        //{
        //    if (ProductSelectorIndicator.currentProduct == null)
        //    {
        //        return;
        //    }

        //    var renderers = ProductSelectorIndicator.currentProduct.productGameObject.GetComponentsInChildren<MeshRenderer>();

        //    //TODO: public class ProductElement : ProductElementBase
        //    //TODO: apply Animation Curve ?
        //    foreach (var item1 in renderers)
        //    {
        //        var item = item1.GetComponent<MeshRenderer>();
        //        var originColor = item.material.color;
        //        var newColor = originColor;
        //        newColor.a = arg0 / 255;
        //        item.material.SetColor("_Color", newColor);
        //    }
        //}

        //private void OnDisable()
        //{
        //    m_ScreenSpaceController.dragCurrentPositionAction.action.started += HideTapOutsideUI;
        //    m_ScreenSpaceController.tapStartPositionAction.action.started += HideTapOutsideUI;
        //    m_PlaneManager.planesChanged -= OnPlaneChanged;
        //}
    }
}