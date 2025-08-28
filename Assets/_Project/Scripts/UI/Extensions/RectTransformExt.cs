using System.Collections.Generic;
using Cysharp.Threading.Tasks;
using UnityEngine;
using UnityEngine.UI;
namespace VARTube.UI.Extensions
{
    public static class RectTransformExt
    {
        private static List<RectTransform> GetChildrenForLayoutUpdate( Transform parent )
        {
            List<RectTransform> result = new();
            foreach( Transform child in parent )
            {
                if( !child.gameObject.activeInHierarchy )
                    continue;
                if( child.GetComponent<LayoutGroup>() || child.GetComponent<ContentSizeFitter>() )
                    result.Add( child.GetComponent<RectTransform>() );
                result.AddRange( GetChildrenForLayoutUpdate( child ) );
            }
            return result;
        }

        public static async UniTask UpdateLayout( this RectTransform targetRect )
        {
            while(CanvasUpdateRegistry.IsRebuildingLayout())
                await UniTask.NextFrame();
            List<RectTransform> forUpdate = GetChildrenForLayoutUpdate( targetRect );
            forUpdate.Reverse();
            foreach(RectTransform child in forUpdate)
                LayoutRebuilder.ForceRebuildLayoutImmediate( child );
            await UniTask.NextFrame();
            LayoutRebuilder.ForceRebuildLayoutImmediate( targetRect );
        }
    }
}