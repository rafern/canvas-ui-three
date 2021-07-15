[canvas-ui-three](../README.md) / XRControllerRayPointerSource

# Class: XRControllerRayPointerSource

## Implements

- `RayPointerSource`

## Table of contents

### Constructors

- [constructor](XRControllerRayPointerSource.md#constructor)

### Properties

- [controllers](XRControllerRayPointerSource.md#controllers)
- [driver](XRControllerRayPointerSource.md#driver)

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

src/drivers/XRControllerRayPointerSource.ts:15

## Properties

### controllers

• `Private` **controllers**: `Map`<`Group`, `XRControllerSourceState`\>

#### Defined in

src/drivers/XRControllerRayPointerSource.ts:12

___

### driver

• `Private` **driver**: ``null`` \| `RayPointerDriver` = `null`

#### Defined in

src/drivers/XRControllerRayPointerSource.ts:13

## Methods

### clearRayPointerDriver

▸ **clearRayPointerDriver**(): `void`

#### Returns

`void`

#### Implementation of

RayPointerSource.clearRayPointerDriver

#### Defined in

src/drivers/XRControllerRayPointerSource.ts:87

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

src/drivers/XRControllerRayPointerSource.ts:96

___

### registerController

▸ `Private` **registerController**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `XRControllerSourceState` |

#### Returns

`void`

#### Defined in

src/drivers/XRControllerRayPointerSource.ts:59

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

src/drivers/XRControllerRayPointerSource.ts:74

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

src/drivers/XRControllerRayPointerSource.ts:21

___

### unregisterController

▸ `Private` **unregisterController**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `XRControllerSourceState` |

#### Returns

`void`

#### Defined in

src/drivers/XRControllerRayPointerSource.ts:65
