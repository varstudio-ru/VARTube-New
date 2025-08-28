using System.Collections.Generic;
using System.Linq;
using Cysharp.Threading.Tasks;
using DG.Tweening;
using RailwayMuseum.UI.New;
using TMPro;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.Serialization;
using UnityEngine.UI;
using VARTube.UI.Extensions;

namespace RailwayMuseum.UI.NewSwipePanel
{
    public class SwipePanel : MonoBehaviour, IDragHandler, IBeginDragHandler, IEndDragHandler
    {
        [SerializeField]
        private bool _needLayoutUpdate = true;
        [SerializeField]
        private GameObject _grabber;
        [SerializeField]
        private GameObject _innerHeader;
        [SerializeField]
        private RectTransform _innerScroll;
        [Header("Main")]
        [SerializeField]
        private RectTransform _header;
        [SerializeField]
        private RectTransform _bottom;
        //[SerializeField]
        //private RectTransform _content;
        //[SerializeField]
        //private float _contentTopOffset = 20;
        [SerializeField] 
        [Tooltip("Определяет на сколько дополнительно вверх можно вытянуть панель.")]
        private float additionalSpace = 20;
        [SerializeField]
        private RectTransform snapToTop;
        [SerializeField]
        private float snapToTopOffset = -20;
        [Tooltip("Привязка панели к определенному элементу. При этом игнорируется minBottomOffset")]
        [SerializeField] 
        private RectTransform snapTo;
        [Tooltip("snapTo будет использоваться только для начальной позиции. При движении панели вниз ограничение срабатывет по minBottomOffset")]
        [SerializeField] 
        private bool snapToIsInitial = false;
        [FormerlySerializedAs( "snappToOffset" )]
        [Tooltip("Смещение относительно snapTo")]
        [SerializeField] 
        private float snapToOffset = -20;
        [SerializeField] 
        [Tooltip("При движении панели вниз определяет в какой момент она остановится.")]
        protected float minBottomOffset = 100;
        [SerializeField]
        [Tooltip("Максимальная позиция по Y, которую может занять панель.")]
        protected float maxTopPos;
        [SerializeField]
        [Tooltip("нужно ли скруглять углы при приближении к хедеру.")]
        protected bool isNeedModifyEdge = true;

        //[Header("Inertia")]
        //[SerializeField] 
        //private bool inertia = true;
        //[SerializeField]
        //private float decelerationRate = 100;
        //[SerializeField] 
        //private float velocityMultiplier = 0.05f;

        private const bool inertia = true;
        
        [Header("Elasticity")]
        [SerializeField] 
        private bool elasticity = true;
        [SerializeField] 
        private float elasticityDamping = 100;
        [SerializeField] 
        private float elasticityBottomOffset = 100;
        [SerializeField] 
        private float elasticityTopOffset = 100;

        [SerializeField]
        private float InertiaDecelerationRate = 900;
        [SerializeField]
        private float InertiaVelocityMultiplier = 0.1f;

        private bool _isDragging;
        private float _screenHeight;
        private float _canvasScale;
        private RectTransform _spaceObject;
        private float _additionalBottomOffset;
        
        protected RectTransform selfRect;
        
        private float _velocity;
        private float _previousPositionY;

        private bool _isFixedByContent = false;
        private bool _layoutIsUpdated = false;
        private bool _isCapturedByInnerHeader = false;

        public bool PauseClamping = false;

        public void SetGrabberVisibility(bool isVisible)
        {
            if(!_grabber)
                return;
            _grabber.SetActive(isVisible);
        }

        private float GetBottomOffset( bool ignoreSnapTo = false )
        {
            if( !snapTo || ignoreSnapTo )
                return (!_bottom ? 0 : _bottom.sizeDelta.y) + minBottomOffset;
            Bounds bounds = RectTransformUtility.CalculateRelativeRectTransformBounds( transform.parent, snapTo );
            float height = transform.parent.GetComponent<RectTransform>().sizeDelta.y;
            return height / 2.0f + bounds.center.y - bounds.size.y / 2.0f + snapToOffset;
        }

        private float GetTopOffset(bool ignoreSnapTo = false)
        {
            if(!snapToTop || ignoreSnapTo)
                return maxTopPos;

            Bounds bounds = RectTransformUtility.CalculateRelativeRectTransformBounds(transform.parent, snapToTop);
            float height = transform.parent.GetComponent<RectTransform>().sizeDelta.y;
            return height / 2.0f + bounds.center.y - bounds.size.y / 2.0f + snapToTopOffset;
        }
  
        protected virtual void Awake()
        {
            maxTopPos = maxTopPos == 0 ? Mathf.Infinity : maxTopPos;
            selfRect = GetComponent<RectTransform>();
            Canvas canvas = GetComponentInParent<Canvas>();
            _screenHeight = canvas.GetComponent<RectTransform>().sizeDelta.y;
            _canvasScale = canvas.GetComponent<RectTransform>().localScale.x;

            _spaceObject = new GameObject( "Space", typeof(RectTransform) ).GetComponent<RectTransform>();
            _spaceObject.SetParent( transform );
            _additionalBottomOffset = !_bottom ? 0 : _bottom.sizeDelta.y;
            ResetSpaceAtEnd();
        }

        private async void Start()
        {
            if( _needLayoutUpdate )
                await UpdateLayout();
        }

        public void ResetPosition()
        {
            Vector2 targetPosition = new(0, Mathf.Clamp( GetBottomOffset(), 0, maxTopPos ));
            selfRect.anchoredPosition = targetPosition;
            _velocity = 0;
            _previousPositionY = selfRect.anchoredPosition.y;
        }

        public void SetSpaceAtEnd( float height )
        {
            _spaceObject.sizeDelta = new Vector2( 0, height + _additionalBottomOffset );
        }

        public void ResetSpaceAtEnd()
        {
            SetSpaceAtEnd( additionalSpace );
        }
        
        public virtual void OnBeginDrag( PointerEventData eventData )
        {
            _isDragging = true;
            if(_innerHeader != null)
            {
                List<RaycastResult> hits = new();
                EventSystem.current.RaycastAll(eventData, hits);
                _isCapturedByInnerHeader = hits.Any(h => h.gameObject == _innerHeader);
            }
            else
            {
                _isCapturedByInnerHeader = false;
            }
        }

        public virtual void OnEndDrag( PointerEventData eventData )
        {
            if( inertia && _isCapturedByInnerHeader )
                _velocity = eventData.delta.y / Time.deltaTime * InertiaVelocityMultiplier / _canvasScale;
            _isDragging = false;
        }

        public virtual void OnDrag( PointerEventData eventData )
        {
            if(!_isCapturedByInnerHeader)
                return;
            transform.Translate( new Vector2( 0, eventData.delta.y ) );
        }

        private bool ClampPosition(float positionDelta)
        {
            if(PauseClamping)
                return false;
            bool isClamped = false;
            float bottomPoint = selfRect.anchoredPosition.y - selfRect.sizeDelta.y;
            if(_isDragging && elasticity)
                bottomPoint -= elasticityBottomOffset;
            if(bottomPoint > 0)
            {
                Vector2 targetPosition = new(0, selfRect.sizeDelta.y);
                if(_isDragging && elasticity)
                    targetPosition.y += elasticityBottomOffset;
                if(elasticity && !_isDragging)
                {
                    float delta = Mathf.Abs(targetPosition.y - selfRect.anchoredPosition.y);
                    float damping = elasticityDamping * delta;
                    if(damping < elasticityDamping)
                        damping = elasticityDamping;

                    selfRect.anchoredPosition = Vector2.MoveTowards(selfRect.anchoredPosition, targetPosition, damping * Time.deltaTime);
                }
                else
                {
                    selfRect.anchoredPosition = targetPosition;
                }
                isClamped = true;
            }
            float topPoint = selfRect.anchoredPosition.y;
            if(_isDragging && elasticity)
                topPoint += elasticityTopOffset;
            float bottomOffset = GetBottomOffset(snapToIsInitial);
            float topOffset = GetTopOffset();
            if(topPoint < bottomOffset)
            {
                Vector2 targetPosition = new(0, bottomOffset);
                if(_isDragging && elasticity)
                    targetPosition.y -= elasticityTopOffset;
                if(elasticity)
                {
                    float delta = Mathf.Abs(targetPosition.y - selfRect.anchoredPosition.y);
                    float damping = elasticityDamping * delta;
                    if(damping < elasticityDamping)
                        damping = elasticityDamping;
                    selfRect.anchoredPosition = Vector2.MoveTowards(selfRect.anchoredPosition, targetPosition, damping * Time.deltaTime);
                }
                else
                {
                    selfRect.anchoredPosition = targetPosition;
                }
                isClamped = true;
            }
            else if(topPoint > topOffset)
            {
                Vector2 targetPosition = new(0, topOffset);
                isClamped = true;
                selfRect.anchoredPosition = targetPosition;
            }

            return isClamped;
        }

        private void LateUpdate()
        {
            if(!_layoutIsUpdated && _needLayoutUpdate)
                return;
            if( inertia && _velocity != 0 )
            {
                Vector2 newPosition = selfRect.anchoredPosition;
                newPosition.y += _velocity * Time.deltaTime;
                selfRect.anchoredPosition = newPosition;
            }
            float delta = selfRect.anchoredPosition.y - _previousPositionY;
            if(_isFixedByContent)
            {
                Vector2 newPosition = selfRect.anchoredPosition;
                newPosition.y = _previousPositionY;
                selfRect.anchoredPosition = newPosition;
            }
            bool isClamped = ClampPosition( delta );
            _previousPositionY = selfRect.anchoredPosition.y;
            if( inertia )
            {
                float deceleration = InertiaDecelerationRate;
                if( isClamped )
                    deceleration += elasticityDamping;
                
                _velocity = Mathf.MoveTowards( _velocity, 0, deceleration * Time.deltaTime );
            }
            if(_innerScroll != null)
            {
                Vector2 size = _innerScroll.sizeDelta;
                RectTransform headerRect = _innerHeader.GetComponent<RectTransform>();
                size.y = selfRect.anchoredPosition.y - headerRect.rect.size.y + headerRect.anchoredPosition.y;
                _innerScroll.sizeDelta = size;
            }
        }
        
        public void ScrollToItem( RectTransform targetItem )
        {
            _velocity = 0;
            Vector2 screenPoint = RectTransformUtility.WorldToScreenPoint( null, targetItem.position );
            RectTransformUtility.ScreenPointToLocalPointInRectangle( selfRect, screenPoint, null, out Vector2 localPoint );
            float targetHeight = localPoint.y + targetItem.sizeDelta.y / 2.0f - minBottomOffset - _additionalBottomOffset - _screenHeight / 2.0f;
            selfRect.DOAnchorPosY( -targetHeight, 0.35f );
        }

        public void ScrollToLocalYPosition(float y)
        {
            selfRect.DOAnchorPosY( y, 0.35f );
        }

        public void ScrollToMakeItemAtTop( RectTransform targetItem, float withOffset = 0 )//TODO если будет использоваться еще где-то надо учитывать pivot и anchor элемента
        {
            _velocity = 0;
            Vector2 targetScreenPoint = RectTransformUtility.WorldToScreenPoint( null, targetItem.position );
            RectTransformUtility.ScreenPointToLocalPointInRectangle( selfRect, targetScreenPoint, null, out Vector2 targetLocalPoint );
            float targetHeight = _screenHeight - _header.sizeDelta.y - targetLocalPoint.y - withOffset;
            selfRect.DOAnchorPosY( targetHeight, 0.35f );
        }

        public async UniTask UpdateLayout()
        {
            RectTransform targetRect = selfRect;
            Vector2 size = targetRect.sizeDelta;
            size.y = GetTopOffset();
            targetRect.sizeDelta = size;
            await targetRect.UpdateLayout();
            _layoutIsUpdated = true;
        }

        public void UpdateScrolls()
        {
            foreach(ScrollRect scroll in GetComponentsInChildren<ScrollRect>(true))
            {
                if( scroll.horizontal && !scroll.vertical )
                    NestedScrollRect.ReplaceScrollRect(scroll);
            }

            foreach (var slider in GetComponentsInChildren<Slider>(true))
                NestedSlider.ReplaceSlider(slider);

            foreach (var input in GetComponentsInChildren<TMP_InputField>(true))
                NestedInputField.ReplaceInputField(input);
        }
    }
}