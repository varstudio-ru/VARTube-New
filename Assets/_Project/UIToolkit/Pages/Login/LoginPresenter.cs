using Cysharp.Threading.Tasks;
using UnityEngine;
using UnityEngine.UIElements;

public class LoginPresenter : MonoBehaviour
{
    [SerializeField] UIDocument _document;

    ILoginController _controller;
    LoginViewBinder _binder;

    private void Init()
    {
        
    }

    private void OnSubmit(string user, string pass)
    {
        UniTask.Void(async () =>
        {
            _binder.SetBusy(true);
            _binder.Username.Blur();
            _binder.Password.Blur();
#if UNITY_ANDROID && !UNITY_EDITOR
            HideKeyboard();
#endif

            var res = await _controller.SubmitAsync(user, pass);

            if (!res)
            {
                _binder.SetBusy(false);
                _binder.ShowError();
                _binder.Username.Focus();
                return;
            }

            await UniTask.Delay(1000);

            _binder.SetBusy(false);
            _binder.Clear();
            gameObject.SetActive(false);

            // router.Replace(ScreenId.Home);

        });
    }

#if UNITY_ANDROID && !UNITY_EDITOR
public static void HideKeyboard()
{
    var up = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
    var activity = up.GetStatic<AndroidJavaObject>("currentActivity");
    var imm = activity.Call<AndroidJavaObject>("getSystemService", "input_method");
    var view = activity.Call<AndroidJavaObject>("getWindow").Call<AndroidJavaObject>("getDecorView");
    var token = view.Call<AndroidJavaObject>("getWindowToken");
    imm.Call<bool>("hideSoftInputFromWindow", token, 0);
}
#endif

    private async UniTask Prepare()
    {
        _controller = new LoginController();

        if (!_document) _document = GetComponent<UIDocument>();
        var root = _document.rootVisualElement;
        _binder = new LoginViewBinder(root);

        _binder.OnSubmitRequested += OnSubmit;

        await UniTask.Delay(1000);

        _binder.Username.Focus();
        _binder.SetBusy(false);
    }

    private void Awake()
    {
        Init();
    }

    private void OnEnable()
    {
        Prepare().Forget();
    }

    private void OnDisable()
    {
        _binder.OnSubmitRequested -= OnSubmit;
    }
}
