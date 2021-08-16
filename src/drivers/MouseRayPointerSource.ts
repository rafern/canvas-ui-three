import { /* tree-shaking no-side-effects-when-called */ Raycaster, Camera } from 'three';
import type { RayPointerSource, RayPointerDriver, PointerHint } from '@rafern/canvas-ui';
import { getPointerEventNormPos } from '@rafern/canvas-ui';

export class MouseRayPointerSource implements RayPointerSource {
    private raycaster: Raycaster = new Raycaster();
    private driver: RayPointerDriver | null = null;
    private _pointer = -1; // TODO multi-pointer support

    constructor(camera: Camera, domElem: HTMLElement) {
        this.raycaster.camera = camera;

        // Add listeners to DOM element
        domElem.addEventListener('pointermove', (event: PointerEvent) => {
            if(event.isPrimary)
                this.castRay(...getPointerEventNormPos(event, domElem), event.buttons, event.shiftKey, event.ctrlKey, event.altKey);
        });
        domElem.addEventListener('pointerdown', (event: PointerEvent) => {
            if(event.isPrimary)
                this.castRay(...getPointerEventNormPos(event, domElem), event.buttons, event.shiftKey, event.ctrlKey, event.altKey);
        });
        domElem.addEventListener('pointerup', (event: PointerEvent) => {
            if(event.isPrimary)
                this.castRay(...getPointerEventNormPos(event, domElem), event.buttons, event.shiftKey, event.ctrlKey, event.altKey);
        });
        domElem.addEventListener('pointerleave', (event: PointerEvent) => {
            if(event.isPrimary && this.driver !== null)
                this.driver.leaveAnyPointer(this._pointer);
        });
    }

    get pointer(): number | null {
        if(this._pointer === -1)
            return null;
        else
            return this._pointer;
    }

    private castRay(xNorm: number, yNorm: number, pressing: number | null, shift: boolean, ctrl: boolean, alt: boolean) {
        if(this.driver === null)
            return;

        // Get origin and direction. Using a temporary raycaster
        this.raycaster.setFromCamera(
            { x: xNorm * 2 - 1, y: 1 - yNorm * 2 },
            this.raycaster.camera,
        );

        // Cast ray
        this.driver.handlePointerRay(
            this._pointer,
            pressing,
            this.raycaster.ray.origin.toArray(),
            this.raycaster.ray.direction.toArray(),
            shift,
            ctrl,
            alt,
        );
    }

    setRayPointerDriver(driver: RayPointerDriver): void {
        // If driver already set, unset old driver
        if(this.driver !== null)
            this.clearRayPointerDriver();

        // Register pointer
        this._pointer = driver.registerPointer();

        // Set driver
        this.driver = driver;
    }

    clearRayPointerDriver(): void {
        // Unregister pointer
        if(this._pointer !== -1)
            this.driver?.unregisterPointer(this._pointer);

        // Unset driver and pointer
        this.driver = null;
        this._pointer = -1;
    }

    // Can be ignored, since mouse styling is done via pointer styles
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onPointerHintChanged(_pointer: number, _hint: PointerHint): void {}
}