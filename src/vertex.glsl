varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;

uniform sampler2D displacementMap;
uniform float displacementScale;
uniform float displacementBias;
uniform sampler2D normalMap;

float brightness(vec4 texture)
{
    return (0.2126 * texture.r + 0.7152 * texture.g + 0.0722 * texture.b);
}

void main(void)
{
    vUv = uv;
    vPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
    vec3 n = normalize(texture2D(normalMap, uv).xyz * 2.0 - 1.0);
    n.y = -n.y;
    vNormal = normalMatrix * n;
    vec4 color = texture2D(displacementMap, uv);
    vec3 newPosition = position + normal * (color.x * displacementScale + displacementBias);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
