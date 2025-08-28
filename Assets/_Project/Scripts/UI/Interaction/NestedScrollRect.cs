using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

namespace RailwayMuseum.UI.New
{
    public class NestedScrollRect : ScrollRect
    {
		private bool m_routeToParent = false;
		//private IInitializePotentialDragHandler[] m_parentInitializePotentialDragHandlers = null;
		private IBeginDragHandler[] m_parentBeginDragHandlers = null;
		private IDragHandler[] m_parentDragHandlers = null;
		private IEndDragHandler[] m_parentEndDragHandlers = null;

		private NewSwipePanel.SwipePanel parentSwipePanel;

		private void Awake()
		{
			parentSwipePanel = GetComponentInParent<NewSwipePanel.SwipePanel>();
			Initialize();
		}
		
		private void Initialize()
		{
			//m_parentInitializePotentialDragHandlers = parentSwipePanel.GetComponents<IInitializePotentialDragHandler>();
			m_parentBeginDragHandlers = new[]
			{
				transform.parent.GetComponentInParent<IBeginDragHandler>()
			};
			m_parentDragHandlers = new[]
			{
				transform.parent.GetComponentInParent<IDragHandler>()
			};
			m_parentEndDragHandlers = new[]
			{
				transform.parent.GetComponentInParent<IEndDragHandler>()
			};
		}

		//public override void OnInitializePotentialDrag(PointerEventData eventData)
		//{
		//	for (int i = 0; i < m_parentInitializePotentialDragHandlers.Length; ++i)
		//	{
		//		m_parentInitializePotentialDragHandlers[i].OnInitializePotentialDrag(eventData);
		//	}

		//	base.OnInitializePotentialDrag(eventData);
		//}

		public override void OnBeginDrag(PointerEventData eventData)
		{
			m_routeToParent = (!horizontal && Mathf.Abs(eventData.delta.x) > Mathf.Abs(eventData.delta.y)) ||
			                  (!vertical && Mathf.Abs(eventData.delta.x) < Mathf.Abs(eventData.delta.y));

			if (m_routeToParent)
			{
				for (int i = 0; i < m_parentBeginDragHandlers.Length; ++i)
				{
					m_parentBeginDragHandlers[i].OnBeginDrag(eventData);
				}
			}
			else
			{
				base.OnBeginDrag(eventData);
			}
		}

		public override void OnDrag(PointerEventData eventData)
		{
			if (m_routeToParent)
			{
				for (int i = 0; i < m_parentDragHandlers.Length; ++i)
				{
					m_parentDragHandlers[i].OnDrag(eventData);
				}
			}
			else
			{
				base.OnDrag(eventData);
			}
		}

		public override void OnEndDrag(PointerEventData eventData)
		{
			if (m_routeToParent)
			{
				for (int i = 0; i < m_parentEndDragHandlers.Length; ++i)
				{
					m_parentEndDragHandlers[i].OnEndDrag(eventData);
				}
			}
			else
			{
				base.OnEndDrag(eventData);
			}

			m_routeToParent = false;
		}
		
        public static NestedScrollRect ReplaceScrollRect( ScrollRect target )
        {
            RectTransform content = target.content;
            RectTransform viewport = target.viewport;
            float elasticity = target.elasticity;
            Scrollbar horizontalScrollbar = target.horizontalScrollbar;
            Scrollbar verticalScrollbar = target.verticalScrollbar;
            bool horizontal = target.horizontal;
            bool vertical = target.vertical;
            MovementType movementType = target.movementType;
            bool inertia = target.inertia;
            float decelerationRate = target.decelerationRate;
            float scrollSensitivity = target.scrollSensitivity;

            GameObject targetGameObject = target.gameObject;
            DestroyImmediate( target );
            NestedScrollRect nesterScroll = targetGameObject.AddComponent<NestedScrollRect>();

            nesterScroll.content = content;
            nesterScroll.viewport = viewport;
            nesterScroll.elasticity = elasticity;
            nesterScroll.horizontalScrollbar = horizontalScrollbar;
            nesterScroll.verticalScrollbar = verticalScrollbar;
            nesterScroll.horizontal = horizontal;
            nesterScroll.vertical = vertical;
            nesterScroll.movementType = movementType;
            nesterScroll.inertia = inertia;
            nesterScroll.decelerationRate = decelerationRate;
            nesterScroll.scrollSensitivity = scrollSensitivity;

            return nesterScroll;
        }
    }
}
