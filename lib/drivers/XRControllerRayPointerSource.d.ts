import type { RayPointerSource, RayPointerDriver } from 'canvas-ui';
import type { WebXRManager } from 'three';
import { PointerHint } from 'canvas-ui';
export declare class XRControllerRayPointerSource implements RayPointerSource {
    private controllers;
    private driver;
    constructor(webXRManager: WebXRManager);
    private trackController;
    private registerController;
    private unregisterController;
    setRayPointerDriver(driver: RayPointerDriver): void;
    clearRayPointerDriver(): void;
    onPointerHintChanged(pointer: number, hint: PointerHint): void;
}
