import type { PointerStyleHandler, Driver } from 'canvas-ui';
import type { TransformAlgorithm } from '../core/TransformAlgorithm';
import { ThreeRoot } from '../core/ThreeRoot';
import type { Scene } from 'three';
export declare class VirtualKeyboardDriver implements Driver {
    keyUI: ThreeRoot;
    scene: Scene;
    eventQueue: string[];
    constructor(scene: Scene, pointerDriver: Driver, transformAlgorithm?: TransformAlgorithm | null, pointerStyleHandler?: PointerStyleHandler | null);
    toggleKeyboard(enable: boolean): void;
    onEnable(_root: ThreeRoot): void;
    onDisable(_root: ThreeRoot): void;
    update(root: ThreeRoot): void;
}
