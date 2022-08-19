import type { Widget, RootProperties } from '@rafern/canvas-ui';
import type { TransformAlgorithm } from './TransformAlgorithm';
import { Root } from '@rafern/canvas-ui';

import {
    CanvasTexture, PlaneGeometry, MeshBasicMaterial, Mesh, Vector2, Object3D
} from 'three';

/**
 * Optional ThreeRoot constructor properties.
 *
 * @category Core
 */
export interface ThreeRootProperties extends RootProperties {
    /** Sets {@link ThreeRoot#transformAlgorithm}. */
    transformAlgorithm?: TransformAlgorithm | null;
}

/**
 * A {@link Root} that also manages a three.js Mesh so that it can be added to a
 * Scene.
 *
 * @category Core
 */
export class ThreeRoot extends Root {
    /**
     * The texture with the canvas data. Will re replaced with a new texture
     * instance when the canvas dimensions (not layout) change.
     */
    private texture: CanvasTexture;
    /**
     * The material used for the mesh. Saved so that its texture can be changed
     * later.
     */
    private meshMaterial: MeshBasicMaterial;
    /**
     * The mesh used for rendering the canvas. Saved so that its scale can be
     * changed later.
     */
    private mesh: Mesh;
    /**
     * An object that contains the canvas' mesh which can be added to a scene.
     * Not actually a Mesh, but an Object3D which contains a mesh, so that the
     * mesh can be resized without interfering with the
     * {@link transformAlgorithm}.
     */
    readonly object: Object3D;
    /**
     * Transform algorithm; decides how to position the canvas' mesh in the
     * world. Can be changed later and is called on update.
     */
    transformAlgorithm: TransformAlgorithm | null;

    /**
     * Creates a new ThreeRoot.
     *
     * Sets {@link child}, {@link pointerStyleHandler},
     * {@link transformAlgorithm} and {@link child}'s
     * {@link Widget.inheritedTheme | inherited theme}.
     */
    constructor(child: Widget, properties?: ThreeRootProperties) {
        super(child, properties);

        // Create texture out of canvas. For now, the texture is invalid
        this.texture = new CanvasTexture(this.viewport.canvas);

        // Create a planar mesh out of internal canvas
        const meshGeometry = new PlaneGeometry();
        this.meshMaterial = new MeshBasicMaterial({ map: this.texture });
        this.meshMaterial.transparent = true;
        this.mesh = new Mesh(meshGeometry, this.meshMaterial);

        // Wrap mesh in Object3D so it can be transformed independently
        this.object = new Object3D();
        this.object.add(this.mesh);

        // Transforms algorithm
        this.transformAlgorithm = properties?.transformAlgorithm ?? null;
    }

    override set enabled(enabled: boolean) {
        super.enabled = enabled;
        this.object.visible = enabled;
    }

    override get enabled(): boolean {
        return super.enabled;
    }

    override resolveLayout(): boolean {
        const [oldCanvasWidth, oldCanvasHeight] = this.canvasDimensions;

        const resized = super.resolveLayout();

        // Resize mesh and texture if needed
        if(resized) {
            const [canvasWidth, canvasHeight] = this.canvasDimensions;

            if(oldCanvasWidth !== canvasWidth || oldCanvasHeight !== canvasHeight) {
                this.texture.dispose();
                this.texture = new CanvasTexture(this.viewport.canvas);
            }

            const [width, height] = this.dimensions;
            const [scaleX, scaleY] = this.effectiveScale;
            const u = scaleX * width / canvasWidth;
            const v = scaleY * height / canvasHeight;
            this.texture.offset = new Vector2(0, 1 - v);
            this.texture.repeat = new Vector2(u, v);

            this.mesh.scale.fromArray([width, height, 1]);
        }

        return resized;
    }

    override paint(): boolean {
        const wasDirty = super.paint();

        // Update texture if needed
        if(wasDirty)
            this.texture.needsUpdate = true;

        // Update transforms of mesh
        if(this.transformAlgorithm !== null) {
            this.transformAlgorithm(this);

            // Update mesh world matrix
            this.object.matrixWorldNeedsUpdate = true;
        }

        return wasDirty;
    }

    /**
     * {@inheritDoc Root#destroy}
     *
     * It's the user's responsibility that the {@link ThreeRoot#object} is
     * removed from all scenes. canvas-ui-three has no knowledge about the
     * available scenes.
     */
    override destroy() {
        super.destroy();

        this.object.remove(this.mesh);
        this.meshMaterial.dispose();
        this.mesh.geometry.dispose();
        this.texture.dispose();
    }
}
