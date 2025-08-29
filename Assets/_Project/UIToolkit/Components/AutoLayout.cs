using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UIElements;

namespace VARTube.UI.Components
{
    [UxmlElement("AutoLayout")]
    public partial class AutoLayout : VisualElement
    {
        public enum LayoutMode { Vertical, Horizontal, Grid }

        [UxmlAttribute] public LayoutMode mode
        {
            get => _mode;
            set { _mode = value; ApplyContainerClasses(); RefreshChildrenMargins(); }
        }

        [UxmlAttribute] public int gap
        {
            get => _gap;
            set { _gap = value; RefreshChildrenMargins(); }
        }

        [UxmlAttribute] public int gridColumns
        {
            get => _gridColumns;
            set { _gridColumns = Mathf.Max(1, value); ApplyContainerClasses(); }
        }

        [UxmlAttribute] public bool wrap
        {
            get => _wrap;
            set { _wrap = value; ApplyContainerClasses(); }
        }

        private LayoutMode _mode = LayoutMode.Vertical;
        private int _gap = 6;
        private int _gridColumns = 1;
        private bool _wrap = false;
        private readonly Dictionary<VisualElement, List<string>> _lastChildMargins = new();


        public AutoLayout()
        {
            AddClasses("w-full");

            // Следим за изменениями дочерних элементов
            RegisterCallback<AttachToPanelEvent>(_ =>
            {
                ApplyContainerClasses();
                RefreshChildrenMargins();
            });
            RegisterCallback<GeometryChangedEvent>(_ => RefreshChildrenMargins());
        }


        void ApplyContainerClasses()
        {
            RemoveFromClassList("flex");
            RemoveFromClassList("flex-col");
            RemoveFromClassList("flex-row");
            RemoveFromClassList("flex-wrap");
            RemoveFromClassList("grid");

            switch (mode)
            {
                case LayoutMode.Vertical:
                    AddClasses("flex", "flex-col");
                    break;

                case LayoutMode.Horizontal:
                    AddClasses("flex", "flex-row");
                    EnableInClassList("flex-wrap", wrap);
                    break;

                case LayoutMode.Grid:
                    AddClasses("grid");
                    foreach (var c in GetClasses())
                        if (c.StartsWith("grid-cols-"))
                            RemoveFromClassList(c);
                    AddToClassList($"grid-cols-{Mathf.Max(1, gridColumns)}");
                    break;
            }
        }

        void RefreshChildrenMargins()
        {
            if (panel == null) return;

            // Поддерживаемая сетка gap'ов — см. ниже Supported
            string token = GapToken(gap); // например "6"

            var kids = this.Children().ToList();
            int count = kids.Count;

            for (int i = 0; i < count; i++)
            {
                var child = kids[i];
                if (child.ClassListContains("no-auto-gap")) continue;

                if (_lastChildMargins.TryGetValue(child, out var prevList))
                {
                    foreach (var prev in prevList) child.RemoveFromClassList(prev);
                    prevList.Clear();
                }
                else prevList = new List<string>(2);

                // Vertical  -> у всех, кроме первого:  mt-{gap}
                // Horizontal-> у всех, кроме первого:  ml-{gap}
                // Grid      -> у всех, кто не в первой строке: mt-{gap};
                //              у всех, кто не в первом столбце: ml-{gap}
                switch (mode)
                {
                    case LayoutMode.Vertical:
                        if (i > 0) prevList.Add($"mt-{token}");
                        if (i < count-1) prevList.Add($"mb-{token}");
                        break;

                    case LayoutMode.Horizontal:
                        if (i > 0) prevList.Add($"ml-{token}");
                        if (i < count - 1) prevList.Add($"mr-{token}");
                        break;

                    case LayoutMode.Grid:
                        int col = i % Mathf.Max(1, gridColumns);
                        int row = i / Mathf.Max(1, gridColumns);
                        if (col > 0) prevList.Add($"ml-{token}");
                        if (row > 0) prevList.Add($"mt-{token}");
                        if (col < gridColumns - 1) prevList.Add($"mr-{token}");
                        if (row < count / gridColumns) prevList.Add($"mb-{token}");
                        break;
                }

                foreach (var nc in prevList) child.AddToClassList(nc);
                _lastChildMargins[child] = prevList;
            }
        }

        static readonly int[] Supported = { 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32 };

        static string GapToken(int g)
        {
            int best = Supported[0];
            int bestDiff = Mathf.Abs(g - best);
            for (int i = 1; i < Supported.Length; i++)
            {
                int diff = Mathf.Abs(g - Supported[i]);
                if (diff < bestDiff) { best = Supported[i]; bestDiff = diff; }
            }
            return best.ToString();
        }

        void AddClasses(params string[] classes)
        {
            foreach (var c in classes) AddToClassList(c);
        }
    }
}
