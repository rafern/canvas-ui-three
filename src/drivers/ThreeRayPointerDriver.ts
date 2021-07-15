import { /* tree-shaking no-side-effects-when-called */ Raycaster, Ray, Vector3, Object3D, Camera } from 'three';
import { ThreeRoot } from '../core/ThreeRoot';
import { RayPointerDriver } from 'canvas-ui';

export class ThreeRayPointerDriver extends RayPointerDriver {
    private readonly raycaster: Raycaster = new Raycaster();

    constructor(camera: Camera) {
        super();

        this.raycaster.camera = camera;
    }

    castRay(origin: [number, number, number], direction: [number, number, number]): [ThreeRoot | null, number, number] {
        // Setup raycaster
        this.raycaster.ray = new Ray(
            new Vector3(...origin), new Vector3(...direction),
        );

        // Find intersection with any of the tracked roots
        const meshRoots: Map<Object3D, ThreeRoot> = new Map();
        for(const root of this.states.keys()) {
            // Ignore roots that are not ThreeRoots; we need their meshes
            if(root instanceof ThreeRoot)
                meshRoots.set(root.mesh, root);
        }

        const meshes = Array.from(meshRoots.keys());
        const intersections = this.raycaster.intersectObjects(meshes, true);
        if(intersections.length === 0)
            return [null, 0, 0];

        // Pick the closest valid intersection
        for(const intersection of intersections) {
            const uv = intersection.uv;

            if(typeof uv === 'undefined')
                continue;

            const root = meshRoots.get(intersection.object);
            if(typeof root === 'undefined') {
                console.warn('failed intersection object:', intersection.object);
                continue;
            }

            return [root, uv.x, 1 - uv.y];
        }

        // None of the intersections were valid (missing uv or root)
        return [null, 0, 0];
    }
}
