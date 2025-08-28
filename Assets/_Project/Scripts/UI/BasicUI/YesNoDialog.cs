using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace VARTube.UI.BasicUI
{
    public class YesNoDialog : SimpleDialog
    {
        [SerializeField] private TMP_Text _label;
        [SerializeField] private Button _yesButton;
        [SerializeField] private Button _noButton;

        public void Show(string text, Action yesAction, Action noAction = null)
        {
            gameObject.SetActive(true);
            _label.text = text;
            _yesButton.onClick.RemoveAllListeners();
            _noButton.onClick.RemoveAllListeners();
            _yesButton.onClick.AddListener(() =>
            {
                yesAction.Invoke();
                Hide();
            });
            _noButton.onClick.AddListener(() =>
            {
                noAction?.Invoke();
                Hide();
            });
        }

        public override void Hide()
        {
            gameObject.SetActive(false);
            OnHidden.Invoke();
        }
    }
}