using System;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEngine;
using UnityEngine.Events;

public class SkyboxDropdownView : MonoBehaviour
{
    [SerializeField] private TMP_Dropdown _dropdown;
    public List<SkyboxMat> _skyboxes;

    public UnityEvent<string> OnSkyboxChanged;


    private void Init()
    {
        List<TMP_Dropdown.OptionData> skyboxNames = new();
        skyboxNames.AddRange(_skyboxes.Select(c => new TMP_Dropdown.OptionData(c.Name)).ToList());
        _dropdown.options = skyboxNames;
        _dropdown.onValueChanged.AddListener(v => OnSkyboxChanged?.Invoke(_skyboxes[v].FileName));
    }

    public void SetValueWithoutNotify(string targetName)
    {
        _dropdown.SetValueWithoutNotify(_skyboxes.FindIndex(s => s.FileName == targetName));
    }

    private void Awake()
    {
        Init();
    }

    private void OnDestroy()
    {
        _dropdown.onValueChanged.RemoveAllListeners();
    }

    [Serializable]
    public class SkyboxMat
    {
        [SerializeField] private string _name;
        [SerializeField] private string _fileName;

        public string Name => _name;
        public string FileName => _fileName;
    }
}
