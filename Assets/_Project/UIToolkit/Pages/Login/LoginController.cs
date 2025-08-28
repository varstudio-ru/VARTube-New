using Cysharp.Threading.Tasks;
using UnityEngine;
using VARTube.Core.Services;

public interface ILoginController
{
    UniTask<bool> SubmitAsync(string username, string password);
}

public class LoginController : ILoginController
{
    private AuthorizationService _authorization;

    public LoginController()
    {
        _authorization = ApplicationServices.GetService<AuthorizationService>();
    }
    public async UniTask<bool> SubmitAsync(string username, string password)
    {
        return await _authorization.LogIn(username.Trim(), password);
    }
}