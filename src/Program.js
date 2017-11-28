import * as THREE from 'three';
import OrbitControlsFactory from 'three-orbit-controls';

const OrbitControls = OrbitControlsFactory(THREE);

class Program {
    constructor(rootElement, hooks) {
        this._childrenDictionary = new Map();

        this.rootElement = rootElement;
        this.init = hooks.init;
        this.update = hooks.update;
        this.render = hooks.render;

        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this._renderer = new THREE.WebGLRenderer({
            canvas: this.rootElement,
            antialias: true
        });
        this._controls = new OrbitControls(this._camera, this.rootElement);

        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setClearColor(0xf0f0f0);
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this._renderer.shadowMap.enabled = true;
        this._controls.enableKeys = true;

        this._init = this._init.bind(this);
        this._tick = this._tick.bind(this);

        this._init();
        this._tick();
    }

    get camera() {
        return this._camera;
    }

    add(id, object) {
        this._childrenDictionary.set(id, object.id);
        this._scene.add(object);

        return this;
    }

    get(id) {
        const originalId = this._childrenDictionary.get(id);

        return this._scene.getObjectById(originalId);
    }

    _init() {
        this.init && this.init(this);
    }

    _tick() {
        window.requestAnimationFrame(this._tick);

        this._controls.update();

        this.update && this.update(this);
        this.render && this.render(this);

        this._renderer.render(this._scene, this._camera);
    }
}

export default Program;
