import { PointerRelease, PointerPress, PointerMove, FocusType, Leave } from 'canvas-ui';
import type { ThreeRoot } from '../core/ThreeRoot';
import { Raycaster, Vector2 } from 'three';
import type { Driver } from 'canvas-ui';
import type { Camera } from 'three';

function getEventPos(event: PointerEvent): [number, number] {
    // Correctly gets mouse position relative to page
    // From https://www.quirksmode.org/js/events_properties.html
    let posx = 0, posy = 0;
    if (event.pageX || event.pageY) {
        posx = event.pageX;
        posy = event.pageY;
    }
    else if (event.clientX || event.clientY) {
        posx = event.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
        posy = event.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
    }

    return [posx, posy];
}

export interface MousePointerDriverEvent {
    pos: Vector2 | null,
    state: boolean | null,
}

export class MousePointerDriver implements Driver {
    raycaster: Raycaster = new Raycaster();
    hovering: Set<ThreeRoot> = new Set();
    eventQueues: Map<ThreeRoot, Array<MousePointerDriverEvent>> = new Map();
    element: HTMLElement;
    camera: Camera;

    constructor(camera: Camera, element: HTMLElement) {
        this.camera = camera;
        this.element = element;

        // Listen for mouse events, updating mouse state queue
        element.addEventListener('pointermove', (event) => {
            if(event.isPrimary)
                this.addEvent(getEventPos(event), null);
        });

        element.addEventListener('pointerdown', (event) => {
            if(event.isPrimary)
                this.addEvent(getEventPos(event), true);
        });

        element.addEventListener('pointerup', (event) => {
            if(event.isPrimary)
                this.addEvent(getEventPos(event), false);
        });

        element.addEventListener('pointerleave', (event) => {
            if(event.isPrimary)
                this.addEvent([null, null], null);
        });
    }

    private addEvent([x, y]: [number | null, number | null], state: boolean | null = null): void {
        // NOTE: event positions are in normalized device coordinates, used by
        // the three.js Raycaster
        // Get position of element relative to document. From:
        // https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element-relative-to-the-browser-window#answer-442474
        let ex = 0, ey = 0;
        if(x !== null && y !== null) {
            let el = this.element;
            while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
                ex += el.offsetLeft - el.scrollLeft;
                ey += el.offsetTop - el.scrollTop;
                el = el.offsetParent as HTMLElement;
            }
        }

        // Add event to all event queues
        const event = <MousePointerDriverEvent>{
            pos: (x === null || y === null) ? null : new Vector2(
                ((x - ex) / this.element.clientWidth ) *  2 - 1,
                ((y - ey) / this.element.clientHeight) * -2 + 1,
            ),
            state: state,
        };

        // NOTE: It's OK to share references to events in queue, since they
        // don't get modified. Sharing references to Root events is NOT OK
        // though
        for(const eventQueue of this.eventQueues.values())
            eventQueue.push(event);
    }

    private stopHovering(root: ThreeRoot): void {
        // If no longer hovering specific Root...
        if(this.hovering.delete(root)) {
            // Dispatch a leave event to last pointer capturer
            root.dispatchEvent(
                new Leave(root.lastFociCapturers.get(FocusType.Pointer))
            );
        }
    }

    onEnable(root: ThreeRoot): void {
        // Create fresh event queue for Root
        this.eventQueues.set(root, []);
    }

    onDisable(root: ThreeRoot): void {
        // Stop hovering Root and delete event queue
        this.stopHovering(root);
        this.eventQueues.delete(root);
    }

    update(root: ThreeRoot): void {
        // Parse each mouse event
        let eventQueue = this.eventQueues.get(root);
        if(typeof eventQueue === 'undefined')
            return;

        const [width, height] = root.dimensions;
        for(const event of eventQueue) {
            // Create leave event if needed
            if(event.pos === null) {
                this.stopHovering(root);
                continue;
            }

            // Setup raycaster
            this.raycaster.setFromCamera(event.pos, this.camera);

            // Find intersection
            const intersection = this.raycaster.intersectObject(root.mesh, true);
            if(intersection.length === 0) {
                this.stopHovering(root);

                // Clear keyboard focus if this is a click outside the Root and
                // not currently hovering over any Root.
                // This behaviour does not occur in the ray pointer driver
                if(event.state && this.hovering.size === 0) {
                    //console.log('cleared focus from mouse pointer driver')
                    root.clearFocus(FocusType.Keyboard);
                }

                continue;
            }

            // Translate to canvas coordinates
            const uv = intersection[0].uv;
            if(typeof uv === 'undefined')
                continue;
            const x = uv.x * width;
            const y = (1 - uv.y) * height;

            // Create event
            let e;
            if(event.state === null)
                e = new PointerMove(x, y);
            else if(event.state) // true
                e = new PointerPress(x, y);
            else // false
                e = new PointerRelease(x, y);

            // Do event
            root.dispatchEvent(e);

            // HACK Check if driver is still enabled for Root. Break out if it's
            // disabled. Root may disable driver due to callbacks, causing the
            // hover flag to never be cleared, leaking memory. There has to be
            // a better way to fix this... leaving it to future me when
            // everything explodes
            if(this.eventQueues.has(root)) {
                // Update hovering flag
                this.hovering.add(root);
            }
            else
                break;
        }

        // Clear event queue
        eventQueue.length = 0;
    }
}
