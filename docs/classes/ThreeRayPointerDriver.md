[canvas-ui-three](../README.md) / ThreeRayPointerDriver

# Class: ThreeRayPointerDriver

## Hierarchy

- `RayPointerDriver`

  ↳ **`ThreeRayPointerDriver`**

## Table of contents

### Constructors

- [constructor](ThreeRayPointerDriver.md#constructor)

### Properties

- [hints](ThreeRayPointerDriver.md#hints)
- [raycaster](ThreeRayPointerDriver.md#raycaster)
- [sources](ThreeRayPointerDriver.md#sources)
- [states](ThreeRayPointerDriver.md#states)

### Methods

- [addSource](ThreeRayPointerDriver.md#addsource)
- [castRay](ThreeRayPointerDriver.md#castray)
- [getPointerHint](ThreeRayPointerDriver.md#getpointerhint)
- [handlePointerRay](ThreeRayPointerDriver.md#handlepointerray)
- [leaveAnyPointer](ThreeRayPointerDriver.md#leaveanypointer)
- [leavePointer](ThreeRayPointerDriver.md#leavepointer)
- [movePointer](ThreeRayPointerDriver.md#movepointer)
- [onDisable](ThreeRayPointerDriver.md#ondisable)
- [onEnable](ThreeRayPointerDriver.md#onenable)
- [onFocusCapturerChanged](ThreeRayPointerDriver.md#onfocuscapturerchanged)
- [onFocusChanged](ThreeRayPointerDriver.md#onfocuschanged)
- [registerPointer](ThreeRayPointerDriver.md#registerpointer)
- [setPointerHint](ThreeRayPointerDriver.md#setpointerhint)
- [unregisterPointer](ThreeRayPointerDriver.md#unregisterpointer)
- [update](ThreeRayPointerDriver.md#update)

## Constructors

### constructor

• **new ThreeRayPointerDriver**(`camera`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `camera` | `Camera` |

#### Overrides

RayPointerDriver.constructor

#### Defined in

[src/drivers/ThreeRayPointerDriver.ts:8](https://github.com/playkostudios/canvas-ui-three/blob/22e406a/src/drivers/ThreeRayPointerDriver.ts#L8)

## Properties

### hints

• `Protected` **hints**: `Map`<`number`, `PointerHint`\>

The {@link PointerHint | hints} for each pointer. The keys are pointer
IDs, while the values are that pointer's hint.

See [getPointerHint](ThreeRayPointerDriver.md#getpointerhint)

#### Inherited from

RayPointerDriver.hints

#### Defined in

node_modules/canvas-ui/lib/drivers/PointerDriver.d.ts:36

___

### raycaster

• `Private` `Readonly` **raycaster**: `Raycaster`

#### Defined in

[src/drivers/ThreeRayPointerDriver.ts:6](https://github.com/playkostudios/canvas-ui-three/blob/22e406a/src/drivers/ThreeRayPointerDriver.ts#L6)

___

### sources

• `Protected` `Readonly` **sources**: `Set`<`RayPointerSource`\>

The sources which this is assigned to

#### Inherited from

RayPointerDriver.sources

#### Defined in

node_modules/canvas-ui/lib/drivers/RayPointerDriver.d.ts:16

___

### states

• `Protected` **states**: `Map`<`Root`, `PointerDriverState`\>

The current state for each registered and enabled root. Contains whether
each root is pressing, hovering, which pointer is bound to it and its
event queue

#### Inherited from

RayPointerDriver.states

#### Defined in

node_modules/canvas-ui/lib/drivers/PointerDriver.d.ts:27

## Methods

### addSource

▸ **addSource**(`source`): `void`

Add a source. Assigns itself to the given source.

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `RayPointerSource` |

#### Returns

`void`

#### Inherited from

RayPointerDriver.addSource

#### Defined in

node_modules/canvas-ui/lib/drivers/RayPointerDriver.d.ts:35

___

### castRay

▸ **castRay**(`origin`, `direction`): [``null`` \| [`ThreeRoot`](ThreeRoot.md), `number`, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | [`number`, `number`, `number`] |
| `direction` | [`number`, `number`, `number`] |

#### Returns

[``null`` \| [`ThreeRoot`](ThreeRoot.md), `number`, `number`]

#### Overrides

RayPointerDriver.castRay

#### Defined in

[src/drivers/ThreeRayPointerDriver.ts:14](https://github.com/playkostudios/canvas-ui-three/blob/22e406a/src/drivers/ThreeRayPointerDriver.ts#L14)

___

### getPointerHint

▸ **getPointerHint**(`pointer`): `PointerHint`

Get a pointer's {@link PointerHint | hint}.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pointer` | `number` | The registered pointer ID |

#### Returns

`PointerHint`

Returns the given pointer ID's hint. If the pointer ID is not registered, {@link PointerHint.None} is returned.

#### Inherited from

RayPointerDriver.getPointerHint

#### Defined in

node_modules/canvas-ui/lib/drivers/PointerDriver.d.ts:99

___

### handlePointerRay

▸ **handlePointerRay**(`pointer`, `pressing`, `origin`, `direction`): `void`

Receive a ray from a {@link RayPointerSource}.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pointer` | `number` | The source's pointer ID, given when setting the source's sink |
| `pressing` | ``null`` \| `boolean` | Is the pointer being pressed? If null, the previous pressing state is used |
| `origin` | [`number`, `number`, `number`] | The world position where the ray is starting |
| `direction` | [`number`, `number`, `number`] | A normalised vector representing the ray's direction. Not a euler rotation nor a quaternion |

#### Returns

`void`

#### Inherited from

RayPointerDriver.handlePointerRay

#### Defined in

node_modules/canvas-ui/lib/drivers/RayPointerDriver.d.ts:33

___

### leaveAnyPointer

▸ **leaveAnyPointer**(`pointer`): `void`

Queue up a {@link Leave} event to any root with the given pointer
assigned. Event will only be queued if the root was being hovered.
Pointer will also be unassigned from root.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pointer` | `number` | The registered pointer ID |

#### Returns

`void`

#### Inherited from

RayPointerDriver.leaveAnyPointer

#### Defined in

node_modules/canvas-ui/lib/drivers/PointerDriver.d.ts:83

___

### leavePointer

▸ **leavePointer**(`root`, `pointer`): `void`

Queue up a {@link Leave} event to a given root. Event will only be queued
if the root was being hovered.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | `Root` | - |
| `pointer` | `number` | The registered pointer ID |

#### Returns

`void`

#### Inherited from

RayPointerDriver.leavePointer

#### Defined in

node_modules/canvas-ui/lib/drivers/PointerDriver.d.ts:75

___

### movePointer

▸ **movePointer**(`root`, `pointer`, `xNorm`, `yNorm`, `pressing?`): `void`

Queue up a pointer event to a given root. The type of
{@link PointerEvent} is decided automatically based on the root's state
and whether its pressing or not.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | `Root` | - |
| `pointer` | `number` | The registered pointer ID |
| `xNorm` | `number` | The normalised (non-integer range from 0 to 1) X coordinate of the pointer event. 0 is the left edge of the root, while 1 is the right edge of the root. |
| `yNorm` | `number` | The normalised (non-integer range from 0 to 1) Y coordinate of the pointer event. 0 is the top edge of the root, while 1 is the bottom edge of the root. |
| `pressing?` | ``null`` \| `boolean` | Is the pointer pressed?  If null, the last pressing state is used, meaning that the pressing state has not changed. Useful if getting pointer movement in an event based environment where you only know when a pointer press occurs, but not if the pointer is pressed or not |

#### Returns

`void`

#### Inherited from

RayPointerDriver.movePointer

#### Defined in

node_modules/canvas-ui/lib/drivers/PointerDriver.d.ts:68

___

### onDisable

▸ **onDisable**(`root`): `void`

Dispatches a leave event for the disabled root and deletes the state of
the disabled root from [states](ThreeRayPointerDriver.md#states).

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | `Root` |

#### Returns

`void`

#### Inherited from

RayPointerDriver.onDisable

#### Defined in

node_modules/canvas-ui/lib/drivers/PointerDriver.d.ts:108

___

### onEnable

▸ **onEnable**(`root`): `void`

Creates a state for the enabled root in [states](ThreeRayPointerDriver.md#states).

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | `Root` |

#### Returns

`void`

#### Inherited from

RayPointerDriver.onEnable

#### Defined in

node_modules/canvas-ui/lib/drivers/PointerDriver.d.ts:103

___

### onFocusCapturerChanged

▸ **onFocusCapturerChanged**(`_root`, `_focusType`, `_oldCapturer`, `_newCapturer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_root` | `Root` |
| `_focusType` | `FocusType` |
| `_oldCapturer` | ``null`` \| `Widget` |
| `_newCapturer` | ``null`` \| `Widget` |

#### Returns

`void`

#### Inherited from

RayPointerDriver.onFocusCapturerChanged

#### Defined in

node_modules/canvas-ui/lib/drivers/PointerDriver.d.ts:115

___

### onFocusChanged

▸ **onFocusChanged**(`_root`, `_focusType`, `_newFocus`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_root` | `Root` |
| `_focusType` | `FocusType` |
| `_newFocus` | ``null`` \| `Widget` |

#### Returns

`void`

#### Inherited from

RayPointerDriver.onFocusChanged

#### Defined in

node_modules/canvas-ui/lib/drivers/PointerDriver.d.ts:114

___

### registerPointer

▸ **registerPointer**(): `number`

Register a new pointer.

#### Returns

`number`

Returns {@link nextPointerID} and increments it

#### Inherited from

RayPointerDriver.registerPointer

#### Defined in

node_modules/canvas-ui/lib/drivers/PointerDriver.d.ts:44

___

### setPointerHint

▸ `Protected` **setPointerHint**(`pointer`, `hint`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pointer` | `number` |
| `hint` | `PointerHint` |

#### Returns

`boolean`

#### Inherited from

RayPointerDriver.setPointerHint

#### Defined in

node_modules/canvas-ui/lib/drivers/RayPointerDriver.d.ts:36

___

### unregisterPointer

▸ **unregisterPointer**(`pointer`): `void`

Unregister a pointer.

If a root has this pointer bound to it, the pointer is unbound from the
root, a Leave event is queued to the root and the hovering and pressing
state of the root is set to false.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pointer` | `number` |

#### Returns

`void`

#### Inherited from

RayPointerDriver.unregisterPointer

#### Defined in

node_modules/canvas-ui/lib/drivers/PointerDriver.d.ts:52

___

### update

▸ **update**(`root`): `void`

Dispatches all queued events (found in [states](ThreeRayPointerDriver.md#states)) for the root and
clears its event queue

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | `Root` |

#### Returns

`void`

#### Inherited from

RayPointerDriver.update

#### Defined in

node_modules/canvas-ui/lib/drivers/PointerDriver.d.ts:113
