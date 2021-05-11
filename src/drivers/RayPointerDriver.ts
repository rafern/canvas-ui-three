import { PointerRelease, PointerPress, PointerMove, FocusType, Leave } from 'canvas-ui';
import type { Group, XRInputSource, Event, WebGLRenderer } from 'three';
import type { ThreeRoot } from '../core/ThreeRoot';
import { Raycaster, Ray, Vector3 } from 'three';
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

export class RayPointerDriver implements Driver {
    controllers: Map<Group, XRInputSource> = new Map();
    states: Map<ThreeRoot, RayPointerDriverState> = new Map();
    raycaster: Raycaster = new Raycaster();

    // Does pointer input with a controller ray instead of a mouse
    constructor(renderer: WebGLRenderer) {
        // Keep track of first 2 controllers as they should be enough
        this.trackController(renderer.xr.getController(0));
        this.trackController(renderer.xr.getController(1));
    }

    private trackController(controller: Group) {
        controller.addEventListener('connected', (event) => {
            this.controllers.set(controller, event.data);
        });

        controller.addEventListener('disconnected', (_event) => {
            this.controllers.delete(controller);
        });
    }

    private handleDisconnect(controller: Group) {
        for(const [root, state] of this.states) {
            if(state.controller === controller) {
                if(state.disconnectListener !== null)
                    state.controller.removeEventListener('disconnected', state.disconnectListener);
                state.controller = null;
                if(state.hovering) {
                    root.dispatchEvent(
                        new Leave(root.lastFociCapturers.get(FocusType.Pointer))
                    );
                }
                state.hovering = false;
                state.holding = false;
            }
        }
    }

    private switchAssigned(controller: Group, state: RayPointerDriverState) {
        // Remove event listener
        if(state.controller !== null) {
            if(state.disconnectListener !== null)
                state.controller.removeEventListener('disconnected', state.disconnectListener);
        }

        // Assign new controller
        state.controller = controller;

        // Assign new event listener
        state.disconnectListener = (_event: Record<string, unknown>) => {
            this.handleDisconnect(controller);
        };
        state.controller.addEventListener('disconnected', state.disconnectListener);
    }

    onEnable(root: ThreeRoot): void {
        // Create new state for UI that just got enabled
        this.states.set(root, <RayPointerDriverState>{
            controller: null,
            disconnectListener: null,
            holding: false,
            hovering: false,
        });
    }

    onDisable(root: ThreeRoot): void {
        // Dispatch leave event
        root.dispatchEvent(new Leave());

        // Delete state for UI thats about to get disabled
        this.states.delete(root);
    }

    update(root: ThreeRoot): void {
        const state = this.states.get(root);
        if(typeof state === 'undefined')
            return;

        for(const [controller, source] of this.controllers) {
            // If there is no controller assigned, assign this one
            if(state.controller === null)
                this.switchAssigned(controller, state);

            // Ignore if controller is not the assigned one and select not
            // pressed or select is being held by the assigned controller
            const isPressed = source.gamepad.buttons[0].pressed;
            const controllerMatches = state.controller === controller;
            if(!controllerMatches && (!isPressed || state.holding))
                continue;

            // Setup raycaster
            const rayDirection = new Vector3(0, 0, -1).applyQuaternion(controller.quaternion);
            this.raycaster.ray = new Ray(controller.position, rayDirection);

            // Find intersection
            const intersection = this.raycaster.intersectObject(root.mesh, true);
            if(intersection.length === 0) {
                if(state.hovering && controllerMatches) {
                    state.hovering = false;
                    root.dispatchEvent(
                        new Leave(root.lastFociCapturers.get(FocusType.Pointer))
                    );
                }

                continue;
            }

            // Translate to canvas coordinates
            const [width, height] = root.dimensions;
            const uv = intersection[0].uv;

            if(typeof uv === 'undefined')
                continue;

            const x = uv.x * width;
            const y = (1 - uv.y) * height;

            // Get event type
            let e;
            if(isPressed !== state.holding) {
                if(isPressed)
                    e = new PointerPress(x, y);
                else
                    e = new PointerRelease(x, y);

                state.holding = isPressed;

                if(isPressed) {
                    if(state.controller !== controller) {
                        root.dispatchEvent(
                            new Leave(root.lastFociCapturers.get(FocusType.Pointer))
                        );
                        this.switchAssigned(controller, state);
                    }
                }
            }
            else
                e = new PointerMove(x, y);

            // Do event and update hovering flag
            root.dispatchEvent(e);
            state.hovering = true;
        }
    }
}
