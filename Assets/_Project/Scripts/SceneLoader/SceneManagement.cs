using Cysharp.Threading.Tasks;
using System;
using System.Linq;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace VARTube.Utils
{
    public interface ISceneManagement
    {
        Scene GetActiveScene();
        ISceneContent GetSceneContent(Scene scene);
        ISceneContent GetSceneContent(string sceneName);
        UniTask<Scene> LoadAsync(string sceneName, LoadSceneMode mode = LoadSceneMode.Additive, bool setActive = true);
        void SetActiveScene(string name);
        UniTask UnloadAsync(Scene scene, int delay = 0);
        UniTask UnloadAsync(string sceneName, int delay = 0);
    }

    public class SceneManagement : ISceneManagement
    {
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
            Scene scene;
            if(Device.GetDeviceType() == Device.Type.TABLET)
            {
                scene = SceneManager.GetSceneByName(sceneName + "Tablet");
                if(!scene.IsValid())
                    scene = SceneManager.GetSceneByName(sceneName);
            }
            else
            {
                scene = SceneManager.GetSceneByName(sceneName);
            }
            if (!scene.isLoaded)
            {
                string targetSceneName = sceneName;
           
                AsyncOperation sceneLoadOperation = SceneManager.LoadSceneAsync(targetSceneName, mode);
                if(sceneLoadOperation == null)
                {
                    targetSceneName = sceneName;
                    sceneLoadOperation = SceneManager.LoadSceneAsync(targetSceneName, mode);
                }
                await sceneLoadOperation.ToUniTask();
                scene = SceneManager.GetSceneByName(targetSceneName);
            }
            //else if (!scene.IsValid())
            //{
            //    Debug.LogError($"Scene {name} is not valid");
            //    return default;
            //}

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