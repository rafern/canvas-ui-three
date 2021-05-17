import { VirtualKeyboard, KeyRelease, KeyPress, FocusType } from 'canvas-ui';
import type { KeyContext, PointerStyleHandler, Driver } from 'canvas-ui';
import type { TransformAlgorithm } from '../core/TransformAlgorithm';
import { ThreeRoot } from '../core/ThreeRoot';
import type { Object3D } from 'three';

export class VirtualKeyboardDriver implements Driver {
    keyUI: ThreeRoot;
    parent: Object3D;
    eventQueue: string[];

    constructor(parent: Object3D, pointerDriver: Driver, transformAlgorithm: TransformAlgorithm | null = null, pointerStyleHandler: PointerStyleHandler | null = null) {
        this.parent = parent;
        this.eventQueue = [];

        // Create virtual keyboard UI Root
        const keyCtx = <KeyContext>{
            callback: (key: string) => {
                this.eventQueue.push(key);
            },
            shift: false,
        };

        this.keyUI = new ThreeRoot(
            VirtualKeyboard(keyCtx), pointerStyleHandler, transformAlgorithm,
        );
        this.keyUI.enabled = false;
        this.keyUI.registerDriver(pointerDriver);
    }

    toggleKeyboard(enable: boolean): void {
        const wasEnabled = this.keyUI.enabled;
        this.keyUI.enabled = enable;

        // Add to/remove from parent if keyboard UI is enabled/disabled
        if(wasEnabled !== this.keyUI.enabled) {
            if(this.keyUI.enabled)
                this.parent.add(this.keyUI.mesh);
            else
                this.parent.remove(this.keyUI.mesh);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onEnable(_root: ThreeRoot): void {}

    onDisable(_root: ThreeRoot): void {
        this.eventQueue = [];
        this.toggleKeyboard(false);
    }

    update(root: ThreeRoot): void {
        // Skip if UI has no keyboard focus
        if(root.foci.get(FocusType.Keyboard) !== null) {
            // Update and render keyboard UI
            this.toggleKeyboard(true);
            this.keyUI.preLayoutUpdate();
            this.keyUI.resolveLayout();
            this.keyUI.postLayoutUpdate();
            this.keyUI.paint();

            // Parse each keyboard event
            for(const eventKey of this.eventQueue) {
                // Dispatch event
                root.dispatchEvent(new KeyPress(eventKey, null));
                root.dispatchEvent(new KeyRelease(eventKey, null));
            }
        }
        else
            this.toggleKeyboard(false);

        // Clear event queue
        this.eventQueue = [];
    }
}
