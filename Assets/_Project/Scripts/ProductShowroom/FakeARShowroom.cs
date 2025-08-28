using System.Linq;
using Cysharp.Threading.Tasks;
using UnityEngine;
using VARTube.Network.Models;
using VARTube.ProductBuilder.Controller;
using VARTube.ProductBuilder.Design.Composite;

namespace VARTube.Showroom
{
    public class FakeARShowroom : ProductShowroom
    {
        [SerializeField]
        private ARCursorExtra _arCursor;
        [SerializeField]
        private GroundedSkybox _groundedSkybox;

        protected override ProductShowroomEnvironment SelfEnvironmentType => ProductShowroomEnvironment.AR;

        public override async UniTask Run(Variant variant, Product[] products = null, int? targetGraphicsTier = null)
        {
            await base.Run(variant, products, targetGraphicsTier);
            
            _productSpawner.enabled = true;
            _productSpawner.IsAdditiveMode = false;
            StartSpawningSequence( false );
        }

        protected override async void StartSpawningSequence( bool additive )
        {
            Product[] spawnedProducts = await SpawnTargetProduct(_arCursor.cursorChildObj.transform.position, additive);
            if(spawnedProducts.Length == 1)
            {
                _arCursor.TargetConnectionType = spawnedProducts.FirstOrDefault().ConnectionType;
                if( _arCursor.TargetConnectionType == ConnectionType.FLOOR )
                    _basicUI.ShowInfoDialog("Разместите изделие на полу");
                else if( _arCursor.TargetConnectionType == ConnectionType.WALL )
                    _basicUI.ShowInfoDialog("Разместите изделие на стене");
                else if( _arCursor.TargetConnectionType == ConnectionType.CEILING )
                    _basicUI.ShowInfoDialog("Разместите изделие на потолке");
            }
            else
                _arCursor.TargetConnectionType = ConnectionType.FLOOR;
            
            _arCursor.ResetRotation();
            
            foreach( Product product in spawnedProducts )
                product.Controller.transform.SetParent(_arCursor.cursorChildObj.transform, true);
            
            _arCursor.ShowCursor();
            
            _paramsPanel.gameObject.SetActive(false);
        }

        public override void FinishSpawningSequence(bool additive, Vector2 screenPosition)
        {
            foreach(Product product in FindObjectsByType<ProductController>(FindObjectsInactive.Include, FindObjectsSortMode.None)
                                        .Where(controller => controller.transform.parent != null && controller.transform.parent.GetComponentInParent<ProductController>() == null)
                                        .Select(controller => controller.Product))
            {
                product.Controller.transform.SetParent(null, true);
            }
            _arCursor.HideCursor();
            _productSpawner.enabled = false;
        }

        public override async UniTask<Product[]> SpawnTargetProduct(Vector3 spawnPoint, bool additive)
        {
            Product[] spawnedProducts = await base.SpawnTargetProduct(spawnPoint, additive);
            if(spawnedProducts == null)
                return null;
            
            await UniTask.NextFrame();

            Bounds globalBounds = spawnedProducts
                                  .Select(product => product.GetBounds())
                                  .Aggregate((b1, b2) => { b1.Encapsulate(b2); return b1; });
                                  
            foreach(Product product in spawnedProducts)
                product.Root.Translate( -globalBounds.center + Vector3.up * globalBounds.size.y / 2.0f + spawnPoint, Space.World );

            Transform tempTransform = new GameObject().transform;
            tempTransform.position = spawnPoint;

            foreach(Product product in spawnedProducts)
                product.Controller.transform.SetParent(tempTransform, true);
            
            tempTransform.LookAt(Camera.main.transform.position.SetY(tempTransform.position.y));
            
            foreach(Product product in spawnedProducts)
                product.Controller.transform.SetParent(null, true);
            
            Destroy(tempTransform.gameObject);

            if(!additive)
            {
                _skyboxController.SetSceneRotation(spawnedProducts.First().Controller.transform.eulerAngles.y);
                _groundedSkybox.SetPosition(spawnedProducts.First().Controller.transform.position);
            }
            
            return spawnedProducts;
        }

        private void ProductsCountChanged(int count)
        {
            UniTask.Void(async () => {
                await UniTask.WaitUntil(() => _paramsPanel != null);

                if (ProductController.Active.Count == 1)
                {
                    _paramsPanel.gameObject.SetActive(true);
                    _paramsPanel.Setup(ProductController.Active.First().Product);
                }
            });
        }

        private void OnEnable()
        {
            ProductController.OnActiveCountChanged += ProductsCountChanged;
        }

        private void OnDisable()
        {
            ProductController.OnActiveCountChanged -= ProductsCountChanged;
        }
    }
}
