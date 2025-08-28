using System.Linq;
using System.Threading;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
using VARTube.Core.Entity;
using VARTube.Core.Services;
using VARTube.Interaction;
using VARTube.Network;
using VARTube.Network.Models;
using VARTube.ProductBuilder;

namespace VARTube.UI.Interaction
{
    [RequireComponent(typeof(Button))]
    public class FileInputViewItem : MonoBehaviour
    {
        [SerializeField]
        private TMP_Text _label;
        [SerializeField]
        private GameObject _outline;
        [SerializeField]
        private RawImage _icon;
        [SerializeField]
        private Texture2D _folderIcon;
        [SerializeField]
        private Texture2D _itemIcon;
        [SerializeField]
        private Texture2D _sceneIcon;

        private CancellationTokenSource _cancellationSource = new();

        public UnityEvent OnClick => GetComponent<Button>().onClick;

        public void Setup(string labelText, Texture2D icon = null)
        {
            Deselect();

            _label.text = labelText;

            if( icon != null )
                _icon.texture = icon;
        }

        public async void Setup(WorkplaceStructure workplaceStructure)
        {
            Deselect();

            _label.text = workplaceStructure.Name;
            if (!string.IsNullOrEmpty(workplaceStructure.iconPath) && workplaceStructure.iconPath.Split(".").Last().Length == 3)//Очень тупая проверка на наличие png или jpg в конце ссылки
                LoadIconDirectURL(workplaceStructure.iconPath, _cancellationSource.Token);
            else
            {
                if( workplaceStructure.IsDirectory) 
                    _icon.texture = _folderIcon;
                else
                {
                    NetworkService networkService = ApplicationServices.GetService<NetworkService>();
                    Calculation calculation = await networkService.GetCalculationStat(workplaceStructure.baseCalculationGuid);
                    if(calculation.idCalculationType == CalculationType.PROJECT)
                    {
                        _icon.texture = _itemIcon;
                    }
                    else if( calculation.idCalculationType == CalculationType.SCENE )
                    {
                        _icon.texture = _sceneIcon;
                    }
                }
            }
        }

        public void Setup(Calculation calculation)
        {
            Deselect();

            _label.text = calculation.Name;
            
            LoadIcon(calculation.guid, _cancellationSource.Token);
        }

        public async void Setup(EntityPath productPath, InputFileValue fileData)
        {
            Deselect();

            _label.text = fileData.Name;
            if(string.IsNullOrEmpty(fileData.Icon) && fileData.Value.StartsWith("s123mat://"))
            {
                EntityPath materialPath = new(fileData.Value);
                //EntityContainer<MaterialEntity> container = new(materialPath);
                //MaterialEntity material = await container.Get(_cancellationSource.Token);
                //material.Path = materialPath;
                //LoadIcon(material.Diffuse, _cancellationSource.Token);
            }
            else
            {
                LoadIcon(productPath, fileData.Icon, _cancellationSource.Token);
            }
        }

        public void Select()
        {
            if ( _outline != null )
                _outline.SetActive(true);
        }

        public void Deselect()
        {
            if ( _outline != null )
                _outline.SetActive(false);
        }

        private void LoadIconDirectURL(string url, CancellationToken cToken)
        {
            EntityPath path = new(url);
            LoadIcon(path, cToken);
        }

        private void LoadIcon(string calculationGuid, CancellationToken cToken)
        {
            EntityPath path = new($"s123://calculationResults/{calculationGuid}/main_icon.jpg");
            LoadIcon(path, cToken);
        }

        private void LoadIcon(EntityPath productPath, string iconPath, CancellationToken cToken)
        {
            EntityPath path = new(iconPath, productPath);
            LoadIcon(path, cToken);
        }

        private async void LoadIcon(EntityPath path, CancellationToken cToken)
        {
            if(!string.IsNullOrEmpty(path.SplittedURL))
            {
                EntityContainer<TextureEntity> container = new(path);
                TextureEntity entity = await container.Get(cToken: cToken);
                if(entity != null)
                {
                    Texture2D targetTexture = await entity.Get(cToken: cToken);
                    _icon.texture = targetTexture;
                }
            }
        }

        private void OnDestroy()
        {
            _cancellationSource.Cancel();
        }
    }
}