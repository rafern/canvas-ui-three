import { Camera } from 'three';
import { ThreeRoot } from '../core/ThreeRoot';
import { RayPointerDriver } from 'canvas-ui';
export declare class ThreeRayPointerDriver extends RayPointerDriver {
    private readonly raycaster;
    constructor(camera: Camera);
    castRay(origin: [number, number, number], direction: [number, number, number]): [ThreeRoot | null, number, number];
}
