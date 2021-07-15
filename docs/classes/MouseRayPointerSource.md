[canvas-ui-three](../README.md) / MouseRayPointerSource

# Class: MouseRayPointerSource

## Implements

- `RayPointerSource`

## Table of contents

### Constructors

- [constructor](MouseRayPointerSource.md#constructor)

### Properties

- [driver](MouseRayPointerSource.md#driver)
- [pointer](MouseRayPointerSource.md#pointer)
- [raycaster](MouseRayPointerSource.md#raycaster)

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

src/drivers/MouseRayPointerSource.ts:10

## Properties

### driver

• `Private` **driver**: ``null`` \| `RayPointerDriver` = `null`

#### Defined in

src/drivers/MouseRayPointerSource.ts:7

___

### pointer

• `Private` **pointer**: `number` = `-1`

#### Defined in

src/drivers/MouseRayPointerSource.ts:8

___

### raycaster

• `Private` **raycaster**: `Raycaster`

#### Defined in

src/drivers/MouseRayPointerSource.ts:6

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

src/drivers/MouseRayPointerSource.ts:32

___

### clearRayPointerDriver

▸ **clearRayPointerDriver**(): `void`

#### Returns

`void`

#### Implementation of

RayPointerSource.clearRayPointerDriver

#### Defined in

src/drivers/MouseRayPointerSource.ts:63

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

src/drivers/MouseRayPointerSource.ts:75

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

src/drivers/MouseRayPointerSource.ts:51
