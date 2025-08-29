//using UnityEngine.UIElements;

//public sealed class LoginScreen : IScreen
//{
//    public VisualElement Root { get; }
//    readonly LoginForm _view;
//    readonly ILoginController _ctrl;
//    readonly IAuthService _auth;

//    public LoginScreen(IAuthService auth)
//    {
//        _auth = auth;
//        Root = new VisualElement { name = "LoginScreen" };

//        _view = new LoginForm();                
//        _ctrl = new LoginControllerImpl(_auth);  
//        Root.Add(_view);

//        _view.EmailChanged += _ctrl.SetEmail;
//        _view.PasswordChanged += _ctrl.SetPassword;
//        _view.SubmitClicked += _ctrl.Submit;

//        _ctrl.StateChanged += _view.ApplyState;
//        _view.ApplyState(_ctrl.State);
//    }

//    public void OnEnter(object args = null) { }
//    public void OnExit()
//    {
//        _ctrl.StateChanged -= _view.ApplyState;
//    }
//}
