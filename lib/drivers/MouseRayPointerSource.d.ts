import { Camera } from 'three';
import type { RayPointerSource, RayPointerDriver, PointerHint } from '@rafern/canvas-ui';
export declare class MouseRayPointerSource implements RayPointerSource {
    private raycaster;
    private driver;
    private _pointer;
    constructor(camera: Camera, domElem: HTMLElement);
    get pointer(): number | null;
    private castRay;
    setRayPointerDriver(driver: RayPointerDriver): void;
    clearRayPointerDriver(): void;
    onPointerHintChanged(_pointer: number, _hint: PointerHint): void;
}
