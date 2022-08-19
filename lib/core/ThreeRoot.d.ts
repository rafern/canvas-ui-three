import type { Widget, RootProperties } from '@rafern/canvas-ui';
import type { TransformAlgorithm } from './TransformAlgorithm';
import { Root } from '@rafern/canvas-ui';
import { Mesh, Object3D } from 'three';
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
export declare class ThreeRoot extends Root {
    /**
     * The texture with the canvas data. Will re replaced with a new texture
     * instance when the canvas dimensions (not layout) change.
     */
    private texture;
    /**
     * The material used for the mesh. Saved so that its texture can be changed
     * later.
     */
    private meshMaterial;
    /**
     * The mesh used for rendering the canvas. Saved so that its scale can be
     * changed later.
     */
    readonly mesh: Mesh;
    /**
     * An object that contains the canvas' mesh which can be added to a scene.
     * Not actually a Mesh, but an Object3D which contains a mesh, so that the
     * mesh can be resized without interfering with the
     * {@link ThreeRoot#transformAlgorithm}.
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
     * Sets {@link Root#child}, {@link Root#pointerStyleHandler},
     * {@link ThreeRoot#transformAlgorithm} and {@link Root#child}'s
     * {@link Widget#inheritedTheme | inherited theme}.
     */
    constructor(child: Widget, properties?: ThreeRootProperties);
    set enabled(enabled: boolean);
    get enabled(): boolean;
    resolveLayout(): boolean;
    paint(): boolean;
    /**
     * Cleans up resources used by the Root.
     *
     * It's the user's responsibility that the {@link ThreeRoot#object} is
     * removed from all scenes. canvas-ui-three has no knowledge about the
     * available scenes.
     *
     * @see the {@link Root#destroy} documentation for more details
     */
    destroy(): void;
}
