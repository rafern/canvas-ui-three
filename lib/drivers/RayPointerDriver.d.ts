import type { Group, XRInputSource, Event, WebGLRenderer } from 'three';
import type { ThreeRoot } from '../core/ThreeRoot';
import { Raycaster } from 'three';
import type { Driver } from 'canvas-ui';
export interface RayPointerDriverState {
    controller: Group | null;
    disconnectListener: EventListener | null;
    holding: boolean;
    hovering: boolean;
}
interface EventListener {
    (event: Event): void;
}
export declare class RayPointerDriver implements Driver {
    controllers: Map<Group, XRInputSource>;
    states: Map<ThreeRoot, RayPointerDriverState>;
    raycaster: Raycaster;
    constructor(renderer: WebGLRenderer);
    private trackController;
    private handleDisconnect;
    private switchAssigned;
    onEnable(root: ThreeRoot): void;
    onDisable(root: ThreeRoot): void;
    update(root: ThreeRoot): void;
}
export {};
