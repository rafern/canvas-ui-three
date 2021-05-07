import type { TransformAlgorithm } from './TransformAlgorithm';
import type { PointerStyleHandler, Widget } from 'canvas-ui';
import { Root } from 'canvas-ui';
import { Object3D } from 'three';
export declare class ThreeRoot extends Root {
    private texture;
    readonly mesh: Object3D;
    transformAlgorithm: TransformAlgorithm | null;
    constructor(child: Widget, pointerStyleHandler?: PointerStyleHandler | null, transformAlgorithm?: TransformAlgorithm | null);
    set enabled(enabled: boolean);
    get enabled(): boolean;
    resolveLayout(): boolean;
    paint(): boolean;
}
