import {
    UniformsUtils,
    UniformsLib,
    ShaderMaterial,
    Vector2
} from 'three';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

const uniforms = UniformsUtils.merge([
    UniformsLib['lights'],
    UniformsLib['displacementmap'],
    {
        resolution: {
            type: 'v2',
            value: new Vector2(window.innerWidth, window.innerHeight)
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

export default new ShaderMaterial({
    wireframe: false,
    uniforms: uniforms,
    fragmentShader: fragmentShader,
    vertexShader: vertexShader,
    lights: true
});