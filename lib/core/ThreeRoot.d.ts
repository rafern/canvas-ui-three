import type { PointerStyleHandler, Widget, Theme } from '@rafern/canvas-ui';
import type { TransformAlgorithm } from './TransformAlgorithm';
import { Root } from '@rafern/canvas-ui';
import { Object3D } from 'three';
/**
 * A {@link Root} that also manages a three.js Mesh so that it can be added to a
 * Scene.
 *
 * @category Core
 */
export declare class ThreeRoot extends Root {
    /** The texture with the canvas data. */
    private texture;
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
     * @param theme If none supplied, then the default theme found in {@link Theme.constructor} is used
     */
    constructor(child: Widget, pointerStyleHandler?: PointerStyleHandler | null, transformAlgorithm?: TransformAlgorithm | null, theme?: Theme);
    set enabled(enabled: boolean);
    get enabled(): boolean;
    resolveLayout(): boolean;
    paint(): boolean;
}
