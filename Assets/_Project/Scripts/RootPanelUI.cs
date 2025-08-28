using System.Linq;
using UnityEngine;

public class RootPanelUI : MonoBehaviour
{
    public GameObject _demoPanel;

    private void Update()
    {
        if (Input.touchSupported)
        {
            if (Input.touchCount == 3)
            {
                Touch res = Input.touches.FirstOrDefault(t => t.phase != TouchPhase.Began);

                if (!res.Equals(default(Touch)))
                {
                    return;
                }

                ActivateDemoPanel();
            }
            else if (Input.touchCount > 3)
            {
                Touch res = Input.touches.FirstOrDefault(t => t.phase != TouchPhase.Began);

                if (!res.Equals(default(Touch)))
                {
                    return;
                }

                //ActivateDebugPanel();
            }
        }
        else
        {
            if (Input.GetMouseButtonDown(2))
            {
                ActivateDemoPanel();
            }
            else if (Input.GetMouseButtonDown(0) && Input.GetMouseButton(1))
            {
                //ActivateDebugPanel();
            }
        }
    }

    private void ActivateDemoPanel()
    {
        var setActive = !_demoPanel.activeInHierarchy;
        _demoPanel.SetActive(setActive);
    }
}
