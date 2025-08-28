using Cysharp.Threading.Tasks;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.Localization.Settings;
using VARTube.Core.Services;

namespace VARTube.Localization
{
    //TODO: rework it; current version for demo only
    public class LocaleDropdown : MonoBehaviour
    {
        public TMP_Dropdown dropdown;
        protected LocalizationService _localization;

        void Start()
        {
            _localization = ApplicationServices.GetService<LocalizationService>();

            UniTask.Void(async () =>
            {
                await UniTask.WaitUntil(() => LocalizationSettings.InitializationOperation.IsDone);

                var options = new List<TMP_Dropdown.OptionData>();
                int selected = 0;
                for (int i = 0; i < LocalizationSettings.AvailableLocales.Locales.Count; ++i)
                {
                    var locale = LocalizationSettings.AvailableLocales.Locales[i];
                    if (LocalizationSettings.SelectedLocale == locale)
                        selected = i;
                    options.Add(new TMP_Dropdown.OptionData(locale.name));
                }
                dropdown.options = options;

                dropdown.value = selected;
                dropdown.onValueChanged.AddListener(_localization.SetLocale);
            });
        }
    }
}