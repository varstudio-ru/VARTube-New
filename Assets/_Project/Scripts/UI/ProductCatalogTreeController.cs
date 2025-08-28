using System.Linq;
using Cysharp.Threading.Tasks;
using RailwayMuseum.UI.NewSwipePanel;
using UnityEngine;
using VARTube.Input;
using VARTube.Core.Services;
using VARTube.Network;
using VARTube.Network.Models;
using VARTube.ProductBuilder.Design.Composite;
using VARTube.Showroom;
using VARTube.UI;

public class ProductCatalogTreeController : MonoBehaviour
{
    [SerializeField]
    private ProductShowroom _showroom;
    [SerializeField]
    private CatalogView _catalog;
    [SerializeField]
    private GameObject _backButton;

    private async void Awake()
    {
        _catalog.OnBackButtonVisibilityChanged.AddListener(isVisible =>
        {
            _backButton.SetActive(isVisible);
        });
        _catalog.OnItemSelected.AddListener( guid =>
        {
            _showroom.AddProduct(guid, true);
            gameObject.SetActive(false);
        });
        NetworkService network = ApplicationServices.GetService<NetworkService>();
        AuthorizationStateService authorizationState = ApplicationServices.GetService<AuthorizationStateService>();
        WorkplaceStructure[] catalogs = await network.GetCatalog(authorizationState.Company.Id);
        _catalog.Setup(catalogs.Select(c => c.Id).ToList(), null, false);
    }
}