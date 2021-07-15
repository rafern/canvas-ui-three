[canvas-ui-three](../README.md) / ThreeRoot

# Class: ThreeRoot

A {@link Root} that also manages a three.js Mesh so that it can be added to a
Scene.

## Hierarchy

- `Root`

  ↳ **`ThreeRoot`**

  ↳↳ [`ThreeVirtualKeyboardRoot`](ThreeVirtualKeyboardRoot.md)

## Table of contents

### Constructors

- [constructor](ThreeRoot.md#constructor)

### Properties

- [\_currentPointerStyle](ThreeRoot.md#_currentpointerstyle)
- [\_enabled](ThreeRoot.md#_enabled)
- [\_foci](ThreeRoot.md#_foci)
- [\_fociCapturers](ThreeRoot.md#_focicapturers)
- [\_mobileTextInUse](ThreeRoot.md#_mobiletextinuse)
- [child](ThreeRoot.md#child)
- [drivers](ThreeRoot.md#drivers)
- [mesh](ThreeRoot.md#mesh)
- [pointerStyle](ThreeRoot.md#pointerstyle)
- [pointerStyleHandler](ThreeRoot.md#pointerstylehandler)
- [textInputHandler](ThreeRoot.md#textinputhandler)
- [texture](ThreeRoot.md#texture)
- [transformAlgorithm](ThreeRoot.md#transformalgorithm)
- [viewport](ThreeRoot.md#viewport)

### Accessors

- [canvas](ThreeRoot.md#canvas)
- [canvasDimensions](ThreeRoot.md#canvasdimensions)
- [dimensions](ThreeRoot.md#dimensions)
- [enabled](ThreeRoot.md#enabled)
- [hasMobileTextInput](ThreeRoot.md#hasmobiletextinput)
- [maxDimensions](ThreeRoot.md#maxdimensions)
- [usingMobileTextInput](ThreeRoot.md#usingmobiletextinput)

### Methods

- [clearDrivers](ThreeRoot.md#cleardrivers)
- [clearFocus](ThreeRoot.md#clearfocus)
- [dispatchEvent](ThreeRoot.md#dispatchevent)
- [dropFocus](ThreeRoot.md#dropfocus)
- [getFocus](ThreeRoot.md#getfocus)
- [getFocusCapturer](ThreeRoot.md#getfocuscapturer)
- [getTextInput](ThreeRoot.md#gettextinput)
- [paint](ThreeRoot.md#paint)
- [postLayoutUpdate](ThreeRoot.md#postlayoutupdate)
- [preLayoutUpdate](ThreeRoot.md#prelayoutupdate)
- [registerDriver](ThreeRoot.md#registerdriver)
- [requestFocus](ThreeRoot.md#requestfocus)
- [resolveLayout](ThreeRoot.md#resolvelayout)
- [unregisterDriver](ThreeRoot.md#unregisterdriver)
- [updatePointerStyle](ThreeRoot.md#updatepointerstyle)

## Constructors

### constructor

• **new ThreeRoot**(`child`, `pointerStyleHandler?`, `transformAlgorithm?`, `theme?`)

Creates a new ThreeRoot.

Sets [child](ThreeRoot.md#child), [pointerStyleHandler](ThreeRoot.md#pointerstylehandler),
[transformAlgorithm](ThreeRoot.md#transformalgorithm) and [child](ThreeRoot.md#child)'s
{@link Widget.inheritedTheme | inherited theme}.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `child` | `Widget` | `undefined` | - |
| `pointerStyleHandler` | ``null`` \| `PointerStyleHandler` | `null` | - |
| `transformAlgorithm` | ``null`` \| [`TransformAlgorithm`](../README.md#transformalgorithm) | `null` | - |
| `theme` | `Theme` | `undefined` | By default, the theme is {@link defaultTheme} |

#### Overrides

Root.constructor

#### Defined in

[src/core/ThreeRoot.ts:39](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/core/ThreeRoot.ts#L39)

## Properties

### \_currentPointerStyle

• `Protected` **\_currentPointerStyle**: `string`

The actual current pointer style.

For internal use only.

See [pointerStyle](ThreeRoot.md#pointerstyle)

#### Inherited from

Root.\_currentPointerStyle

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:40

___

### \_enabled

• `Protected` **\_enabled**: `boolean`

Is the Root enabled? For internal use only.

See [enabled](ThreeRoot.md#enabled)

#### Inherited from

Root.\_enabled

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:27

___

### \_foci

• `Protected` **\_foci**: `Map`<`FocusType`, ``null`` \| `Widget`\>

Current component foci (event targets for each focus type).

For internal use only.

See [requestFocus](ThreeRoot.md#requestfocus), [dropFocus](ThreeRoot.md#dropfocus), [clearFocus](ThreeRoot.md#clearfocus) and
[getFocus](ThreeRoot.md#getfocus)

#### Inherited from

Root.\_foci

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:54

___

### \_fociCapturers

• `Protected` **\_fociCapturers**: `Map`<`FocusType`, ``null`` \| `Widget`\>

Last capturer of each component focus (event targets for each focus
type).

For internal use only.

See [getFocusCapturer](ThreeRoot.md#getfocuscapturer)

#### Inherited from

Root.\_fociCapturers

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:63

___

### \_mobileTextInUse

• `Protected` **\_mobileTextInUse**: `boolean`

Is the mobile-friendly text input in use?

For internal use only.

See [hasMobileTextInput](ThreeRoot.md#hasmobiletextinput), [usingMobileTextInput](ThreeRoot.md#usingmobiletextinput) and
[getTextInput](ThreeRoot.md#gettextinput)

#### Inherited from

Root.\_mobileTextInUse

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:80

___

### child

• `Readonly` **child**: `Widget`

The Root's child; the parent Widget of all widgets in this Root

#### Inherited from

Root.child

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:17

___

### drivers

• `Protected` **drivers**: `Set`<`Driver`\>

The list of drivers registered to this root

#### Inherited from

Root.drivers

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:21

___

### mesh

• `Readonly` **mesh**: `Object3D`

The textured Mesh to be used for a Scene. Not actually a Mesh, but an
Object3D which contains a mesh so that the mesh can be resized without
interfering with the [transformAlgorithm](ThreeRoot.md#transformalgorithm).

#### Defined in

[src/core/ThreeRoot.ts:23](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/core/ThreeRoot.ts#L23)

___

### pointerStyle

• **pointerStyle**: `string`

The pointer style this root wants. Will be set on
[postLayoutUpdate](ThreeRoot.md#postlayoutupdate) by [pointerStyleHandler](ThreeRoot.md#pointerstylehandler)

#### Inherited from

Root.pointerStyle

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:32

___

### pointerStyleHandler

• **pointerStyleHandler**: ``null`` \| `PointerStyleHandler`

Pointer style handler, decides how to show the given pointer style.
Normally a function which sets the CSS cursor style of the Root's canvas

#### Inherited from

Root.pointerStyleHandler

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:45

___

### textInputHandler

• **textInputHandler**: ``null`` \| `TextInputHandler`

Handler for mobile-friendly text input. If not null, widgets that need
text may call this to get a string.

See [hasMobileTextInput](ThreeRoot.md#hasmobiletextinput), [usingMobileTextInput](ThreeRoot.md#usingmobiletextinput) and
[getTextInput](ThreeRoot.md#gettextinput)

#### Inherited from

Root.textInputHandler

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:71

___

### texture

• `Private` **texture**: `CanvasTexture`

The texture with the canvas data.

#### Defined in

[src/core/ThreeRoot.ts:17](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/core/ThreeRoot.ts#L17)

___

### transformAlgorithm

• **transformAlgorithm**: ``null`` \| [`TransformAlgorithm`](../README.md#transformalgorithm)

Transform algorithm; decides how to position the canvas' mesh in the
world. Can be changed later and is called on update.

#### Defined in

[src/core/ThreeRoot.ts:28](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/core/ThreeRoot.ts#L28)

___

### viewport

• `Protected` **viewport**: `Viewport`

The internal viewport. Manages drawing

#### Inherited from

Root.viewport

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:19

## Accessors

### canvas

• `get` **canvas**(): `HTMLCanvasElement`

The [viewport](ThreeRoot.md#viewport)'s {@link Viewport.canvas | canvas}

#### Returns

`HTMLCanvasElement`

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:118

___

### canvasDimensions

• `get` **canvasDimensions**(): [`number`, `number`]

The [viewport](ThreeRoot.md#viewport)'s
{@link Viewport.canvasDimensions | canvasDimensions}

#### Returns

[`number`, `number`]

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:99

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

The [child](ThreeRoot.md#child)'s {@link Widget.dimensions | dimensions}

#### Returns

[`number`, `number`]

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:103

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/core/ThreeRoot.ts:64](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/core/ThreeRoot.ts#L64)

• `set` **enabled**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

#### Defined in

[src/core/ThreeRoot.ts:59](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/core/ThreeRoot.ts#L59)

___

### hasMobileTextInput

• `get` **hasMobileTextInput**(): `boolean`

Can [getTextInput](ThreeRoot.md#gettextinput) be called? True if [textInputHandler](ThreeRoot.md#textinputhandler) is
not null and [usingMobileTextInput](ThreeRoot.md#usingmobiletextinput) is false.

#### Returns

`boolean`

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:223

___

### maxDimensions

• `get` **maxDimensions**(): [`number`, `number`]

The [viewport](ThreeRoot.md#viewport)'s {@link Viewport.maxDimensions | maxDimensions}

#### Returns

[`number`, `number`]

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:93

• `set` **maxDimensions**(`maxDimensions`): `void`

The [viewport](ThreeRoot.md#viewport)'s {@link Viewport.maxDimensions | maxDimensions}

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxDimensions` | [`number`, `number`] |

#### Returns

`void`

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:94

___

### usingMobileTextInput

• `get` **usingMobileTextInput**(): `boolean`

Is [getTextInput](ThreeRoot.md#gettextinput) in use?

See [_mobileTextInUse](ThreeRoot.md#_mobiletextinuse).

#### Returns

`boolean`

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:229

## Methods

### clearDrivers

▸ **clearDrivers**(): `void`

Unregisters all [drivers](ThreeRoot.md#drivers) from the root, by calling
[unregisterDriver](ThreeRoot.md#unregisterdriver).

#### Returns

`void`

#### Inherited from

Root.clearDrivers

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:218

___

### clearFocus

▸ **clearFocus**(`focusType`): `void`

Clears the current [focus](ThreeRoot.md#_foci) of a given type. If there was a
focus set, [drivers](ThreeRoot.md#drivers) are notified by calling
{@link Driver.onFocusChanged}.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | `FocusType` |

#### Returns

`void`

#### Inherited from

Root.clearFocus

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:193

___

### dispatchEvent

▸ **dispatchEvent**(`event`): `void`

Dispatches an {@link Event} to this root's [child](ThreeRoot.md#child) by calling
{@link Widget.dispatchEvent}. Updates
[foci capturers](ThreeRoot.md#_focicapturers) and notifies [drivers](ThreeRoot.md#drivers) by
calling {@link Driver.onFocusCapturerChanged} if the capturer changes.
Does nothing if root is disabled.

Note that if an event with a focus is dispatched and no widget captures
the event due to the widget not existing anymore or being disabled, the
focus type of the event will be cleared in the root with
[clearFocus](ThreeRoot.md#clearfocus).

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Event` |

#### Returns

`void`

#### Inherited from

Root.dispatchEvent

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:152

___

### dropFocus

▸ **dropFocus**(`focusType`, `widget`): `void`

Clears the current [focus](ThreeRoot.md#_foci) of a given type if it is
currently set to a given widget. Achieved by calling [clearFocus](ThreeRoot.md#clearfocus).

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | `FocusType` |
| `widget` | `Widget` |

#### Returns

`void`

#### Inherited from

Root.dropFocus

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:187

___

### getFocus

▸ **getFocus**(`focusType`): ``null`` \| `Widget`

Gets the current [focus](ThreeRoot.md#_foci) of a given type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | `FocusType` |

#### Returns

``null`` \| `Widget`

#### Inherited from

Root.getFocus

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:197

___

### getFocusCapturer

▸ **getFocusCapturer**(`focusType`): ``null`` \| `Widget`

Gets the last [focus capturer](ThreeRoot.md#_focicapturers) of a given type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | `FocusType` |

#### Returns

``null`` \| `Widget`

#### Inherited from

Root.getFocusCapturer

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:201

___

### getTextInput

▸ **getTextInput**(`initialInput?`): `Promise`<``null`` \| `string`\>

Get text input from the user. Used for mobile where keyboard events are
hard to get.

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialInput?` | `string` |

#### Returns

`Promise`<``null`` \| `string`\>

If this is already in use ([usingMobileTextInput](ThreeRoot.md#usingmobiletextinput)), returns null, else, returns a string typed by the user.

#### Inherited from

Root.getTextInput

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:236

___

### paint

▸ **paint**(): `boolean`

#### Returns

`boolean`

#### Overrides

Root.paint

#### Defined in

[src/core/ThreeRoot.ts:86](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/core/ThreeRoot.ts#L86)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(): `void`

Do a post-layout update; calls [child](ThreeRoot.md#child)'s
{@link Widget.postLayoutUpdate} and [updatePointerStyle](ThreeRoot.md#updatepointerstyle). Does
nothing if root is disabled.

Call this before calling [paint](ThreeRoot.md#paint) and after calling
[resolveLayout](ThreeRoot.md#resolvelayout)

#### Returns

`void`

#### Inherited from

Root.postLayoutUpdate

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:169

___

### preLayoutUpdate

▸ **preLayoutUpdate**(): `void`

Do a pre-layout update; calls [drivers](ThreeRoot.md#drivers)' {@link Driver.update} and
[child](ThreeRoot.md#child)'s {@link Widget.preLayoutUpdate}. Does nothing if root is
disabled.

Call this before calling [resolveLayout](ThreeRoot.md#resolvelayout)

#### Returns

`void`

#### Inherited from

Root.preLayoutUpdate

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:160

___

### registerDriver

▸ **registerDriver**(`driver`): `void`

Registers a {@link Driver} to the root, adding it to the [drivers](ThreeRoot.md#drivers)
list and calling {@link Driver.onEnable}. If the driver was already
registered, nothing happens.

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | `Driver` |

#### Returns

`void`

#### Inherited from

Root.registerDriver

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:207

___

### requestFocus

▸ **requestFocus**(`focusType`, `widget`): `void`

Sets the current [focus](ThreeRoot.md#_foci) of a given type to a given widget.
If the focus changes, [clearFocus](ThreeRoot.md#clearfocus) is called and [drivers](ThreeRoot.md#drivers)
are notified by calling {@link Driver.onFocusChanged}.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | `FocusType` |
| `widget` | `Widget` |

#### Returns

`void`

#### Inherited from

Root.requestFocus

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:182

___

### resolveLayout

▸ **resolveLayout**(): `boolean`

#### Returns

`boolean`

#### Overrides

Root.resolveLayout

#### Defined in

[src/core/ThreeRoot.ts:68](https://github.com/playkostudios/canvas-ui-three/blob/47d5485/src/core/ThreeRoot.ts#L68)

___

### unregisterDriver

▸ **unregisterDriver**(`driver`): `void`

Unregisters a {@link Driver} from the root, removing it from the
[drivers](ThreeRoot.md#drivers) list and calling {@link Driver.onDisable}. If the driver
was not registered, nothing happens.

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | `Driver` |

#### Returns

`void`

#### Inherited from

Root.unregisterDriver

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:213

___

### updatePointerStyle

▸ **updatePointerStyle**(`newStyle?`): `void`

Calls [pointerStyleHandler](ThreeRoot.md#pointerstylehandler) if the [pointerStyle](ThreeRoot.md#pointerstyle) has changed
(checked by comparing with [_currentPointerStyle](ThreeRoot.md#_currentpointerstyle)). Also updates
[_currentPointerStyle](ThreeRoot.md#_currentpointerstyle). Can also be optionally supplied a new
pointer style.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newStyle?` | ``null`` \| `string` |

#### Returns

`void`

#### Inherited from

Root.updatePointerStyle

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:176
