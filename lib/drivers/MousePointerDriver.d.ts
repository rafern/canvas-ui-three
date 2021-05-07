import type { ThreeRoot } from '../core/ThreeRoot';
import { Raycaster, Vector2 } from 'three';
import type { Driver } from 'canvas-ui';
import type { Camera } from 'three';
export interface MousePointerDriverEvent {
    pos: Vector2 | null;
    state: boolean | null;
}
export declare class MousePointerDriver implements Driver {
    raycaster: Raycaster;
    hovering: Set<ThreeRoot>;
    eventQueues: Map<ThreeRoot, Array<MousePointerDriverEvent>>;
    element: HTMLElement;
    camera: Camera;
    constructor(camera: Camera, element: HTMLElement);
    private addEvent;
    private stopHovering;
    onEnable(root: ThreeRoot): void;
    onDisable(root: ThreeRoot): void;
    update(root: ThreeRoot): void;
}
