[canvas-ui-three](../README.md) / ThreeVirtualKeyboardRoot

# Class: ThreeVirtualKeyboardRoot

A {@link VirtualKeyboardRoot} but it extends [ThreeRoot](ThreeRoot.md) instead of
{@link Root}, so it can be used for three.js.

## Hierarchy

- [`ThreeRoot`](ThreeRoot.md)

  ↳ **`ThreeVirtualKeyboardRoot`**

## Table of contents

### Constructors

- [constructor](ThreeVirtualKeyboardRoot.md#constructor)

### Properties

- [\_currentPointerStyle](ThreeVirtualKeyboardRoot.md#_currentpointerstyle)
- [\_enabled](ThreeVirtualKeyboardRoot.md#_enabled)
- [\_foci](ThreeVirtualKeyboardRoot.md#_foci)
- [\_fociCapturers](ThreeVirtualKeyboardRoot.md#_focicapturers)
- [\_mobileTextInUse](ThreeVirtualKeyboardRoot.md#_mobiletextinuse)
- [child](ThreeVirtualKeyboardRoot.md#child)
- [drivers](ThreeVirtualKeyboardRoot.md#drivers)
- [keyboardDriver](ThreeVirtualKeyboardRoot.md#keyboarddriver)
- [mesh](ThreeVirtualKeyboardRoot.md#mesh)
- [pointerStyle](ThreeVirtualKeyboardRoot.md#pointerstyle)
- [pointerStyleHandler](ThreeVirtualKeyboardRoot.md#pointerstylehandler)
- [textInputHandler](ThreeVirtualKeyboardRoot.md#textinputhandler)
- [transformAlgorithm](ThreeVirtualKeyboardRoot.md#transformalgorithm)
- [viewport](ThreeVirtualKeyboardRoot.md#viewport)

### Accessors

- [canvas](ThreeVirtualKeyboardRoot.md#canvas)
- [canvasDimensions](ThreeVirtualKeyboardRoot.md#canvasdimensions)
- [dimensions](ThreeVirtualKeyboardRoot.md#dimensions)
- [enabled](ThreeVirtualKeyboardRoot.md#enabled)
- [hasMobileTextInput](ThreeVirtualKeyboardRoot.md#hasmobiletextinput)
- [maxDimensions](ThreeVirtualKeyboardRoot.md#maxdimensions)
- [usingMobileTextInput](ThreeVirtualKeyboardRoot.md#usingmobiletextinput)

### Methods

- [clearDrivers](ThreeVirtualKeyboardRoot.md#cleardrivers)
- [clearFocus](ThreeVirtualKeyboardRoot.md#clearfocus)
- [dispatchEvent](ThreeVirtualKeyboardRoot.md#dispatchevent)
- [dropFocus](ThreeVirtualKeyboardRoot.md#dropfocus)
- [getFocus](ThreeVirtualKeyboardRoot.md#getfocus)
- [getFocusCapturer](ThreeVirtualKeyboardRoot.md#getfocuscapturer)
- [getTextInput](ThreeVirtualKeyboardRoot.md#gettextinput)
- [paint](ThreeVirtualKeyboardRoot.md#paint)
- [postLayoutUpdate](ThreeVirtualKeyboardRoot.md#postlayoutupdate)
- [preLayoutUpdate](ThreeVirtualKeyboardRoot.md#prelayoutupdate)
- [registerDriver](ThreeVirtualKeyboardRoot.md#registerdriver)
- [requestFocus](ThreeVirtualKeyboardRoot.md#requestfocus)
- [resolveLayout](ThreeVirtualKeyboardRoot.md#resolvelayout)
- [unregisterDriver](ThreeVirtualKeyboardRoot.md#unregisterdriver)
- [updatePointerStyle](ThreeVirtualKeyboardRoot.md#updatepointerstyle)
- [updateVisibility](ThreeVirtualKeyboardRoot.md#updatevisibility)

## Constructors

### constructor

• **new ThreeVirtualKeyboardRoot**(`keyboardDriver`, `keyboardTemplate?`, `pointerStyleHandler?`, `transformAlgorithm?`, `theme?`)

Creates a new ThreeVirtualKeyboardRoot.

Sets [child](ThreeVirtualKeyboardRoot.md#child) to a new {@link VirtualKeyboard} with the given
keyboard and {@link VirtualKeyboardTemplate | keyboard template},
[pointerStyleHandler](ThreeVirtualKeyboardRoot.md#pointerstylehandler), [transformAlgorithm](ThreeVirtualKeyboardRoot.md#transformalgorithm) and
[child](ThreeVirtualKeyboardRoot.md#child)'s {@link Widget.inheritedTheme | inherited theme}.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `keyboardDriver` | `KeyboardDriver` | `undefined` | - |
| `keyboardTemplate` | `VirtualKeyboardTemplate` | `undefined` | By default, the virtual keyboard template is {@link defaultVirtualKeyboardTemplate} |
| `pointerStyleHandler` | ``null`` \| `PointerStyleHandler` | `null` | - |
| `transformAlgorithm` | ``null`` \| [`TransformAlgorithm`](../README.md#transformalgorithm) | `null` | - |
| `theme` | `Theme` | `undefined` | By default, the theme is {@link defaultTheme} |

#### Overrides

[ThreeRoot](ThreeRoot.md).[constructor](ThreeRoot.md#constructor)

#### Defined in

src/core/ThreeVirtualKeyboardRoot.ts:29

## Properties

### \_currentPointerStyle

• `Protected` **\_currentPointerStyle**: `string`

The actual current pointer style.

For internal use only.

See [pointerStyle](ThreeVirtualKeyboardRoot.md#pointerstyle)

#### Inherited from

[ThreeRoot](ThreeRoot.md).[_currentPointerStyle](ThreeRoot.md#_currentpointerstyle)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:40

___

### \_enabled

• `Protected` **\_enabled**: `boolean`

Is the Root enabled? For internal use only.

See [enabled](ThreeVirtualKeyboardRoot.md#enabled)

#### Inherited from

[ThreeRoot](ThreeRoot.md).[_enabled](ThreeRoot.md#_enabled)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:27

___

### \_foci

• `Protected` **\_foci**: `Map`<`FocusType`, ``null`` \| `Widget`\>

Current component foci (event targets for each focus type).

For internal use only.

See [requestFocus](ThreeVirtualKeyboardRoot.md#requestfocus), [dropFocus](ThreeVirtualKeyboardRoot.md#dropfocus), [clearFocus](ThreeVirtualKeyboardRoot.md#clearfocus) and
[getFocus](ThreeVirtualKeyboardRoot.md#getfocus)

#### Inherited from

[ThreeRoot](ThreeRoot.md).[_foci](ThreeRoot.md#_foci)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:54

___

### \_fociCapturers

• `Protected` **\_fociCapturers**: `Map`<`FocusType`, ``null`` \| `Widget`\>

Last capturer of each component focus (event targets for each focus
type).

For internal use only.

See [getFocusCapturer](ThreeVirtualKeyboardRoot.md#getfocuscapturer)

#### Inherited from

[ThreeRoot](ThreeRoot.md).[_fociCapturers](ThreeRoot.md#_focicapturers)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:63

___

### \_mobileTextInUse

• `Protected` **\_mobileTextInUse**: `boolean`

Is the mobile-friendly text input in use?

For internal use only.

See [hasMobileTextInput](ThreeVirtualKeyboardRoot.md#hasmobiletextinput), [usingMobileTextInput](ThreeVirtualKeyboardRoot.md#usingmobiletextinput) and
[getTextInput](ThreeVirtualKeyboardRoot.md#gettextinput)

#### Inherited from

[ThreeRoot](ThreeRoot.md).[_mobileTextInUse](ThreeRoot.md#_mobiletextinuse)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:80

___

### child

• `Readonly` **child**: `Widget`

The Root's child; the parent Widget of all widgets in this Root

#### Inherited from

[ThreeRoot](ThreeRoot.md).[child](ThreeRoot.md#child)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:17

___

### drivers

• `Protected` **drivers**: `Set`<`Driver`\>

The list of drivers registered to this root

#### Inherited from

[ThreeRoot](ThreeRoot.md).[drivers](ThreeRoot.md#drivers)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:21

___

### keyboardDriver

• `Private` `Readonly` **keyboardDriver**: `KeyboardDriver`

The {@link KeyboardDriver} used by this root's virtual keyboard.

#### Defined in

src/core/ThreeVirtualKeyboardRoot.ts:14

___

### mesh

• `Readonly` **mesh**: `Object3D`

The textured Mesh to be used for a Scene. Not actually a Mesh, but an
Object3D which contains a mesh so that the mesh can be resized without
interfering with the [transformAlgorithm](ThreeVirtualKeyboardRoot.md#transformalgorithm).

#### Inherited from

[ThreeRoot](ThreeRoot.md).[mesh](ThreeRoot.md#mesh)

#### Defined in

[src/core/ThreeRoot.ts:23](https://github.com/playkostudios/canvas-ui-three/blob/0013655/src/core/ThreeRoot.ts#L23)

___

### pointerStyle

• **pointerStyle**: `string`

The pointer style this root wants. Will be set on
[postLayoutUpdate](ThreeVirtualKeyboardRoot.md#postlayoutupdate) by [pointerStyleHandler](ThreeVirtualKeyboardRoot.md#pointerstylehandler)

#### Inherited from

[ThreeRoot](ThreeRoot.md).[pointerStyle](ThreeRoot.md#pointerstyle)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:32

___

### pointerStyleHandler

• **pointerStyleHandler**: ``null`` \| `PointerStyleHandler`

Pointer style handler, decides how to show the given pointer style.
Normally a function which sets the CSS cursor style of the Root's canvas

#### Inherited from

[ThreeRoot](ThreeRoot.md).[pointerStyleHandler](ThreeRoot.md#pointerstylehandler)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:45

___

### textInputHandler

• **textInputHandler**: ``null`` \| `TextInputHandler`

Handler for mobile-friendly text input. If not null, widgets that need
text may call this to get a string.

See [hasMobileTextInput](ThreeVirtualKeyboardRoot.md#hasmobiletextinput), [usingMobileTextInput](ThreeVirtualKeyboardRoot.md#usingmobiletextinput) and
[getTextInput](ThreeVirtualKeyboardRoot.md#gettextinput)

#### Inherited from

[ThreeRoot](ThreeRoot.md).[textInputHandler](ThreeRoot.md#textinputhandler)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:71

___

### transformAlgorithm

• **transformAlgorithm**: ``null`` \| [`TransformAlgorithm`](../README.md#transformalgorithm)

Transform algorithm; decides how to position the canvas' mesh in the
world. Can be changed later and is called on update.

#### Inherited from

[ThreeRoot](ThreeRoot.md).[transformAlgorithm](ThreeRoot.md#transformalgorithm)

#### Defined in

[src/core/ThreeRoot.ts:28](https://github.com/playkostudios/canvas-ui-three/blob/0013655/src/core/ThreeRoot.ts#L28)

___

### viewport

• `Protected` **viewport**: `Viewport`

The internal viewport. Manages drawing

#### Inherited from

[ThreeRoot](ThreeRoot.md).[viewport](ThreeRoot.md#viewport)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:19

## Accessors

### canvas

• `get` **canvas**(): `HTMLCanvasElement`

The [viewport](ThreeVirtualKeyboardRoot.md#viewport)'s {@link Viewport.canvas | canvas}

#### Returns

`HTMLCanvasElement`

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:118

___

### canvasDimensions

• `get` **canvasDimensions**(): [`number`, `number`]

The [viewport](ThreeVirtualKeyboardRoot.md#viewport)'s
{@link Viewport.canvasDimensions | canvasDimensions}

#### Returns

[`number`, `number`]

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:99

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

The [child](ThreeVirtualKeyboardRoot.md#child)'s {@link Widget.dimensions | dimensions}

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

[src/core/ThreeRoot.ts:64](https://github.com/playkostudios/canvas-ui-three/blob/0013655/src/core/ThreeRoot.ts#L64)

• `set` **enabled**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

#### Defined in

[src/core/ThreeRoot.ts:59](https://github.com/playkostudios/canvas-ui-three/blob/0013655/src/core/ThreeRoot.ts#L59)

___

### hasMobileTextInput

• `get` **hasMobileTextInput**(): `boolean`

Can [getTextInput](ThreeVirtualKeyboardRoot.md#gettextinput) be called? True if [textInputHandler](ThreeVirtualKeyboardRoot.md#textinputhandler) is
not null and [usingMobileTextInput](ThreeVirtualKeyboardRoot.md#usingmobiletextinput) is false.

#### Returns

`boolean`

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:223

___

### maxDimensions

• `get` **maxDimensions**(): [`number`, `number`]

The [viewport](ThreeVirtualKeyboardRoot.md#viewport)'s {@link Viewport.maxDimensions | maxDimensions}

#### Returns

[`number`, `number`]

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:93

• `set` **maxDimensions**(`maxDimensions`): `void`

The [viewport](ThreeVirtualKeyboardRoot.md#viewport)'s {@link Viewport.maxDimensions | maxDimensions}

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

Is [getTextInput](ThreeVirtualKeyboardRoot.md#gettextinput) in use?

See [_mobileTextInUse](ThreeVirtualKeyboardRoot.md#_mobiletextinuse).

#### Returns

`boolean`

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:229

## Methods

### clearDrivers

▸ **clearDrivers**(): `void`

Unregisters all [drivers](ThreeVirtualKeyboardRoot.md#drivers) from the root, by calling
[unregisterDriver](ThreeVirtualKeyboardRoot.md#unregisterdriver).

#### Returns

`void`

#### Inherited from

[ThreeRoot](ThreeRoot.md).[clearDrivers](ThreeRoot.md#cleardrivers)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:218

___

### clearFocus

▸ **clearFocus**(`focusType`): `void`

Clears the current [focus](ThreeVirtualKeyboardRoot.md#_foci) of a given type. If there was a
focus set, [drivers](ThreeVirtualKeyboardRoot.md#drivers) are notified by calling
{@link Driver.onFocusChanged}.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | `FocusType` |

#### Returns

`void`

#### Inherited from

[ThreeRoot](ThreeRoot.md).[clearFocus](ThreeRoot.md#clearfocus)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:193

___

### dispatchEvent

▸ **dispatchEvent**(`event`): `void`

Dispatches an {@link Event} to this root's [child](ThreeVirtualKeyboardRoot.md#child) by calling
{@link Widget.dispatchEvent}. Updates
[foci capturers](ThreeVirtualKeyboardRoot.md#_focicapturers) and notifies [drivers](ThreeVirtualKeyboardRoot.md#drivers) by
calling {@link Driver.onFocusCapturerChanged} if the capturer changes.
Does nothing if root is disabled.

Note that if an event with a focus is dispatched and no widget captures
the event due to the widget not existing anymore or being disabled, the
focus type of the event will be cleared in the root with
[clearFocus](ThreeVirtualKeyboardRoot.md#clearfocus).

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Event` |

#### Returns

`void`

#### Inherited from

[ThreeRoot](ThreeRoot.md).[dispatchEvent](ThreeRoot.md#dispatchevent)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:152

___

### dropFocus

▸ **dropFocus**(`focusType`, `widget`): `void`

Clears the current [focus](ThreeVirtualKeyboardRoot.md#_foci) of a given type if it is
currently set to a given widget. Achieved by calling [clearFocus](ThreeVirtualKeyboardRoot.md#clearfocus).

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | `FocusType` |
| `widget` | `Widget` |

#### Returns

`void`

#### Inherited from

[ThreeRoot](ThreeRoot.md).[dropFocus](ThreeRoot.md#dropfocus)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:187

___

### getFocus

▸ **getFocus**(`focusType`): ``null`` \| `Widget`

Gets the current [focus](ThreeVirtualKeyboardRoot.md#_foci) of a given type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | `FocusType` |

#### Returns

``null`` \| `Widget`

#### Inherited from

[ThreeRoot](ThreeRoot.md).[getFocus](ThreeRoot.md#getfocus)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:197

___

### getFocusCapturer

▸ **getFocusCapturer**(`focusType`): ``null`` \| `Widget`

Gets the last [focus capturer](ThreeVirtualKeyboardRoot.md#_focicapturers) of a given type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | `FocusType` |

#### Returns

``null`` \| `Widget`

#### Inherited from

[ThreeRoot](ThreeRoot.md).[getFocusCapturer](ThreeRoot.md#getfocuscapturer)

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

If this is already in use ([usingMobileTextInput](ThreeVirtualKeyboardRoot.md#usingmobiletextinput)), returns null, else, returns a string typed by the user.

#### Inherited from

[ThreeRoot](ThreeRoot.md).[getTextInput](ThreeRoot.md#gettextinput)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:236

___

### paint

▸ **paint**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ThreeRoot](ThreeRoot.md).[paint](ThreeRoot.md#paint)

#### Defined in

[src/core/ThreeRoot.ts:86](https://github.com/playkostudios/canvas-ui-three/blob/0013655/src/core/ThreeRoot.ts#L86)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(): `void`

Do a post-layout update; calls [child](ThreeVirtualKeyboardRoot.md#child)'s
{@link Widget.postLayoutUpdate} and [updatePointerStyle](ThreeVirtualKeyboardRoot.md#updatepointerstyle). Does
nothing if root is disabled.

Call this before calling [paint](ThreeVirtualKeyboardRoot.md#paint) and after calling
[resolveLayout](ThreeVirtualKeyboardRoot.md#resolvelayout)

#### Returns

`void`

#### Inherited from

[ThreeRoot](ThreeRoot.md).[postLayoutUpdate](ThreeRoot.md#postlayoutupdate)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:169

___

### preLayoutUpdate

▸ **preLayoutUpdate**(): `void`

Do a pre-layout update; calls [drivers](ThreeVirtualKeyboardRoot.md#drivers)' {@link Driver.update} and
[child](ThreeVirtualKeyboardRoot.md#child)'s {@link Widget.preLayoutUpdate}. Does nothing if root is
disabled.

Call this before calling [resolveLayout](ThreeVirtualKeyboardRoot.md#resolvelayout)

#### Returns

`void`

#### Inherited from

[ThreeRoot](ThreeRoot.md).[preLayoutUpdate](ThreeRoot.md#prelayoutupdate)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:160

___

### registerDriver

▸ **registerDriver**(`driver`): `void`

Registers a {@link Driver} to the root, adding it to the [drivers](ThreeVirtualKeyboardRoot.md#drivers)
list and calling {@link Driver.onEnable}. If the driver was already
registered, nothing happens.

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | `Driver` |

#### Returns

`void`

#### Inherited from

[ThreeRoot](ThreeRoot.md).[registerDriver](ThreeRoot.md#registerdriver)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:207

___

### requestFocus

▸ **requestFocus**(`focusType`, `widget`): `void`

Sets the current [focus](ThreeVirtualKeyboardRoot.md#_foci) of a given type to a given widget.
If the focus changes, [clearFocus](ThreeVirtualKeyboardRoot.md#clearfocus) is called and [drivers](ThreeVirtualKeyboardRoot.md#drivers)
are notified by calling {@link Driver.onFocusChanged}.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | `FocusType` |
| `widget` | `Widget` |

#### Returns

`void`

#### Inherited from

[ThreeRoot](ThreeRoot.md).[requestFocus](ThreeRoot.md#requestfocus)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:182

___

### resolveLayout

▸ **resolveLayout**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ThreeRoot](ThreeRoot.md).[resolveLayout](ThreeRoot.md#resolvelayout)

#### Defined in

[src/core/ThreeRoot.ts:68](https://github.com/playkostudios/canvas-ui-three/blob/0013655/src/core/ThreeRoot.ts#L68)

___

### unregisterDriver

▸ **unregisterDriver**(`driver`): `void`

Unregisters a {@link Driver} from the root, removing it from the
[drivers](ThreeVirtualKeyboardRoot.md#drivers) list and calling {@link Driver.onDisable}. If the driver
was not registered, nothing happens.

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | `Driver` |

#### Returns

`void`

#### Inherited from

[ThreeRoot](ThreeRoot.md).[unregisterDriver](ThreeRoot.md#unregisterdriver)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:213

___

### updatePointerStyle

▸ **updatePointerStyle**(`newStyle?`): `void`

Calls [pointerStyleHandler](ThreeVirtualKeyboardRoot.md#pointerstylehandler) if the [pointerStyle](ThreeVirtualKeyboardRoot.md#pointerstyle) has changed
(checked by comparing with [_currentPointerStyle](ThreeVirtualKeyboardRoot.md#_currentpointerstyle)). Also updates
[_currentPointerStyle](ThreeVirtualKeyboardRoot.md#_currentpointerstyle). Can also be optionally supplied a new
pointer style.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newStyle?` | ``null`` \| `string` |

#### Returns

`void`

#### Inherited from

[ThreeRoot](ThreeRoot.md).[updatePointerStyle](ThreeRoot.md#updatepointerstyle)

#### Defined in

node_modules/canvas-ui/lib/core/Root.d.ts:176

___

### updateVisibility

▸ **updateVisibility**(): `void`

Update the visibility of this root; if the keyboard driver has no focused
root, then the root is disabled, else, it is enabled. Call this method
on every frame to automatically enable/disable the root if needed

#### Returns

`void`

#### Defined in

src/core/ThreeVirtualKeyboardRoot.ts:39
