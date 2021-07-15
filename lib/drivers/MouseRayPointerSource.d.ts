import { Camera } from 'three';
import type { RayPointerSource, RayPointerDriver, PointerHint } from 'canvas-ui';
export declare class MouseRayPointerSource implements RayPointerSource {
    private raycaster;
    private driver;
    private pointer;
    constructor(camera: Camera, domElem: HTMLElement);
    private castRay;
    setRayPointerDriver(driver: RayPointerDriver): void;
    clearRayPointerDriver(): void;
    onPointerHintChanged(_pointer: number, _hint: PointerHint): void;
}
