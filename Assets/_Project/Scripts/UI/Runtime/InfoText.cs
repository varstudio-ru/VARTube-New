using System.Threading.Tasks;
using DG.Tweening;
using TMPro;
using UnityEngine;

public class InfoText : MonoBehaviour
{
    private Tween error_tween;
    private TMP_Text self;

    private void Awake()
    {
        self = GetComponent<TMP_Text>();
    }

    private string MakeColoredText( string text, Color color )
    {
        string hex = ColorUtility.ToHtmlStringRGB( color );
        return $"<color=#{hex}>{text}</color>";
    }

    public void Show( string text, Color color, bool is_permanent = false )
    {
        string target_text = MakeColoredText( text, color );
        if( !is_permanent )
        {
            ShowError( target_text );
            return;
        }

        self.text = target_text;
    }

    public void Hide()
    {
        if( self == null )
            return;
        error_tween?.Kill(true);
        self.text = "";
    }

    private void ShowError( string error )
    {
        self.text = error;
        error_tween?.Kill(true);
        error_tween = self.GetComponent<RectTransform>().DOPunchScale( Vector3.one * 0.2f, 0.5f ).OnComplete( HideError );
    }

    private async void HideError()
    {
        await Task.Delay( 1000 );
        self.text = "";
    }
}
