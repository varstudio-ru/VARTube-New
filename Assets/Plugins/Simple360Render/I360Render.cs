using System;
using UnityEngine;

public enum CaptureType
{
	JPG,
	PNG,
	EXR,
	TGA
}

public static class I360Render
{
	private static Material equirectangularConverter = null;
	private static int paddingX;
	
	public static byte[] Capture( int width = 2048, CaptureType type = CaptureType.PNG, Camera renderCam = null, bool faceCameraDirection = true )
	{
		if( renderCam == null )
		{
			renderCam = Camera.main;
			if( renderCam == null )
			{
				Debug.LogError( "Error: no camera detected" );
				return null;
			}
		}

		Vector3 old_cam_position = renderCam.transform.position;

		RenderTexture camTarget = renderCam.targetTexture;

		if( equirectangularConverter == null )
		{
			equirectangularConverter = new Material( Shader.Find( "Hidden/I360CubemapToEquirectangular" ) );
			paddingX = Shader.PropertyToID( "_PaddingX" );
		}

		int cubemapSize = Mathf.Min( Mathf.NextPowerOfTwo( width ), 8192 );
		RenderTexture activeRT = RenderTexture.active;
		RenderTexture cubemap = null, equirectangularTexture = null;
		Texture2D output = null;
		try
		{
			cubemap = RenderTexture.GetTemporary( cubemapSize, cubemapSize, 0 );
			cubemap.dimension = UnityEngine.Rendering.TextureDimension.Cube;

			equirectangularTexture = RenderTexture.GetTemporary( cubemapSize, cubemapSize / 2, 0 );
			equirectangularTexture.dimension = UnityEngine.Rendering.TextureDimension.Tex2D;

			if( !renderCam.RenderToCubemap( cubemap, 63 ) )
			{
				Debug.LogError( "Rendering to cubemap is not supported on device/platform!" );
				return null;
			}

			equirectangularConverter.SetFloat( paddingX, faceCameraDirection ? ( renderCam.transform.eulerAngles.y / 360f ) : 0f );
			Graphics.Blit( cubemap, equirectangularTexture, equirectangularConverter );

			RenderTexture.active = equirectangularTexture;
			output = new Texture2D( equirectangularTexture.width, equirectangularTexture.height, TextureFormat.RGB24, false );
			output.ReadPixels( new Rect( 0, 0, equirectangularTexture.width, equirectangularTexture.height ), 0, 0 );

			switch( type )
			{
				case CaptureType.JPG:
					return output.EncodeToJPG();
				case CaptureType.EXR:
					return output.EncodeToEXR();
				case CaptureType.PNG:
					return output.EncodeToPNG();
				case CaptureType.TGA:
					return output.EncodeToTGA();
			}

			return null;
		}
		catch( Exception e )
		{
			Debug.LogException( e );
			return null;
		}
		finally
		{
			renderCam.transform.position = old_cam_position;
			renderCam.targetTexture = camTarget;
			RenderTexture.active = activeRT;

			if( cubemap != null )
				RenderTexture.ReleaseTemporary( cubemap );

			if( equirectangularTexture != null )
				RenderTexture.ReleaseTemporary( equirectangularTexture );

			if( output != null )
				UnityEngine.Object.DestroyImmediate( output );
		}
	}
}