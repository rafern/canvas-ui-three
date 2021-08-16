import { Camera } from 'three';
import { RayPointerDriver } from '@rafern/canvas-ui';
import { ThreeRoot } from '../core/ThreeRoot';
export declare class ThreeRayPointerDriver extends RayPointerDriver {
    private readonly raycaster;
    constructor(camera: Camera);
    castRay(origin: [number, number, number], direction: [number, number, number]): [ThreeRoot | null, number, number];
}
