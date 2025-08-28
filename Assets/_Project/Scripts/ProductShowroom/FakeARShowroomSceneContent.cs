using Cysharp.Threading.Tasks;
using UnityEngine;
using VARTube.Network.Models;
using VARTube.ProductBuilder.Design.Composite;

namespace VARTube.Showroom
{
    public class FakeARShowroomSceneContent : MonoBehaviour, IShowroomSceneContent
    {        
        [SerializeField] private FakeARShowroom _showroom;
        
        public async UniTask Run(Variant variant = null, Product[] products = null, int? targetGraphicsTier = null)
        {
            await _showroom.Run( variant, products, targetGraphicsTier );
        }
    }
}