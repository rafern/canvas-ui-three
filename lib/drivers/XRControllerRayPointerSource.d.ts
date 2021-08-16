import type { RayPointerSource, RayPointerDriver } from '@rafern/canvas-ui';
import type { Group, XRInputSource, WebXRManager } from 'three';
import { PointerHint } from '@rafern/canvas-ui';
export interface XRControllerSourceState {
    source: XRInputSource | null;
    pointer: number;
}
export declare class XRControllerRayPointerSource implements RayPointerSource {
    private _controllers;
    private driver;
    constructor(webXRManager: WebXRManager);
    get controllers(): IterableIterator<[Group, XRControllerSourceState]>;
    private trackController;
    private registerController;
    private unregisterController;
    setRayPointerDriver(driver: RayPointerDriver): void;
    clearRayPointerDriver(): void;
    onPointerHintChanged(pointer: number, hint: PointerHint): void;
}
