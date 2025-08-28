using Cysharp.Threading.Tasks;
using System;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using VARTube.Core.Services;
using VARTube.Data.Settings;
using VARTube.Localization;
using VARTube.UI.ScreenManager;

namespace VARTube.UI
{
    public class AuthorizationPopup : MonoBehaviour, IScreenContext
    {
        void IScreenContext.SetContext(ScreenContext context)
        {
        }
    }
}