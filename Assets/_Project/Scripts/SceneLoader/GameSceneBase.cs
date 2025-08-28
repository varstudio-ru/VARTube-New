using Cysharp.Threading.Tasks;
using VARTube.Network.Models;
using VARTube.ProductBuilder.Design.Composite;

public interface ISceneContent
{
    
}

public interface IShowroomSceneContent : ISceneContent
{
    UniTask Run(Variant variant = null, Product[] products = null, int? targetGraphicsTier = null);
}