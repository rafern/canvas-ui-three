import { /* tree-shaking no-side-effects-when-called */ Raycaster, Camera } from 'three';
import type { RayPointerSource, RayPointerDriver, PointerHint } from '@rafern/canvas-ui';
import { getPointerEventNormPos } from '@rafern/canvas-ui';

export class MouseRayPointerSource implements RayPointerSource {
    private raycaster: Raycaster = new Raycaster();
    private driver: RayPointerDriver | null = null;
    /** The mapping between each DOM pointer ID and canvas-ui pointer ID */
    private pointers: Map<number, number> = new Map();
    /**
     * The pointer ID of the mouse. Registered in constructor. This is needed
     * due to wheel events not being part of the DOM PointerEvent interface and
     * therefore not having a pointerID field. This is also safe because there
     * can only be one mouse.
     */
    private mousePointerID: number | null = null;

    constructor(camera: Camera, domElem: HTMLElement) {
        this.raycaster.camera = camera;

        // Add listeners to DOM element
        const pointerEventHandler = (event: PointerEvent) => {
            const pointer = this.getPointerID(event);
            if(pointer === null)
                return;

            this.castRay(
                pointer, ...getPointerEventNormPos(event, domElem),
                event.buttons, event.shiftKey, event.ctrlKey, event.altKey,
            );
        };

        domElem.addEventListener('pointermove', pointerEventHandler);
        domElem.addEventListener('pointerdown', pointerEventHandler);
        domElem.addEventListener('pointerup', pointerEventHandler);

        domElem.addEventListener('pointerleave', (event: PointerEvent) => {
            const pointer = this.getPointerID(event);
            if(this.driver !== null && pointer !== null)
                this.driver.leaveAnyPointer(pointer);
        });

        domElem.addEventListener('wheel', (event: WheelEvent) => {
            if(this.mousePointerID === null || this.driver === null)
                return;

            const [screenXNorm, screenYNorm] = getPointerEventNormPos(event, domElem);
            const [root, xNorm, yNorm] = this.driver.castRay(
                ...this.getCastOriginDirection(screenXNorm, screenYNorm)
            );

            if(root === null)
                return;

            this.driver?.wheelPointer(
                root, this.mousePointerID, xNorm, yNorm, event.deltaX,
                event.deltaY, event.shiftKey, event.ctrlKey, event.altKey,
            );
        });
    }

    private getCastOriginDirection(xNorm: number, yNorm: number): [[number, number, number], [number, number, number]] {
        // Get origin and direction. Using a temporary raycaster
        this.raycaster.setFromCamera(
            { x: xNorm * 2 - 1, y: 1 - yNorm * 2 },
            this.raycaster.camera,
        );

        return [
            this.raycaster.ray.origin.toArray(),
            this.raycaster.ray.direction.toArray(),
        ]
    }

    private castRay(pointer: number, xNorm: number, yNorm: number, pressing: number | null, shift: boolean, ctrl: boolean, alt: boolean) {
        if(this.driver === null)
            return;

        this.driver.handlePointerRay(
            pointer,
            pressing,
            ...this.getCastOriginDirection(xNorm, yNorm),
            shift,
            ctrl,
            alt,
        );
    }

    setRayPointerDriver(driver: RayPointerDriver): void {
        // If driver already set, unset old driver
        if(this.driver !== null)
            this.clearRayPointerDriver();

        // Register mouse pointer
        this.mousePointerID = driver.registerPointer(false);

        // Set driver
        this.driver = driver;
    }

    clearRayPointerDriver(): void {
        // Unregister pointers
        if(this.mousePointerID !== null)
            this.driver?.unregisterPointer(this.mousePointerID);

        for(const pointer of this.pointers.values())
            this.driver?.unregisterPointer(pointer);

        // Unset driver and pointers
        this.driver = null;
        this.mousePointerID = null;
        this.pointers.clear();
    }

    // Can be ignored, since mouse styling is done via pointer styles
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onPointerHintChanged(_pointer: number, _hint: PointerHint): void {}

    /**
     * Get the canvas-ui pointer ID of a given event. If the event has a pointer
     * which hasn't been registered yet, then it is registered automatically. If
     * driver is null and therefore registering is impossible, null is returned.
     */
    private getPointerID(event: PointerEvent): number | null {
        let pointerID: number | null | undefined = this.pointers.get(event.pointerId);

        if(typeof pointerID === 'undefined') {
            pointerID = event.pointerType === 'mouse' ? this.mousePointerID
                                                      : null;

            if(pointerID === null) {
                if(this.driver === null)
                    return null;

                pointerID = this.driver.registerPointer(true);
            }

            this.pointers.set(event.pointerId, pointerID);
        }

        return pointerID;
    }

    /** Get the mouse pointer ID */
    get mouseID(): number | null {
        return this.mousePointerID;
    }

    /** Get all registered pointer IDs */
    get pointerIDs(): Array<number> {
        const ids = [];

        if(this.mousePointerID !== null)
            ids.push(this.mousePointerID);

        for(const pointer of this.pointers.values())
            ids.push(pointer);

        return ids;
    }
}