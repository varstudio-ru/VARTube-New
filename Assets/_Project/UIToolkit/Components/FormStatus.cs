using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace VARTube.UI.Components
{
    [UxmlElement("FormStatus")]
    public partial class FormStatus : VisualElement
    {
        public enum VariantType { Default, Error }

        private VariantType _variant = VariantType.Error;

        [UxmlAttribute]
        public VariantType variant
        {
            get => _variant;
            set
            {
                _variant = value;
                ApplyVariantClasses();
            }
        }
        [UxmlAttribute] public string title { get => _titleLabel.text; set => _titleLabel.text = value; }
        [UxmlAttribute] public string text { get => _textLabel.text; set => _textLabel.text = value; }

        private Label _titleLabel = new Label("Title");
        private Label _textLabel = new Label("Description");

        public FormStatus()
        {
            ApplyVariantClasses();
            ApplyLabelsClasses();
        }

        public void SetVisible(bool visible)
        {
            style.display = visible ? DisplayStyle.Flex : DisplayStyle.None;
        }

        private void ApplyVariantClasses()
        {
            ClearClassList();
            var common = new[]
            {
                "p-4", "rounded-lg",
                "transition", "transition-duration-200",
                "text-left","text-red-550", "text-sm"
            };
            foreach (var c in common)
                AddToClassList(c);

            switch (variant)
            {
                case VariantType.Error:
                    AddToClassList("bg-red-80");
                    break;

                case VariantType.Default:
                    AddToClassList("bg-gray");
                    break;
            }
        }

        private void ApplyLabelsClasses()
        {
            _titleLabel.ClearClassList();
            _titleLabel.AddToClassList("font-semibold");
            hierarchy.Add(_titleLabel);

            _textLabel.ClearClassList();
            _textLabel.AddToClassList("text-xs");
            _textLabel.AddToClassList("font-regular");
            hierarchy.Add(_textLabel);
        }

    }
}
