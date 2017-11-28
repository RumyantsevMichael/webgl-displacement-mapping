import {
    TextureLoader,
    Mesh,
    PlaneGeometry,
    PointLight
} from 'three';
import Program from './Program';
import TextureManager from './TextureManager';
import material from './material';

document.addEventListener('DOMContentLoaded', () => {
    const canvasElement = document.querySelector('#canvas');

    const displacementRangeElement = document.querySelector('#displacementScale');
    const displacementViewElement = document.querySelector('#displacementScaleView');

    displacementRangeElement.addEventListener('input', event => {
        event.stopPropagation();

        displacementViewElement.value = event.target.value;
        material.uniforms.displacementScale.value = event.target.value;
    });

    const textureManager = new TextureManager(new TextureLoader());
    
    textureManager.load('pebbles_color', './textures/Pebbles_002_COLOR.jpg');
    textureManager.load('pebbles_displacement', './textures/Pebbles_002_DISP.png');
    textureManager.load('pebbles_normal', './textures/Pebbles_002_NRM.jpg');
    textureManager.load('sand_color', './textures/Sand 002_COLOR.jpg');
    textureManager.load('sand_displacement', './textures/Sand_001_DISP.png');

    const program = new Program(canvasElement, {
        init: (program) => {
            const plane = new Mesh(
                new PlaneGeometry(10, 10, 250, 250),
                material
            );
            const light = new PointLight(0xf0f0ff, 1.0);
    
            material.uniforms.rocks.value = textureManager.get('pebbles_color');
            material.uniforms.sand.value = textureManager.get('sand_color');
            material.uniforms.sandD.value = textureManager.get('sand_displacement');
            material.uniforms.displacementMap.value = textureManager.get('pebbles_displacement');
            material.uniforms.displacementScale.value = 0;
            material.uniforms.displacementBias.value = 0;
            material.uniforms.normalMap.value = textureManager.get('pebbles_normal');
    
            plane.rotation.x = 0.5 * Math.PI;
            plane.rotation.y = Math.PI;
    
            program.camera.position.z = -10;
            program.camera.position.x = -10;
            program.camera.position.y = 10;
    
            program.camera.lookAt(plane.position);
    
            program.add('plane', plane);
            program.add('light', light);
        },
        update: (program) => {
            const light = program.get('light');
            const date = Date.now() / 1000;
    
            light.position.x = Math.sin(date) * 15;
            light.position.z = Math.cos(date) * 15;
            light.position.y = 15;
        }
    });
});

