using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.Events;

public enum Axis
{
    X,
    Y,
    Z
}

public class SizeCube : MonoBehaviour
{
    public float Thickness = 0.1f;
    public float Mult = 1;
    public float SizeTextMult = 1;
    public Vector3 SizeOffset;

    public string SizeTextFormat = "0";

    public Vector3 MinSize = new Vector3( 0.01f, 0.01f, 0.01f );
    public Vector3 MaxSize = new Vector3( 10, 10, 10 );

    public TextMeshPro[] SizeTextX;
    public TextMeshPro[] SizeTextY;
    public TextMeshPro[] SizeTextZ;
    public List<Transform> WidthObjects;
    public List<Transform> HeightObjects;
    public List<Transform> DepthObjects;
    
    private Transform target;

    private Vector3 size;

    public UnityEvent OnSizeChanged;

    private bool lock_size;

    private Vector3 drag_start_point;
    private Vector3 drag_start_position;
    private Vector3 drag_start_normal;
    private Axis drag_start_axis;
    private float axis_start_size;

    public Vector3 Size 
    {
        get => size;
        set
        {
            value.x = Mathf.Clamp( value.x, MinSize.x, MaxSize.x );
            value.y = Mathf.Clamp( value.y, MinSize.y, MaxSize.y );
            value.z = Mathf.Clamp( value.z, MinSize.z, MaxSize.z );
            size = value;

            Vector3 half_size = size / 2.0f;

            foreach( Transform t in WidthObjects )
            {
                t.localScale = new Vector3( Thickness, size.x * Mult, Thickness );
            }

            WidthObjects[0].localPosition = new Vector3( 0, -half_size.y, -half_size.z );
            WidthObjects[1].localPosition = new Vector3( 0, -half_size.y, half_size.z );
            WidthObjects[2].localPosition = new Vector3( 0, half_size.y, half_size.z );
            WidthObjects[3].localPosition = new Vector3( 0, half_size.y, -half_size.z );

            foreach( Transform t in HeightObjects )
            {
                t.localScale = new Vector3( Thickness, size.y * Mult, Thickness );
            }

            HeightObjects[0].localPosition = new Vector3( -half_size.x, 0, -half_size.z );
            HeightObjects[1].localPosition = new Vector3( -half_size.x, 0, half_size.z );
            HeightObjects[2].localPosition = new Vector3( half_size.x , 0, half_size.z );
            HeightObjects[3].localPosition = new Vector3( half_size.x , 0, -half_size.z );

            foreach( Transform t in DepthObjects )
            {
                t.localScale = new Vector3( Thickness, size.z * Mult, Thickness );
            }

            DepthObjects[0].localPosition = new Vector3( -half_size.x, -half_size.y, 0 );
            DepthObjects[1].localPosition = new Vector3( -half_size.x,  half_size.y, 0 );
            DepthObjects[2].localPosition = new Vector3( half_size.x ,  half_size.y, 0 );
            DepthObjects[3].localPosition = new Vector3( half_size.x , -half_size.y, 0 );

            GetComponent<BoxCollider>().size = size + Vector3.one * 0.0001f;
            UpdateSizeTexts();

            OnSizeChanged?.Invoke();
        }
    }

    private float GetSize( Axis axis )
    {
        switch( axis )
        {
            case Axis.X:
                return size.x;
            case Axis.Y:
                return size.y;
            case Axis.Z:
                return size.z;
        }
        return 0;
    }

    private void Awake()
    {
        foreach( Transform t in WidthObjects )
            t.localRotation = Quaternion.Euler( 0, 0, 90 );

        foreach( Transform t in HeightObjects )
            t.localRotation = Quaternion.identity;

        foreach( Transform t in DepthObjects )
            t.localRotation = Quaternion.Euler( 0, -90, -90 );
    }

    private void UpdateSizePositions()
    {
        var self_transform = transform;
        var position = self_transform.position;
        var lossy_scale = self_transform.lossyScale;

        for (int i=0; i< SizeTextX.Length; i++)
        {
            // 1 1 -1 -1
            int sign1 = i / 2 == 1 ? -1 : 1;
            // 1 -1 1 -1
            int sign2 = (i + 1) % 2 == 1 ? -1 : 1;

            Vector3 vect1 = GetNormalFromAxis(Axis.Y) * (GetSize(Axis.Y) * lossy_scale.y) / 2.0f + GetNormalFromAxis(Axis.Y) * 0.01f;
            Vector3 vect2 = GetNormalFromAxis(Axis.Z) * (GetSize(Axis.Z) * lossy_scale.z) / 2.0f + GetNormalFromAxis(Axis.Z) * 0.01f;

            SizeTextX[i].transform.position = position + sign1 * vect1 + sign2 * vect2;
        }

        for (int i = 0; i < SizeTextY.Length; i++)
        {
            // 1 1 -1 -1
            int sign1 = i / 2 == 1 ? -1 : 1;
            // 1 -1 1 -1
            int sign2 = (i + 1) % 2 == 1 ? -1 : 1;

            Vector3 vect1 = -GetNormalFromAxis(Axis.X) * (GetSize(Axis.X) * lossy_scale.x) / 2.0f - GetNormalFromAxis(Axis.X) * 0.01f;
            Vector3 vect2 = GetNormalFromAxis(Axis.Z) * (GetSize(Axis.Z) * lossy_scale.z) / 2.0f - GetNormalFromAxis(Axis.Z) * 0.01f;

            SizeTextY[i].transform.position = position + sign1 * vect1 + sign2 * vect2;
        }

        for (int i = 0; i < SizeTextZ.Length; i++)
        {
            // 1 1 -1 -1
            int sign1 = i / 2 == 1 ? -1 : 1;
            // 1 -1 1 -1
            int sign2 = (i + 1) % 2 == 1 ? -1 : 1;

            Vector3 vect1 = GetNormalFromAxis(Axis.Y) * (GetSize(Axis.Y) * lossy_scale.y) / 2.0f + GetNormalFromAxis(Axis.Y) * 0.01f;
            Vector3 vect2 = -GetNormalFromAxis(Axis.X) * (GetSize(Axis.X) * lossy_scale.x) / 2.0f - GetNormalFromAxis(Axis.X) * 0.01f;

            SizeTextZ[i].transform.position = position + sign1 * vect1 + sign2 * vect2;
        }
    }

    private Vector3 GetNormalFromAxis(Axis a)
    {
        Vector3 ortho = Vector3.zero;
        switch (a)
        {
            case Axis.X:
                ortho = Vector3.right;
                break;
            case Axis.Y:
                ortho = Vector3.up;
                break;
            case Axis.Z:
                ortho = -Vector3.forward;
                break;
        }

        return transform.rotation * ortho;
    }

    private void UpdateSizeTexts()
    {
        UpdateSizePositions();

        
        foreach( TextMeshPro text_x in SizeTextX )
            text_x.text = ( GetSize( Axis.X ) * SizeTextMult + SizeOffset.x ).ToString( SizeTextFormat );

        foreach( TextMeshPro text_y in SizeTextY)
            text_y.text = ( GetSize( Axis.Y ) * SizeTextMult + SizeOffset.y ).ToString( SizeTextFormat );

        foreach( TextMeshPro text_z in SizeTextZ)
            text_z.text = ( GetSize( Axis.Z ) * SizeTextMult + SizeOffset.z ).ToString( SizeTextFormat );
    }
}
