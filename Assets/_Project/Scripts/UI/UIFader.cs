using Cysharp.Threading.Tasks;
using DG.Tweening;
using System.Threading;
using UnityEngine;

[RequireComponent(typeof(CanvasGroup))]
public class UIFader : MonoBehaviour
{
    public float speed = 0.5f;
    CanvasGroup canvasGroup;
    CancellationTokenSource cts;

    private void Awake()
    {
        canvasGroup = GetComponent<CanvasGroup>();
    }

    bool isRequested = false;

    public async void Show()
    {
        isRequested = true;

        //if (cts == null)
        //{
        //    cts = new CancellationTokenSource();
        //}
        //else
        //{
        //    cts.Cancel();
        //    cts.Dispose();
        //    cts = null;

        //    cts = new CancellationTokenSource();
        //}

        gameObject.SetActive(true);

        if (canvasGroup == null)
        {
            canvasGroup = GetComponent<CanvasGroup>();
        }

        //canvasGroup.alpha = 1;

        //await canvasGroup.DOFade(0, speed).ToUniTask(cancellationToken: cts.Token);

        //if (cts.IsCancellationRequested)
        //{
        //    return;
        //}

        //gameObject.SetActive(false);
    }

    private void Update()
    {
        if (isRequested)
        {
            canvasGroup.alpha = 1;
            isRequested = false;
        }

        if (gameObject.activeInHierarchy)
        {
            if (canvasGroup.alpha > 0)
            {
                canvasGroup.alpha -= Time.deltaTime * speed;
                //canvasGroup.alpha = Mathf.MoveTowards(canvasGroup.alpha, 0, Time.deltaTime * speed);
            }
            else
            {
                canvasGroup.alpha = 0;
                gameObject.SetActive(false);
            }
        }
    }
}