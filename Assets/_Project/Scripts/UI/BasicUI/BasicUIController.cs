using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using VARTube.Network.Models;
using VARTube.ProductBuilder.Design.Composite;

namespace VARTube.UI.BasicUI
{
    public class BasicUIController : MonoBehaviour
    {
        [SerializeField] private RectTransform _canvas;
        [SerializeField] private InfoDialog _infoDialogPrefab;
        [SerializeField] private YesNoDialog _yesNoDialogPrefab;
        [SerializeField] private SaveVariantDialog _saveVariantDialogPrefab;
        [SerializeField] private GameObject _progressOverlayPrefab;
        [SerializeField] private Button _blockerPrefab;

        private readonly List<SimpleDialog> _openedDialogs = new();

        private Button _currentBlocker;

        private GameObject _currentProgressOverlay;

        private void AddBlocker()
        {
            if(_currentBlocker != null)
                return;
            _currentBlocker = Instantiate(_blockerPrefab, _canvas);
            _currentBlocker.onClick.AddListener(() =>
            {
                foreach(SimpleDialog dialog in _openedDialogs.ToArray())
                    dialog.Hide();
            } );
        }

        private void RemoveBlocker()
        {
            if( _currentBlocker )
                Destroy(_currentBlocker.gameObject);
            _currentBlocker = null;
        }

        private void PrepareDialog(SimpleDialog dialog)
        {
            _openedDialogs.Add(dialog);
            AddBlocker();
            
            LayoutRebuilder.MarkLayoutForRebuild(dialog.GetComponent<RectTransform>());
            dialog.OnHidden.AddListener(() =>
            {
                _openedDialogs.Remove(dialog);
                RemoveBlocker();
            } );
        }

        public void ShowInfoDialog(string text, InfoType type = InfoType.REGULAR, float hideAfter = 1)
        {
            InfoDialog dialog = Instantiate(_infoDialogPrefab, _canvas);
            dialog.Show(text, type, hideAfter);
            PrepareDialog( dialog );
        }

        public void ShowYesNoDialog(string text, Action yesAction, Action noAction = null)
        {
            YesNoDialog dialog = Instantiate(_yesNoDialogPrefab, _canvas);
            dialog.Show(text, yesAction, noAction);
            PrepareDialog(dialog);
        }

        public void ShowSaveVariantDialog(string projectGuid, string calculationGuid, Product[] products, Product selectedProduct, string existingProject, JObject existingBlueprint, Action startSaveAction, Action<Variant> saveSuccess, Action saveError)
        {
            SaveVariantDialog dialog = Instantiate(_saveVariantDialogPrefab, _canvas);
            dialog.Show(projectGuid, calculationGuid, products, selectedProduct, existingProject, existingBlueprint, startSaveAction, saveSuccess, saveError);
            PrepareDialog(dialog);
        }

        public void ShowProgressOverlay( string text )
        {
            if(_currentProgressOverlay == null)
                _currentProgressOverlay = Instantiate(_progressOverlayPrefab, _canvas);
            _currentProgressOverlay.GetComponentInChildren<TMP_Text>().text = text;
        }

        public void HideProgressOverlay()
        {
            if( _currentProgressOverlay )
                Destroy(_currentProgressOverlay);
            _currentProgressOverlay = null;
        }
    }
}