using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityToolbarExtender;

[InitializeOnLoad]
public class RootSceneToolbar
{
    private const string startAlwaysFromRootKey = "editor_startAlwaysFromRootKey";
    private static bool startAlwaysFromRoot
    {
        get => PlayerPrefs.GetInt(startAlwaysFromRootKey, 0) == 1;
        set => PlayerPrefs.SetInt(startAlwaysFromRootKey, value ? 1 : 0);
    }

    static RootSceneToolbar()
    {
        ToolbarExtender.LeftToolbarGUI.Add(OnLeftToolbarGUI);
        ToolbarExtender.RightToolbarGUI.Add(OnRightToolbarGUI);
        EditorApplication.playModeStateChanged += PlayModeStateChanged;
    }
    private static void PlayModeStateChanged(PlayModeStateChange state)
    {
        if( state == PlayModeStateChange.ExitingEditMode && startAlwaysFromRoot )
            OpenScene("Root");
    }

    private static void OpenScene(string sceneName)
    {
        if(EditorSceneManager.SaveCurrentModifiedScenesIfUserWantsTo())
            EditorSceneManager.OpenScene($"Assets/_Project/_Scenes/{sceneName}.unity");
    }

    static void OnLeftToolbarGUI()
    {
        GUILayout.FlexibleSpace();

        if(GUILayout.Button(new GUIContent("MainMenu")))
        {
            OpenScene("MainMenu");
        }

        if(GUILayout.Button(new GUIContent("3D")))
        {
            OpenScene("3DShowroom");
        }

        if (GUILayout.Button(new GUIContent("3DTablet")))
        {
            OpenScene("3DShowroom");
        }

        if (GUILayout.Button(new GUIContent("AR")))
        {
            OpenScene("ARShowroom");
        }

        if (GUILayout.Button(new GUIContent("ARTablet")))
        {
            OpenScene("ARShowroom");
        }

        if (GUILayout.Button(new GUIContent("FastAR")))
        {
            OpenScene("ARShowroom");
        }

        if (GUILayout.Button(new GUIContent("FastARTablet")))
        {
            OpenScene("ARShowroom");
        }

        if (GUILayout.Button(new GUIContent("ROOT")))
        {
            OpenScene("Root");
        }
    }

    static void OnRightToolbarGUI()
    {
        startAlwaysFromRoot = GUILayout.Toggle(startAlwaysFromRoot, "StartAlwaysFromRoot");
    }
}
