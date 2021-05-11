'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var canvasUi = require('canvas-ui');
var three = require('three');

class ThreeRoot extends canvasUi.Root {
    // A ThreeRoot is a Root, but it also manages a three.js mesh so that it can
    // be added to a scene
    constructor(child, pointerStyleHandler = null, transformAlgorithm = null) {
        super(child, pointerStyleHandler);
        // Create texture out of canvas. For now, the texture is invalid
        this.texture = new three.CanvasTexture(this.viewport.canvas);
        // Create a planar mesh out of internal canvas
        const meshGeometry = new three.PlaneGeometry();
        const meshMaterial = new three.MeshBasicMaterial({ map: this.texture });
        meshMaterial.transparent = true;
        const internalMesh = new three.Mesh(meshGeometry, meshMaterial);
        // Wrap mesh in Object3D so it can be transformed independently
        this.mesh = new three.Object3D();
        this.mesh.add(internalMesh);
        // Transforms algorithm
        this.transformAlgorithm = transformAlgorithm;
    }
    set enabled(enabled) {
        super.enabled = enabled;
        this.mesh.visible = enabled;
    }
    get enabled() {
        return super.enabled;
    }
    resolveLayout() {
        const resized = super.resolveLayout();
        // Resize mesh and texture if needed
        if (resized) {
            const [width, height] = this.dimensions;
            const [canvasWidth, canvasHeight] = this.canvasDimensions;
            const wRatio = width / canvasWidth;
            const hRatio = height / canvasHeight;
            this.texture.offset = new three.Vector2(0, 1 - hRatio);
            this.texture.repeat = new three.Vector2(wRatio, hRatio);
            this.mesh.children[0].scale.fromArray([width, height, 1]);
        }
        return resized;
    }
    paint() {
        const wasDirty = super.paint();
        // Update texture if needed
        if (wasDirty)
            this.texture.needsUpdate = true;
        // Update transforms of mesh
        if (this.transformAlgorithm !== null) {
            this.transformAlgorithm(this);
            // Update mesh world matrix
            this.mesh.matrixWorldNeedsUpdate = true;
        }
        return wasDirty;
    }
}

class RayPointerDriver {
    // Does pointer input with a controller ray instead of a mouse
    constructor(renderer) {
        this.controllers = new Map();
        this.states = new Map();
        this.raycaster = new three.Raycaster();
        // Keep track of first 2 controllers as they should be enough
        this.trackController(renderer.xr.getController(0));
        this.trackController(renderer.xr.getController(1));
    }
    trackController(controller) {
        controller.addEventListener('connected', (event) => {
            this.controllers.set(controller, event.data);
        });
        controller.addEventListener('disconnected', (_event) => {
            this.controllers.delete(controller);
        });
    }
    handleDisconnect(controller) {
        for (const [root, state] of this.states) {
            if (state.controller === controller) {
                if (state.disconnectListener !== null)
                    state.controller.removeEventListener('disconnected', state.disconnectListener);
                state.controller = null;
                if (state.hovering) {
                    root.dispatchEvent(new canvasUi.Leave(root.lastFociCapturers.get(canvasUi.FocusType.Pointer)));
                }
                state.hovering = false;
                state.holding = false;
            }
        }
    }
    switchAssigned(controller, state) {
        // Remove event listener
        if (state.controller !== null) {
            if (state.disconnectListener !== null)
                state.controller.removeEventListener('disconnected', state.disconnectListener);
        }
        // Assign new controller
        state.controller = controller;
        // Assign new event listener
        state.disconnectListener = (_event) => {
            this.handleDisconnect(controller);
        };
        state.controller.addEventListener('disconnected', state.disconnectListener);
    }
    onEnable(root) {
        // Create new state for UI that just got enabled
        this.states.set(root, {
            controller: null,
            disconnectListener: null,
            holding: false,
            hovering: false,
        });
    }
    onDisable(root) {
        // Dispatch leave event
        root.dispatchEvent(new canvasUi.Leave());
        // Delete state for UI thats about to get disabled
        this.states.delete(root);
    }
    update(root) {
        const state = this.states.get(root);
        if (typeof state === 'undefined')
            return;
        for (const [controller, source] of this.controllers) {
            // If there is no controller assigned, assign this one
            if (state.controller === null)
                this.switchAssigned(controller, state);
            // Ignore if controller is not the assigned one and select not
            // pressed or select is being held by the assigned controller
            const isPressed = source.gamepad.buttons[0].pressed;
            const controllerMatches = state.controller === controller;
            if (!controllerMatches && (!isPressed || state.holding))
                continue;
            // Setup raycaster
            const rayDirection = new three.Vector3(0, 0, -1).applyQuaternion(controller.quaternion);
            this.raycaster.ray = new three.Ray(controller.position, rayDirection);
            // Find intersection
            const intersection = this.raycaster.intersectObject(root.mesh, true);
            if (intersection.length === 0) {
                if (state.hovering && controllerMatches) {
                    state.hovering = false;
                    root.dispatchEvent(new canvasUi.Leave(root.lastFociCapturers.get(canvasUi.FocusType.Pointer)));
                }
                continue;
            }
            // Translate to canvas coordinates
            const [width, height] = root.dimensions;
            const uv = intersection[0].uv;
            if (typeof uv === 'undefined')
                continue;
            const x = uv.x * width;
            const y = (1 - uv.y) * height;
            // Get event type
            let e;
            if (isPressed !== state.holding) {
                if (isPressed)
                    e = new canvasUi.PointerPress(x, y);
                else
                    e = new canvasUi.PointerRelease(x, y);
                state.holding = isPressed;
                if (isPressed) {
                    if (state.controller !== controller) {
                        root.dispatchEvent(new canvasUi.Leave(root.lastFociCapturers.get(canvasUi.FocusType.Pointer)));
                        this.switchAssigned(controller, state);
                    }
                }
            }
            else
                e = new canvasUi.PointerMove(x, y);
            // Do event and update hovering flag
            root.dispatchEvent(e);
            state.hovering = true;
        }
    }
}

function getEventPos(event) {
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
class MousePointerDriver {
    constructor(camera, element) {
        this.raycaster = new three.Raycaster();
        this.hovering = new Set();
        this.eventQueues = new Map();
        this.camera = camera;
        this.element = element;
        // Listen for mouse events, updating mouse state queue
        element.addEventListener('pointermove', (event) => {
            if (event.isPrimary)
                this.addEvent(getEventPos(event), null);
        });
        element.addEventListener('pointerdown', (event) => {
            if (event.isPrimary)
                this.addEvent(getEventPos(event), true);
        });
        element.addEventListener('pointerup', (event) => {
            if (event.isPrimary)
                this.addEvent(getEventPos(event), false);
        });
        element.addEventListener('pointerleave', (event) => {
            if (event.isPrimary)
                this.addEvent([null, null], null);
        });
    }
    addEvent([x, y], state = null) {
        // NOTE: event positions are in normalized device coordinates, used by
        // the three.js Raycaster
        // Get position of element relative to document. From:
        // https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element-relative-to-the-browser-window#answer-442474
        let ex = 0, ey = 0;
        if (x !== null && y !== null) {
            let el = this.element;
            while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
                ex += el.offsetLeft - el.scrollLeft;
                ey += el.offsetTop - el.scrollTop;
                el = el.offsetParent;
            }
        }
        // Add event to all event queues
        const event = {
            pos: (x === null || y === null) ? null : new three.Vector2(((x - ex) / this.element.clientWidth) * 2 - 1, ((y - ey) / this.element.clientHeight) * -2 + 1),
            state: state,
        };
        // NOTE: It's OK to share references to events in queue, since they
        // don't get modified. Sharing references to Root events is NOT OK
        // though
        for (const eventQueue of this.eventQueues.values())
            eventQueue.push(event);
    }
    stopHovering(root) {
        // If no longer hovering specific Root...
        if (this.hovering.delete(root)) {
            // Dispatch a leave event to last pointer capturer
            root.dispatchEvent(new canvasUi.Leave(root.lastFociCapturers.get(canvasUi.FocusType.Pointer)));
        }
    }
    onEnable(root) {
        // Create fresh event queue for Root
        this.eventQueues.set(root, []);
    }
    onDisable(root) {
        // Stop hovering Root and delete event queue
        this.stopHovering(root);
        this.eventQueues.delete(root);
    }
    update(root) {
        // Parse each mouse event
        let eventQueue = this.eventQueues.get(root);
        if (typeof eventQueue === 'undefined')
            return;
        const [width, height] = root.dimensions;
        for (const event of eventQueue) {
            // Create leave event if needed
            if (event.pos === null) {
                this.stopHovering(root);
                continue;
            }
            // Setup raycaster
            this.raycaster.setFromCamera(event.pos, this.camera);
            // Find intersection
            const intersection = this.raycaster.intersectObject(root.mesh, true);
            if (intersection.length === 0) {
                this.stopHovering(root);
                // Clear keyboard focus if this is a click outside the Root and
                // not currently hovering over any Root.
                // This behaviour does not occur in the ray pointer driver
                if (event.state && this.hovering.size === 0) {
                    //console.log('cleared focus from mouse pointer driver')
                    root.clearFocus(canvasUi.FocusType.Keyboard);
                }
                continue;
            }
            // Translate to canvas coordinates
            const uv = intersection[0].uv;
            if (typeof uv === 'undefined')
                continue;
            const x = uv.x * width;
            const y = (1 - uv.y) * height;
            // Create event
            let e;
            if (event.state === null)
                e = new canvasUi.PointerMove(x, y);
            else if (event.state) // true
                e = new canvasUi.PointerPress(x, y);
            else // false
                e = new canvasUi.PointerRelease(x, y);
            // Do event
            root.dispatchEvent(e);
            // HACK Check if driver is still enabled for Root. Break out if it's
            // disabled. Root may disable driver due to callbacks, causing the
            // hover flag to never be cleared, leaking memory. There has to be
            // a better way to fix this... leaving it to future me when
            // everything explodes
            if (this.eventQueues.has(root)) {
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

class VirtualKeyboardDriver {
    constructor(scene, pointerDriver, transformAlgorithm = null, pointerStyleHandler = null) {
        this.scene = scene;
        this.eventQueue = [];
        // Create virtual keyboard UI Root
        const keyCtx = {
            callback: (key) => {
                this.eventQueue.push(key);
            },
            shift: false,
        };
        this.keyUI = new ThreeRoot(canvasUi.VirtualKeyboard(keyCtx), pointerStyleHandler, transformAlgorithm);
        this.keyUI.enabled = false;
        this.keyUI.registerDriver(pointerDriver);
    }
    toggleKeyboard(enable) {
        const wasEnabled = this.keyUI.enabled;
        this.keyUI.enabled = enable;
        // Add to/remove from scene if keyboard UI is enabled/disabled
        if (wasEnabled !== this.keyUI.enabled) {
            if (this.keyUI.enabled)
                this.scene.add(this.keyUI.mesh);
            else
                this.scene.remove(this.keyUI.mesh);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onEnable(_root) { }
    onDisable(_root) {
        this.eventQueue = [];
        this.toggleKeyboard(false);
    }
    update(root) {
        // Skip if UI has no keyboard focus
        if (root.foci.get(canvasUi.FocusType.Keyboard) !== null) {
            // Update and render keyboard UI
            this.toggleKeyboard(true);
            this.keyUI.preLayoutUpdate();
            this.keyUI.resolveLayout();
            this.keyUI.postLayoutUpdate();
            this.keyUI.paint();
            // Parse each keyboard event
            for (const eventKey of this.eventQueue) {
                // Dispatch event
                root.dispatchEvent(new canvasUi.KeyPress(eventKey, null));
                root.dispatchEvent(new canvasUi.KeyRelease(eventKey, null));
            }
        }
        else
            this.toggleKeyboard(false);
        // Clear event queue
        this.eventQueue = [];
    }
}

exports.MousePointerDriver = MousePointerDriver;
exports.RayPointerDriver = RayPointerDriver;
exports.ThreeRoot = ThreeRoot;
exports.VirtualKeyboardDriver = VirtualKeyboardDriver;
