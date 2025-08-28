using UnityEngine;

public static class TransformExtensions
{
    public static void ScaleFromBottom(this Transform t, Vector3 scale)
    {
        float bottom = GetBottomY(t);
        Vector3 pos = t.position;

        t.localScale = scale;
        float newBottom = GetBottomY(t);

        if (bottom != float.MaxValue && newBottom != float.MaxValue)
            t.position = new Vector3(pos.x, pos.y + (bottom - newBottom), pos.z);
    }

    public static void ScaleFromBottom(this Transform t, float scale)
    {
        ScaleFromBottom(t, new Vector3(scale, scale, scale));
    }

    private static float GetBottomY(Transform t)
    {
        Renderer r = t.GetComponentInChildren<Renderer>();
        if (r != null) return r.bounds.min.y;

        Collider c = t.GetComponentInChildren<Collider>();
        if (c != null) return c.bounds.min.y;

        return 0;
    }
}