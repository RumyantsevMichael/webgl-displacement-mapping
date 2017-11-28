import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

const uniforms = THREE.UniformsUtils.merge([
    THREE.UniformsLib['lights'],
    THREE.UniformsLib['displacementmap'],
    {
        resolution: {
            type: 'v2',
            value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        },
        rocks: {
            type: 't',
            value: null
        },
        sand: {
            type: 't',
            value: null
        },
        sandD: {
            type: 't',
            value: null
        },
        normalMap: {
            type: 't',
            value: null
        }
    }
]);

export default new THREE.ShaderMaterial({
    wireframe: false,
    uniforms: uniforms,
    fragmentShader: fragmentShader,
    vertexShader: vertexShader,
    lights: true
});