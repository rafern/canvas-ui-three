[canvas-ui-three](../README.md) / MouseRayPointerSource

# Class: MouseRayPointerSource

## Implements

- `RayPointerSource`

## Table of contents

### Constructors

- [constructor](MouseRayPointerSource.md#constructor)

### Properties

- [\_pointer](MouseRayPointerSource.md#_pointer)
- [driver](MouseRayPointerSource.md#driver)
- [raycaster](MouseRayPointerSource.md#raycaster)

### Accessors

- [pointer](MouseRayPointerSource.md#pointer)

### Methods

- [castRay](MouseRayPointerSource.md#castray)
- [clearRayPointerDriver](MouseRayPointerSource.md#clearraypointerdriver)
- [onPointerHintChanged](MouseRayPointerSource.md#onpointerhintchanged)
- [setRayPointerDriver](MouseRayPointerSource.md#setraypointerdriver)

## Constructors

### constructor

• **new MouseRayPointerSource**(`camera`, `domElem`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `camera` | `Camera` |
| `domElem` | `HTMLElement` |

#### Defined in

[src/drivers/MouseRayPointerSource.ts:10](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/drivers/MouseRayPointerSource.ts#L10)

## Properties

### \_pointer

• `Private` **\_pointer**: `number` = `-1`

#### Defined in

[src/drivers/MouseRayPointerSource.ts:8](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/drivers/MouseRayPointerSource.ts#L8)

___

### driver

• `Private` **driver**: ``null`` \| `RayPointerDriver` = `null`

#### Defined in

[src/drivers/MouseRayPointerSource.ts:7](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/drivers/MouseRayPointerSource.ts#L7)

___

### raycaster

• `Private` **raycaster**: `Raycaster`

#### Defined in

[src/drivers/MouseRayPointerSource.ts:6](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/drivers/MouseRayPointerSource.ts#L6)

## Accessors

### pointer

• `get` **pointer**(): ``null`` \| `number`

#### Returns

``null`` \| `number`

#### Defined in

[src/drivers/MouseRayPointerSource.ts:32](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/drivers/MouseRayPointerSource.ts#L32)

## Methods

### castRay

▸ `Private` **castRay**(`xNorm`, `yNorm`, `pressing?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `xNorm` | `number` | `undefined` |
| `yNorm` | `number` | `undefined` |
| `pressing` | ``null`` \| `boolean` | `null` |

#### Returns

`void`

#### Defined in

[src/drivers/MouseRayPointerSource.ts:39](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/drivers/MouseRayPointerSource.ts#L39)

___

### clearRayPointerDriver

▸ **clearRayPointerDriver**(): `void`

#### Returns

`void`

#### Implementation of

RayPointerSource.clearRayPointerDriver

#### Defined in

[src/drivers/MouseRayPointerSource.ts:70](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/drivers/MouseRayPointerSource.ts#L70)

___

### onPointerHintChanged

▸ **onPointerHintChanged**(`_pointer`, `_hint`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_pointer` | `number` |
| `_hint` | `PointerHint` |

#### Returns

`void`

#### Implementation of

RayPointerSource.onPointerHintChanged

#### Defined in

[src/drivers/MouseRayPointerSource.ts:82](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/drivers/MouseRayPointerSource.ts#L82)

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

[src/drivers/MouseRayPointerSource.ts:58](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/drivers/MouseRayPointerSource.ts#L58)
