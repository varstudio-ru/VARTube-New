using UnityEditor;
using UnityEditor.Build;
using UnityEditor.Build.Reporting;
using UnityEngine;

public class BuildInfoProcessor : IPreprocessBuildWithReport
{
    public const string RESOURCE_FOLDER = "Assets/Resources/";
    public const string BUILD_INFO_SO_NAME = "Info/BuildInfo.asset";

    public int callbackOrder => 1;

    public void OnPreprocessBuild(BuildReport report)
    {
        string build = "";
        switch (report.summary.platform)
        {
            case BuildTarget.StandaloneWindows64:
            case BuildTarget.StandaloneLinux64:
            case BuildTarget.StandaloneWindows:
            case BuildTarget.StandaloneOSX:
                PlayerSettings.macOS.buildNumber = IncrementBuildNumber(PlayerSettings.macOS.buildNumber);
                build = PlayerSettings.macOS.buildNumber;
                break;

            case BuildTarget.iOS:
                PlayerSettings.iOS.buildNumber = IncrementBuildNumber(PlayerSettings.iOS.buildNumber);
                build = PlayerSettings.iOS.buildNumber;
                break;

            case BuildTarget.Android:
                PlayerSettings.Android.bundleVersionCode++;
                build = PlayerSettings.Android.bundleVersionCode.ToString();
                break;
        }

        BuildInfo buildScriptableObject = ScriptableObject.CreateInstance<BuildInfo>();
        buildScriptableObject.Init(PlayerSettings.bundleVersion, build);

        AssetDatabase.DeleteAsset(RESOURCE_FOLDER + BUILD_INFO_SO_NAME);
        AssetDatabase.CreateAsset(buildScriptableObject, RESOURCE_FOLDER + BUILD_INFO_SO_NAME);
        AssetDatabase.SaveAssets();
    }

    private string IncrementBuildNumber(string buildNumber)
    {
        int.TryParse(buildNumber, out int outputBuildNumber);

        return (outputBuildNumber + 1).ToString();
    }
}