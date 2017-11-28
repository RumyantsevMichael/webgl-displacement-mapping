class TextureManager {
    constructor(loader) {
        this.loader = loader;
        this.registry = new Map();
    }

    load(id, url) {
        this.registry.set(id, this.loader.load(url));
    }

    get(id) {
        return this.registry.get(id);
    }
}

export default TextureManager;
