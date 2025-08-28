using Cysharp.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace VARTube.Utils
{
    public class SceneManagement
    {
        private static List<string> availableScenes = new();

        static SceneManagement()
        {
            for(int i = 0; i < SceneManager.sceneCountInBuildSettings; i++)
            {
                string scenePath = SceneUtility.GetScenePathByBuildIndex(i);
                availableScenes.Add(Path.GetFileNameWithoutExtension(scenePath));
            }
        }
        
        public ISceneContent GetSceneContent(Scene scene)
        {
            ValidateScene(scene);

            GameObject go = scene.GetRootGameObjects().FirstOrDefault(x => x.GetComponent<ISceneContent>() != null);
            if (go) { return go.GetComponent<ISceneContent>(); }
            throw new Exception($"ISceneContent is not found on scene {scene.name}");
        }

        public ISceneContent GetSceneContent(string sceneName)
        {
            var scene = SceneManager.GetSceneByName(sceneName);
            return GetSceneContent(scene);
        }

        public void SetActiveScene(string name)
        {
            var scene = SceneManager.GetSceneByName(name);
            ValidateScene(scene);
            SceneManager.SetActiveScene(scene);
        }

        public Scene GetActiveScene()
        {
            return SceneManager.GetActiveScene();
        }

        public async UniTask<Scene> LoadAsync(string sceneName, LoadSceneMode mode = LoadSceneMode.Additive, bool setActive = true)
        {
            string tabletSceneName = sceneName + "Tablet";
            string targetSceneName = sceneName;
            if(Device.GetDeviceType() == Device.Type.TABLET)
            {
                if(availableScenes.Contains(tabletSceneName))
                    targetSceneName = tabletSceneName;
            }
            Scene scene = SceneManager.GetSceneByName(targetSceneName);
            if(!scene.isLoaded)
            {
                AsyncOperation sceneLoadOperation = SceneManager.LoadSceneAsync(targetSceneName, mode);
                if(sceneLoadOperation == null)
                {
                    targetSceneName = sceneName;
                    sceneLoadOperation = SceneManager.LoadSceneAsync(targetSceneName, mode);
                }
                await sceneLoadOperation.ToUniTask();
                scene = SceneManager.GetSceneByName(targetSceneName);
            }

            if (setActive)
            {
                SceneManager.SetActiveScene(scene);
            }

            return scene;
        }

        public async UniTask UnloadAsync(Scene scene, int delay = 0)
        {
            ValidateScene(scene);

            await UniTask.Delay(delay);
            await SceneManager.UnloadSceneAsync(scene).ToUniTask();
        }

        public async UniTask UnloadAsync(string sceneName, int delay = 0)
        {
            var scene = SceneManager.GetSceneByName(sceneName);
            await UnloadAsync(scene, delay);
        }

        private void ValidateScene(Scene scene)
        {
            if (!(scene.IsValid() && scene.isLoaded))
            {
                throw new Exception($"Scene {scene.name} is not valid/loaded");
            }
        }
    }
}