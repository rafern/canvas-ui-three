import type { PointerStyleHandler, Widget, Theme } from 'canvas-ui';
import type { TransformAlgorithm } from './TransformAlgorithm';
import { Root, defaultTheme } from 'canvas-ui';

import {
    CanvasTexture, PlaneGeometry, MeshBasicMaterial, Mesh, Vector2, Object3D
} from 'three';

/**
 * A {@link Root} that also manages a three.js Mesh so that it can be added to a
 * Scene.
 *
 * @category Core
 */
export class ThreeRoot extends Root {
    /** The texture with the canvas data. */
    private texture: CanvasTexture;
    /**
     * The textured Mesh to be used for a Scene. Not actually a Mesh, but an
     * Object3D which contains a mesh so that the mesh can be resized without
     * interfering with the {@link transformAlgorithm}.
     */
    readonly mesh: Object3D;
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
     *
     * @param theme By default, the theme is {@link defaultTheme}
     */
    constructor(child: Widget, pointerStyleHandler: PointerStyleHandler | null = null, transformAlgorithm: TransformAlgorithm | null = null, theme: Theme = defaultTheme) {
        super(child, pointerStyleHandler, theme);

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

    override set enabled(enabled: boolean) {
        super.enabled = enabled;
        this.mesh.visible = enabled;
    }

    override get enabled(): boolean {
        return super.enabled;
    }

    override resolveLayout(): boolean {
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

    override paint(): boolean {
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
