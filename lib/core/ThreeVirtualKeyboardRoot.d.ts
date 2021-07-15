import type { Theme, KeyboardDriver, VirtualKeyboardTemplate, PointerStyleHandler } from 'canvas-ui';
import type { TransformAlgorithm } from './TransformAlgorithm';
import { ThreeRoot } from './ThreeRoot';
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
     *
     * @param keyboardTemplate By default, the virtual keyboard template is
     * {@link defaultVirtualKeyboardTemplate}
     *
     * @param theme By default, the theme is {@link defaultTheme}
     */
    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate?: VirtualKeyboardTemplate, pointerStyleHandler?: PointerStyleHandler | null, transformAlgorithm?: TransformAlgorithm | null, theme?: Theme);
    /**
     * Update the visibility of this root; if the keyboard driver has no focused
     * root, then the root is disabled, else, it is enabled. Call this method
     * on every frame to automatically enable/disable the root if needed
     */
    updateVisibility(): void;
}
