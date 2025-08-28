using UnityEngine;

public class BuildInfo : ScriptableObject
{
    [ReadOnly][SerializeField] private string _buildNumber;
    [ReadOnly][SerializeField] private string _version;

    public string BuildNumber => _buildNumber;
    public string Version => _version;


    public void Init(string version, string buildNumber)
    {
        _buildNumber = buildNumber;
        _version = version;
    }
}
