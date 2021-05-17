import type { PointerStyleHandler, Driver } from 'canvas-ui';
import type { TransformAlgorithm } from '../core/TransformAlgorithm';
import { ThreeRoot } from '../core/ThreeRoot';
import type { Object3D } from 'three';
export declare class VirtualKeyboardDriver implements Driver {
    keyUI: ThreeRoot;
    parent: Object3D;
    eventQueue: string[];
    constructor(parent: Object3D, pointerDriver: Driver, transformAlgorithm?: TransformAlgorithm | null, pointerStyleHandler?: PointerStyleHandler | null);
    toggleKeyboard(enable: boolean): void;
    onEnable(_root: ThreeRoot): void;
    onDisable(_root: ThreeRoot): void;
    update(root: ThreeRoot): void;
}
