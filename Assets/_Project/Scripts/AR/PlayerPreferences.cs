using System;
using VARTube.Utils;

namespace VARTube.Data.PlayerPreferences
{
    public class PlayerPreferences
    {
        public ARProfileLocalStorage AR;

        public PlayerPreferences()
        {
            AR = new ARProfileLocalStorage();
        }
    }

    public class ARProfileLocalStorage : BaseLocalStorage<ARProfile>
    {
        protected override string PlayerPrefsKey => "ARProfileLocalStorageKey";

        public bool VisualizeObjectSelector
        {
            get => _profile.VisualizeObjectSelector;
            set
            {
                _profile.VisualizeObjectSelector = value;
                _storage.Serialize(PlayerPrefsKey, _profile);
            }
        }

        public bool PeopleOcclusion
        {
            get => _profile.PeopleOcclusion;
            set
            {
                _profile.PeopleOcclusion = value;
                _storage.Serialize(PlayerPrefsKey, _profile);
            }
        }

        public bool VisualizePlane
        {
            get => _profile.VisualizePlane;
            set
            {
                _profile.VisualizePlane = value;
                _storage.Serialize(PlayerPrefsKey, _profile);
            }
        }

        public bool ShowDebugMenu
        {
            get => _profile.ShowDebugMenu;
            set
            {
                _profile.ShowDebugMenu = value;
                _storage.Serialize(PlayerPrefsKey, _profile);
            }
        }
    }

    [Serializable]
    public class ARProfile
    {
        public bool VisualizeObjectSelector = false;
        public bool PeopleOcclusion = false;
        public bool VisualizePlane = false;
        public bool ShowDebugMenu = false;
    }
}