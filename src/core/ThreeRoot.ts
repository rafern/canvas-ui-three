import type { TransformAlgorithm } from './TransformAlgorithm';
import type { PointerStyleHandler, Widget } from 'canvas-ui';
import { Root } from 'canvas-ui';

// Externals
import {
    CanvasTexture, PlaneGeometry, MeshBasicMaterial, Mesh, Vector2, Object3D
} from 'three';

export class ThreeRoot extends Root {
    // The texture with the canvas data
    private texture: CanvasTexture;
    // The textured mesh to be used for a scene
    readonly mesh: Object3D;
    // Transform algorithm; decides how to position the Canvas' mesh in the
    // world. Can be changed later and is called on update
    transformAlgorithm: TransformAlgorithm | null;

    // A ThreeRoot is a Root, but it also manages a three.js mesh so that it can
    // be added to a scene
    constructor(child: Widget, pointerStyleHandler: PointerStyleHandler | null = null, transformAlgorithm: TransformAlgorithm | null = null) {
        super(child, pointerStyleHandler);

        // Create texture out of canvas. For now, the texture is invalid
        this.texture = new CanvasTexture(this.viewport.canvas);

        // Create a planar mesh out of internal canvas
        const meshGeometry = new PlaneGeometry();
        const meshMaterial = new MeshBasicMaterial({ map: this.texture });
        meshMaterial.transparent = true;
        const internalMesh = new Mesh(meshGeometry, meshMaterial);

        // Wrap mesh in Object3D so it can be transformed independently
        this.mesh = new Object3D();
        this.mesh.add(internalMesh);

        // Transforms algorithm
        this.transformAlgorithm = transformAlgorithm;
    }

    set enabled(enabled: boolean) {
        super.enabled = enabled;
        this.mesh.visible = enabled;
    }

    get enabled(): boolean {
        return super.enabled;
    }

    resolveLayout(): boolean {
        const resized = super.resolveLayout();

        // Resize mesh and texture if needed
        if(resized) {
            const [width, height] = this.dimensions;
            const [canvasWidth, canvasHeight] = this.canvasDimensions;
            const wRatio = width / canvasWidth;
            const hRatio = height / canvasHeight;
            this.texture.offset = new Vector2(0, 1 - hRatio);
            this.texture.repeat = new Vector2(wRatio, hRatio);

            this.mesh.children[0].scale.fromArray([width, height, 1]);
        }

        return resized;
    }

    paint(): boolean {
        const wasDirty = super.paint();

        // Update texture if needed
        if(wasDirty)
            this.texture.needsUpdate = true;

        // Update transforms of mesh
        if(this.transformAlgorithm !== null) {
            this.transformAlgorithm(this);

            // Update mesh world matrix
            this.mesh.matrixWorldNeedsUpdate = true;
        }

        return wasDirty;
    }
}
