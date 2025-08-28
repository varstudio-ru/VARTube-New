//using UnityEngine;
//using UnityEngine.UIElements;

//namespace VARTube.UI.Pages
//{
//    [UxmlElement("Login")]
//    public partial class Login : TextField
//    {
//        public enum VariantType { Primary, Secondary }
//        public enum ContentMode { TextOnly, IconOnly, IconAndText }
//        public enum IconPosition { Left, Right }

//        [UxmlAttribute] public VariantType variant { get; set; } = VariantType.Primary;
//        [UxmlAttribute] public ContentMode contentMode { get; set; } = ContentMode.TextOnly;
//        [UxmlAttribute] public IconPosition iconPosition { get; set; } = IconPosition.Left;

//        private readonly Color _cursorColor = new Color(0.6392157f, 0.6392157f, 0.6392157f, 1);//TODO uss
//        private bool _isCursorVisible = false;

//        public Login()
//        {
//            hideMobileInput = true;

//            RegisterCallbacks();
//            ApplyUnityInputClasses();
//            ApplyVariantClasses();
//            ApplyContent();
//            SetupBlinking();
//        }

//        private void SetupBlinking()
//        {
//            var _blink = schedule.Execute(() =>
//            {
//                if (_isCursorVisible)
//                {
//                    textSelection.cursorColor = new Color(_cursorColor.r, _cursorColor.g, _cursorColor.b, 0);
//                    _isCursorVisible = false;
//                }
//                else
//                {
//                    textSelection.cursorColor = new Color(_cursorColor.r, _cursorColor.g, _cursorColor.b, 1);
//                    _isCursorVisible = true;
//                }

//            }).Every(500);
//        }

//        private void RegisterCallbacks()
//        {
//            RegisterCallback<AttachToPanelEvent>(_ => RefreshState());
//            RegisterCallback<ChangeEvent<string>>(_ => RefreshState());
//        }

//        private void RefreshState()
//        {
//            PlaceholderUpdate();
//        }

//        private void PlaceholderUpdate()
//        {
//            bool shown = string.IsNullOrEmpty(text);
//            textInputBase.EnableInClassList("text-gray-300", shown);
//            textInputBase.EnableInClassList("text-gray-950", !shown);
//        }

//        private void ApplyUnityInputClasses()
//        {
//            textInputBase.ClearClassList();
//            textSelection.cursorColor = cursorColor;

//            var common = new[]
//            {
//                "px-4", "py-3",
//            };
//            foreach (var c in common)
//                textInputBase.AddToClassList(c);
//        }

//        private void ApplyVariantClasses()
//        {

//            ClearClassList();
//            var common = new[]
//            {
//                "rounded-lg",
//                "transition", "transition-duration-200",
//                "text-left","text-gray-950", "text-base", "font-regular",
//            };
//            foreach (var c in common)
//                AddToClassList(c);

//            switch (variant)
//            {
//                case VariantType.Primary:
//                    AddToClassList("bg-transparent");
//                    AddToClassList("border");
//                    AddToClassList("border-neutral-200");

//                    AddToClassList("focus_border-neutral-400");
//                    break;

//                case VariantType.Secondary:
//                    AddToClassList("bg-transparent");
//                    AddToClassList("border");
//                    AddToClassList("border-blue-600");
//                    AddToClassList("hover_bg-blue-50");
//                    AddToClassList("text-blue-600");
//                    break;
//            }
//        }

//        private void ApplyContent()
//        {
//            //if (!string.IsNullOrEmpty(icon))
//            //{
//            //    var tex = Resources.Load<Texture2D>(icon);
//            //    if (tex != null)
//            //        _iconImage.image = tex;
//            //    else
//            //        Debug.LogWarning($"Button: не удалось загрузить «{icon}.png» из Resources");
//            //}
//            //else
//            //{
//            //    _iconImage.visible = false;
//            //}

//            //if (!string.IsNullOrEmpty(text))
//            //    _label.text = text;
//            //else
//            //    _label.visible = false;
//        }
//    }
//}
