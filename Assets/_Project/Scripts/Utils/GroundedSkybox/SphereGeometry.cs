using System.Collections.Generic;
using UnityEngine;

public static class SphereGeometry
{
    public static Mesh Create(float radius, int widthSegments, int heightSegments)
    {
        widthSegments = Mathf.Max(3, widthSegments);
        heightSegments = Mathf.Max(2, heightSegments);

        List<Vector3> vertices = new();
        List<Vector3> normals = new();
        List<int> indices = new();
        List<Vector2> uvs = new();
        List<List<int>> grid = new();
        
        int index = 0;
        
        for ( int iy = 0; iy <= heightSegments; iy++ )
        {
            List<int> verticesRow = new();

            float v = iy / (float)heightSegments;

            // special case for the poles

            float uOffset = 0;

            if ( iy == 0) 
                uOffset = 0.5f / widthSegments;
            else if ( iy == heightSegments )
                uOffset = -0.5f / widthSegments;

            for ( int ix = 0; ix <= widthSegments; ix ++ ) {

                float u = ix / (float)widthSegments;

                Vector3 vertex;

                vertex.x = radius * Mathf.Cos( u * Mathf.PI * 2 ) * Mathf.Sin( v * Mathf.PI );
                vertex.y = radius * Mathf.Cos( v * Mathf.PI );
                vertex.z = radius * Mathf.Sin( u * Mathf.PI * 2 ) * Mathf.Sin( v * Mathf.PI );

                vertices.Add( vertex );
                normals.Add( vertex.normalized );
                uvs.Add( new Vector2( -u + uOffset, 1 - v ) );

                verticesRow.Add( index++ );

            }

            grid.Add( verticesRow );

        }
         
        for ( int iy = 0; iy < heightSegments; iy ++ ) {

            for ( int ix = 0; ix < widthSegments; ix ++ ) {

                int a = grid[ iy ][ ix + 1 ];
                int b = grid[ iy ][ ix ];
                int c = grid[ iy + 1 ][ ix ];
                int d = grid[ iy + 1 ][ ix + 1 ];

                if(iy != 0)
                {
                    indices.Add( a );
                    indices.Add( b );
                    indices.Add( d );
                }
                if(iy != heightSegments - 1)
                {
                    indices.Add( b );
                    indices.Add( c );
                    indices.Add( d );
                }
            }
        }
        Mesh result = new()
        {
            vertices = vertices.ToArray(),
            normals = normals.ToArray(),
            triangles = indices.ToArray(),
            uv = uvs.ToArray()
        };
        return result;
    }
}