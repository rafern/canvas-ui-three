import { KeyboardDriver, VirtualKeyboardRootProperties, Margin } from '@rafern/canvas-ui';
import { VirtualKeyboard, defaultVirtualKeyboardTemplate } from '@rafern/canvas-ui';
import { ThreeRoot, ThreeRootProperties } from './ThreeRoot';

/**
 * A {@link VirtualKeyboardRoot} but it extends {@link ThreeRoot} instead of
 * {@link Root}, so it can be used for three.js.
 *
 * @category Core
 */
export class ThreeVirtualKeyboardRoot extends ThreeRoot {
    /** The {@link KeyboardDriver} used by this root's virtual keyboard. */
    private readonly keyboardDriver: KeyboardDriver;

    /**
     * Creates a new ThreeVirtualKeyboardRoot.
     *
     * Sets {@link Root#child} to a new {@link VirtualKeyboard} with the given
     * keyboard and {@link VirtualKeyboardTemplate | keyboard template},
     * {@link Root#pointerStyleHandler}, {@link ThreeRoot#transformAlgorithm}
     * and {@link Root#child}'s {@link Widget#inheritedTheme | inherited theme}.
     */
    constructor(keyboardDriver: KeyboardDriver, properties?: VirtualKeyboardRootProperties & ThreeRootProperties) {
        super(
            new Margin(
                new VirtualKeyboard(
                    keyboardDriver,
                    properties?.keyboardTemplate ?? defaultVirtualKeyboardTemplate
                ),
            ),
            properties
        );
        this.keyboardDriver = keyboardDriver;
    }

    /**
     * Update the visibility of this root; if the keyboard driver has no focused
     * root, then the root is disabled, else, it is enabled. Call this method
     * on every frame to automatically enable/disable the root if needed
     */
    updateVisibility(): void {
        // Update visibility of root by enabling/disabling it
        this.enabled = this.keyboardDriver.needsInput;
    }
}