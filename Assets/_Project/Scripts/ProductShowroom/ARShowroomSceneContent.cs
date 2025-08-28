using Cysharp.Threading.Tasks;
using UnityEngine;
using VARTube.Network.Models;
using VARTube.ProductBuilder.Design.Composite;
using VARTube.Showroom;

namespace VARTube.Input
{
    public class ARShowroomShowroomSceneContent : MonoBehaviour, IShowroomSceneContent
    {
        [SerializeField] private ARShowroom _arShowroom;

        public async UniTask Run(Variant variant = null, Product[] products = null, int? targetGraphicsTier = null)
        {
            await _arShowroom.Run( variant, products, targetGraphicsTier );
        }
    }
}