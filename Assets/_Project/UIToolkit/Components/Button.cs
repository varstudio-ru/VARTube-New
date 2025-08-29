using UnityEngine.UIElements;

namespace VARTube.UI.Components
{
    [UxmlElement("Button")]
    public partial class Button : UnityEngine.UIElements.Button
    {
        public enum VariantType { Primary, Secondary, Tertiary }
        public enum ContentMode { TextOnly, IconOnly, IconAndText }
        public enum IconPosition { Left, Right }

        [UxmlAttribute] public VariantType variant { get; set; } = VariantType.Primary;
        [UxmlAttribute] public ContentMode contentMode { get; set; } = ContentMode.TextOnly;
        [UxmlAttribute] public IconPosition iconPosition { get; set; } = IconPosition.Left;
        // [UxmlAttribute] public new string text { get; set; } = string.Empty;
        //[UxmlAttribute] public string icon { get; set; } = string.Empty;

        //private readonly Label _label;
        //private readonly Image _iconImage;

        public Button()
        {
            RemoveFromClassList("unity-button");
            RemoveFromClassList("unity-text-element");
            RemoveFromClassList(disabledUssClassName);
            
            //_iconImage = new Image { name = "icon" };
            //_label = new Label { name = "text" };
            //hierarchy.Add(_iconImage);
            //hierarchy.Add(_label);

            ApplyVariantClasses();
            ApplyContent();
        }

        private void ApplyVariantClasses()
        {
            ClearClassList();
            var common = new[]
            {
                "px-4", "py-3", "rounded-lg",
                "transition", "transition-duration-200",
                "text-center","text-white", "text-base", "font-semibold",
            };
            foreach (var c in common)
                AddToClassList(c);

            switch (variant)
            {
                case VariantType.Primary:
                    AddToClassList("bg-gray-950");
                    AddToClassList("hover_bg-gray-900");
                    AddToClassList("disabled_bg-gray-950");
                    AddToClassList("disabled_text-gray-600");
                    break;
                case VariantType.Secondary:
                    AddToClassList("bg-transparent");
                    AddToClassList("border");
                    AddToClassList("border-blue-600");
                    AddToClassList("hover_bg-blue-50");
                    AddToClassList("text-blue-600");
                    break;
                case VariantType.Tertiary:
                    AddToClassList("bg-transparent");
                    AddToClassList("text-blue-600");
                    AddToClassList("hover_bg-blue-50");
                    break;
            }
        }

        private void ApplyContent()
        {
            //if (!string.IsNullOrEmpty(icon))
            //{
            //    var tex = Resources.Load<Texture2D>(icon);
            //    if (tex != null)
            //        _iconImage.image = tex;
            //    else
            //        Debug.LogWarning($"Button: не удалось загрузить «{icon}.png» из Resources");
            //}
            //else
            //{
            //    _iconImage.visible = false;
            //}

            //if (!string.IsNullOrEmpty(text))
            //    _label.text = text;
            //else
            //    _label.visible = false;
        }
    }
}
