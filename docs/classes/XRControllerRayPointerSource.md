[canvas-ui-three](../README.md) / XRControllerRayPointerSource

# Class: XRControllerRayPointerSource

## Implements

- `RayPointerSource`

## Table of contents

### Constructors

- [constructor](XRControllerRayPointerSource.md#constructor)

### Properties

- [\_controllers](XRControllerRayPointerSource.md#_controllers)
- [driver](XRControllerRayPointerSource.md#driver)

### Accessors

- [controllers](XRControllerRayPointerSource.md#controllers)

### Methods

- [clearRayPointerDriver](XRControllerRayPointerSource.md#clearraypointerdriver)
- [onPointerHintChanged](XRControllerRayPointerSource.md#onpointerhintchanged)
- [registerController](XRControllerRayPointerSource.md#registercontroller)
- [setRayPointerDriver](XRControllerRayPointerSource.md#setraypointerdriver)
- [trackController](XRControllerRayPointerSource.md#trackcontroller)
- [unregisterController](XRControllerRayPointerSource.md#unregistercontroller)

## Constructors

### constructor

• **new XRControllerRayPointerSource**(`webXRManager`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `webXRManager` | `WebXRManager` |

#### Defined in

[src/drivers/XRControllerRayPointerSource.ts:15](https://github.com/playkostudios/canvas-ui-three/blob/22e406a/src/drivers/XRControllerRayPointerSource.ts#L15)

## Properties

### \_controllers

• `Private` **\_controllers**: `Map`<`Group`, [`XRControllerSourceState`](../interfaces/XRControllerSourceState.md)\>

#### Defined in

[src/drivers/XRControllerRayPointerSource.ts:12](https://github.com/playkostudios/canvas-ui-three/blob/22e406a/src/drivers/XRControllerRayPointerSource.ts#L12)

___

### driver

• `Private` **driver**: ``null`` \| `RayPointerDriver` = `null`

#### Defined in

[src/drivers/XRControllerRayPointerSource.ts:13](https://github.com/playkostudios/canvas-ui-three/blob/22e406a/src/drivers/XRControllerRayPointerSource.ts#L13)

## Accessors

### controllers

• `get` **controllers**(): `IterableIterator`<[`Group`, [`XRControllerSourceState`](../interfaces/XRControllerSourceState.md)]\>

#### Returns

`IterableIterator`<[`Group`, [`XRControllerSourceState`](../interfaces/XRControllerSourceState.md)]\>

#### Defined in

[src/drivers/XRControllerRayPointerSource.ts:21](https://github.com/playkostudios/canvas-ui-three/blob/22e406a/src/drivers/XRControllerRayPointerSource.ts#L21)

## Methods

### clearRayPointerDriver

▸ **clearRayPointerDriver**(): `void`

#### Returns

`void`

#### Implementation of

RayPointerSource.clearRayPointerDriver

#### Defined in

[src/drivers/XRControllerRayPointerSource.ts:91](https://github.com/playkostudios/canvas-ui-three/blob/22e406a/src/drivers/XRControllerRayPointerSource.ts#L91)

___

### onPointerHintChanged

▸ **onPointerHintChanged**(`pointer`, `hint`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pointer` | `number` |
| `hint` | `PointerHint` |

#### Returns

`void`

#### Implementation of

RayPointerSource.onPointerHintChanged

#### Defined in

[src/drivers/XRControllerRayPointerSource.ts:100](https://github.com/playkostudios/canvas-ui-three/blob/22e406a/src/drivers/XRControllerRayPointerSource.ts#L100)

___

### registerController

▸ `Private` **registerController**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`XRControllerSourceState`](../interfaces/XRControllerSourceState.md) |

#### Returns

`void`

#### Defined in

[src/drivers/XRControllerRayPointerSource.ts:63](https://github.com/playkostudios/canvas-ui-three/blob/22e406a/src/drivers/XRControllerRayPointerSource.ts#L63)

___

### setRayPointerDriver

▸ **setRayPointerDriver**(`driver`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | `RayPointerDriver` |

#### Returns

`void`

#### Implementation of

RayPointerSource.setRayPointerDriver

#### Defined in

[src/drivers/XRControllerRayPointerSource.ts:78](https://github.com/playkostudios/canvas-ui-three/blob/22e406a/src/drivers/XRControllerRayPointerSource.ts#L78)

___

### trackController

▸ `Private` **trackController**(`controller`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `controller` | `Group` |

#### Returns

`void`

#### Defined in

[src/drivers/XRControllerRayPointerSource.ts:25](https://github.com/playkostudios/canvas-ui-three/blob/22e406a/src/drivers/XRControllerRayPointerSource.ts#L25)

___

### unregisterController

▸ `Private` **unregisterController**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`XRControllerSourceState`](../interfaces/XRControllerSourceState.md) |

#### Returns

`void`

#### Defined in

[src/drivers/XRControllerRayPointerSource.ts:69](https://github.com/playkostudios/canvas-ui-three/blob/22e406a/src/drivers/XRControllerRayPointerSource.ts#L69)
