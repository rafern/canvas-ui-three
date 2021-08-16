import { Camera } from 'three';
import type { RayPointerSource, RayPointerDriver, PointerHint } from '@rafern/canvas-ui';
export declare class MouseRayPointerSource implements RayPointerSource {
    private raycaster;
    private driver;
    /** The mapping between each DOM pointer ID and canvas-ui pointer ID */
    private pointers;
    /**
     * The pointer ID of the mouse. Registered in constructor. This is needed
     * due to wheel events not being part of the DOM PointerEvent interface and
     * therefore not having a pointerID field. This is also safe because there
     * can only be one mouse.
     */
    private mousePointerID;
    constructor(camera: Camera, domElem: HTMLElement);
    private getCastOriginDirection;
    private castRay;
    setRayPointerDriver(driver: RayPointerDriver): void;
    clearRayPointerDriver(): void;
    onPointerHintChanged(_pointer: number, _hint: PointerHint): void;
    /**
     * Get the canvas-ui pointer ID of a given event. If the event has a pointer
     * which hasn't been registered yet, then it is registered automatically. If
     * driver is null and therefore registering is impossible, null is returned.
     */
    private getPointerID;
    /** Get the mouse pointer ID */
    get mouseID(): number | null;
    /** Get all registered pointer IDs */
    get pointerIDs(): Array<number>;
}
