Shader "Custom/URP/RotateRawImage"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _Angle ("Rotation Angle (Radians)", Float) = 0
        _FlipHorizontally ("Flip Horizontally", Float) = 0
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" "Queue"="Transparent" }
        LOD 100

        Pass
        {
            Name "ForwardLit"
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };

            struct v2f
            {
                float4 pos : SV_POSITION;
                float2 uv : TEXCOORD0;
            };

            sampler2D _MainTex;
            float4 _MainTex_ST;
            float _Angle;
            float _FlipHorizontally;

            v2f vert (appdata v)
            {
                v2f o;
                o.pos = TransformObjectToHClip(v.vertex.xyz);
                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                return o;
            }

            float2 RotateUV(float2 uv, float angle)
            {
                float2 center = float2(0.5, 0.5);
                float2 delta = uv - center;
                float cosA = cos(angle);
                float sinA = sin(angle);
                float2 rotated;
                rotated.x = cosA * delta.x - sinA * delta.y;
                rotated.y = sinA * delta.x + cosA * delta.y;
                return rotated + center;
            }

            float2 FlipUV(float2 uv, float flip)
            {
                if (flip > 0.5)
                {
                    uv.x = 1.0 - uv.x;
                }
                return uv;
            }

            half4 frag (v2f i) : SV_Target
            {
                float2 rotatedUV = RotateUV(i.uv, _Angle);
                float2 flippedUV = FlipUV(rotatedUV, _FlipHorizontally);
                return tex2D(_MainTex, flippedUV);
            }
            ENDHLSL
        }
    }
}