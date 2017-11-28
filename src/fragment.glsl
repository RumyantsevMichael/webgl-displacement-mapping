varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;

struct PointLight
{
    vec3 color;
    vec3 position;
    float decay;
    float distance;
};

uniform vec2 resolution;
uniform sampler2D sand;
uniform sampler2D rocks;
uniform sampler2D sandD;
uniform sampler2D displacementMap;
uniform sampler2D normalMap;
uniform PointLight pointLights[NUM_POINT_LIGHTS];

float brightness(vec4 texture)
{
    return (0.2126 * texture.r + 0.7152 * texture.g + 0.0722 * texture.b);
}

vec3 blend(vec4 tex1, vec4 disp1, float a1, vec4 tex2, vec4 disp2, float a2)
{
    float depth = 0.2;
    float brightness1 = brightness(tex1);
    float brightness2 = brightness(tex2);
    float ma = max(brightness1 + a1, brightness2 + a2) - depth;
    float b1 = max(brightness1 + a1 - ma, 0.0);
    float b2 = max(brightness2 + a2 - ma, 0.0);

    return (tex1.rgb * b1 + tex2.rgb * b2) / (b1 + b2);
    // return tex1.rgb * a1 + tex2.rgb * a2;
}

void main( void )
{
    vec4 sandVec = texture2D(sand, vUv);
    vec4 rocksVec = texture2D(rocks, vUv);
    vec4 sandDVec = texture2D(sandD, vUv);
    vec4 rocksDVect = texture2D(displacementMap, vUv);
    vec3 diffuse = blend(sandVec, sandDVec, vUv.y, rocksVec, rocksDVect, 1.0 - vUv.y);
    vec4 lights = vec4(0.1, 0.1, 0.1, 1.0);

    for (int l = 0; l < NUM_POINT_LIGHTS; l++)
    {
        PointLight light = pointLights[l];
        vec3 lightDirection = normalize(vPos - light.position);
        lights.rgb += clamp(dot(-lightDirection, vNormal), 0.0, 1.0) * light.color;
    }

    gl_FragColor = vec4(diffuse, 1.0) * lights;
}
