using Cysharp.Threading.Tasks;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using VARTube.Core.Services;
using VARTube.UI;

//TODO: replace with Alert window
public class CompanyListPopup : MonoBehaviour
{
    private AuthorizationStateService _authorizationState;

    [SerializeField] private Button _buttonPrefab;
    [SerializeField] private RectTransform _buttonsParent;

    private List<Button> _buttons = new List<Button>();

    private IUIElement _UIElement;

    private void Awake()
    {
        _UIElement = GetComponent<IUIElement>();
    }

    private void Start()
    {
        UniTask.Void(async () =>
        {
            _authorizationState = ApplicationServices.GetService<AuthorizationStateService>();
            await UniTask.WaitUntil(() => _authorizationState.User.IsAuthorized);
            CreateButtons();
        });
    }

    void CreateButtons()
    {
        for (int i = 0; i < _authorizationState.User.Companies.Length; i++)
        {
            var button = Instantiate(_buttonPrefab, _buttonsParent);
            button.GetComponentInChildren<TMP_Text>().text = _authorizationState.User.Companies[i].Name;

            var index = i;
            button.onClick.AddListener(() =>
            {
                _authorizationState?.SetCompanyByIndex(index);
                _UIElement.Hide();
            });

            button.gameObject.SetActive(true);

            _buttons.Add(button);
        }
    }
}
