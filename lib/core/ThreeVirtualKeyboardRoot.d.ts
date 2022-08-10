import { KeyboardDriver, VirtualKeyboardRootProperties } from '@rafern/canvas-ui';
import { ThreeRoot, ThreeRootProperties } from './ThreeRoot';
/**
 * A {@link VirtualKeyboardRoot} but it extends {@link ThreeRoot} instead of
 * {@link Root}, so it can be used for three.js.
 *
 * @category Core
 */
export declare class ThreeVirtualKeyboardRoot extends ThreeRoot {
    /** The {@link KeyboardDriver} used by this root's virtual keyboard. */
    private readonly keyboardDriver;
    /**
     * Creates a new ThreeVirtualKeyboardRoot.
     *
     * Sets {@link child} to a new {@link VirtualKeyboard} with the given
     * keyboard and {@link VirtualKeyboardTemplate | keyboard template},
     * {@link pointerStyleHandler}, {@link transformAlgorithm} and
     * {@link child}'s {@link Widget.inheritedTheme | inherited theme}.
     */
    constructor(keyboardDriver: KeyboardDriver, properties?: VirtualKeyboardRootProperties & ThreeRootProperties);
    /**
     * Update the visibility of this root; if the keyboard driver has no focused
     * root, then the root is disabled, else, it is enabled. Call this method
     * on every frame to automatically enable/disable the root if needed
     */
    updateVisibility(): void;
}
