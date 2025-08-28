using UnityEngine;

public class GroundedSkybox : MonoBehaviour
{
    [SerializeField]
    private bool _isAr = false;
    [SerializeField]
    private Transform _parent;
    [SerializeField] private MeshRenderer _renderer;
    [Range(0, 10)]
    [SerializeField] private float _radius = 3f;
    [Range(0, 10)]
    [SerializeField] private float _height = 1.5f;

    private float _oldRadius;
    private float _oldHeight;

    public MeshRenderer Renderer => _renderer;

    public void SetHeight(float height)
    {
        _height = height;
    }

    public void SetRadius(float radius)
    {
        _radius = radius;
    }

    private void UpdateSphereData()
    {
        if (GetComponent<MeshFilter>().sharedMesh != null)
            DestroyImmediate(GetComponent<MeshFilter>().sharedMesh);
        Mesh mesh = SphereGeometry.Create(_radius, 64, 32);

        Vector3[] vertices = mesh.vertices;
        Vector3[] normals = mesh.normals;
        for (int i = 0; i < vertices.Length; i++)
        {
            Vector3 pos = vertices[i];
            if (pos.y < 0)
            {
                float y1 = -_height * 3 / 2;
                float f = pos.y < y1 ? -_height / pos.y : (1 - pos.y * pos.y / (3 * y1 * y1));
                pos *= f;
                vertices[i] = pos;
            }
            normals[i] *= -1;
        }
        mesh.SetVertices(vertices);
        mesh.SetNormals(normals);

        _oldRadius = _radius;
        _oldHeight = _height;
        GetComponent<MeshFilter>().sharedMesh = mesh;
        transform.localPosition = new Vector3(0, _height, 0);
    }
    void Start()
    {
        UpdateSphereData();
    }

    public void SetPosition(Vector3 newPosition)
    {
        Vector3 targetPosition = _parent.transform.position;
        targetPosition.x = newPosition.x;
        targetPosition.z = newPosition.z;
        _parent.transform.position = targetPosition;
    }

    private void Update()
    {
        if (_oldRadius != _radius || _oldHeight != _height)
            UpdateSphereData();
        GameObject plane = GameObject.FindWithTag("ARInfinitePlane");
        if(plane != null)
        {
            Vector3 targetPosition = _parent.transform.position;
            targetPosition.y = plane.transform.position.y;
            _parent.transform.position = targetPosition;
        }
    }
}
