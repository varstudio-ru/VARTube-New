using UnityEngine;
using UnityEngine.XR.Interaction.Toolkit.Utilities.Tweenables.Primitives;

namespace VARTube.Input
{
    [RequireComponent(typeof(MeshRenderer))]
    public class ARFeatheredPlane : MonoBehaviour
    {
        [Tooltip("Renderer component on the ARFeatheredPlane prefab. Used to fetch the material to fade in/out.")]
        [SerializeField]
        Renderer m_PlaneRenderer;

        public Renderer planeRenderer
        {
            get => m_PlaneRenderer;
            set => m_PlaneRenderer = value;
        }

        [Tooltip("Fade in/out speed multiplier applied during the alpha tweening. The lower the value, the slower it works. A value of 1 is full speed (1 second).")]
        [Range(0.1f, 1.0f)]
        [SerializeField]
        float m_FadeSpeed = 1f;

        public float fadeSpeed
        {
            get => m_FadeSpeed;
            set => m_FadeSpeed = value;
        }

        int m_ShaderAlphaPropertyID;
        float m_SurfaceVisualAlpha = 1f;
        float m_TweenProgress;

        readonly FloatTweenableVariable m_AlphaTweenableVariable = new FloatTweenableVariable();


        void Awake()
        {
            visualizeSurfaces = true;
        }


        void OnDestroy()
        {
            m_AlphaTweenableVariable.Dispose();
        }

        void Update()
        {
            //TODO: use DOTween

            //m_AlphaTweenableVariable.HandleTween(m_TweenProgress);
            //m_TweenProgress += Time.unscaledDeltaTime * m_FadeSpeed;
            //m_SurfaceVisualAlpha = m_AlphaTweenableVariable.Value;
            //m_PlaneMaterial.SetFloat(m_ShaderAlphaPropertyID, m_SurfaceVisualAlpha);
        }

        public Color curColor;
        public Color hideColor;

        public void SetVisualActive(bool value)
        {
            m_PlaneRenderer.enabled = value;
        }

        public bool visualizeSurfaces
        {
            set
            {
                m_TweenProgress = 0f;
                m_AlphaTweenableVariable.target = value ? 1f : 0f;
                m_AlphaTweenableVariable.HandleTween(0f);
            }
        }
    }
}
