import type { RayPointerSource, RayPointerDriver } from '@rafern/canvas-ui';
import type { Group, XRInputSource, WebXRManager } from 'three';
import { PointerHint } from '@rafern/canvas-ui';
import { Vector3 } from 'three';

export interface XRControllerSourceState {
    source: XRInputSource | null;
    pointer: number;
}

export class XRControllerRayPointerSource implements RayPointerSource {
    private _controllers: Map<Group, XRControllerSourceState> = new Map();
    private driver: RayPointerDriver | null = null;

    constructor(webXRManager: WebXRManager) {
        // Keep track of first 2 controllers as they should be enough
        this.trackController(webXRManager.getController(0));
        this.trackController(webXRManager.getController(1));
    }

    get controllers(): IterableIterator<[Group, XRControllerSourceState]> {
        return this._controllers.entries();
    }

    private trackController(controller: Group) {
        // Create state for new tracked controller
        const state = <XRControllerSourceState>{
            source: null,
            pointer: -1
        };

        this._controllers.set(controller, state);

        // Add event listeners
        controller.addEventListener('connected', event => {
            state.source = event.data;
            this.registerController(state);
        });
        controller.addEventListener('disconnected', _event => {
            state.source = null;
            this.unregisterController(state);
        });
        controller.addEventListener('move', _event => {
            // Send pointer rays if state and driver are valid
            if(state.source !== null && state.pointer !== -1 && this.driver !== null) {
                const direction = new Vector3(0, 0, -1).applyQuaternion(controller.quaternion);
                const origin = new Vector3();
                controller.getWorldPosition(origin);

                let buttonBits = 0;
                const buttons = state.source.gamepad.buttons;
                for(const buttonID in buttons) {
                    const bit = parseInt(buttonID, 10);
                    if(!isNaN(bit) && buttons[bit].pressed)
                        buttonBits |= 1 << bit;
                }

                this.driver.handlePointerRay(
                    state.pointer,
                    buttonBits,
                    origin.toArray(),
                    direction.toArray(),
                    false,
                    false,
                    false,
                )
            }
        })

        // Add default hint
        controller.userData.pointerHint = PointerHint.None;
    }

    private registerController(state: XRControllerSourceState) {
        // Register pointer and save pointer ID
        if(this.driver !== null && state.source !== null && state.pointer === -1)
            state.pointer = this.driver.registerPointer(true);
    }

    private unregisterController(state: XRControllerSourceState) {
        // Unregister pointer
        if(this.driver !== null && state.pointer !== -1)
            this.driver.unregisterPointer(state.pointer);

        // Unset pointer ID to prevent double-unregistering
        state.pointer = -1;
    }

    setRayPointerDriver(driver: RayPointerDriver): void {
        // If driver already set, unset old driver
        if(this.driver !== null)
            this.clearRayPointerDriver();

        // Register controllers
        for(const state of this._controllers.values())
            this.registerController(state);

        // Set driver
        this.driver = driver;
    }

    clearRayPointerDriver(): void {
        // Unregister pointers for each controller
        for(const state of this._controllers.values())
            this.unregisterController(state);

        // Unset driver
        this.driver = null;
    }

    onPointerHintChanged(pointer: number, hint: PointerHint): void {
        // Only set controller's pointer hint if pointer ID is owned by this
        // source
        // XXX this seems inneficient, but the amount of controllers is so
        // small that it shouldn't matter. if it gets bad, use a bi-map
        for(const [controller, state] of this._controllers) {
            if(state.pointer === pointer)
                controller.userData.pointerHint = hint;
        }
    }
}