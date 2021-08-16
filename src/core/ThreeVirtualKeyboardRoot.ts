import type { Theme, KeyboardDriver, VirtualKeyboardTemplate, PointerStyleHandler } from '@rafern/canvas-ui';
import { VirtualKeyboard, defaultVirtualKeyboardTemplate } from '@rafern/canvas-ui';
import type { TransformAlgorithm } from './TransformAlgorithm';
import { ThreeRoot } from './ThreeRoot';

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
     * Sets {@link child} to a new {@link VirtualKeyboard} with the given
     * keyboard and {@link VirtualKeyboardTemplate | keyboard template},
     * {@link pointerStyleHandler}, {@link transformAlgorithm} and
     * {@link child}'s {@link Widget.inheritedTheme | inherited theme}.
     *
     * @param keyboardTemplate By default, the virtual keyboard template is {@link defaultVirtualKeyboardTemplate}
     * @param theme If none supplied, then the default theme found in {@link Theme.constructor} is used
     */
    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate: VirtualKeyboardTemplate = defaultVirtualKeyboardTemplate, pointerStyleHandler: PointerStyleHandler | null = null, transformAlgorithm: TransformAlgorithm | null = null, theme?: Theme) {
        super(new VirtualKeyboard(keyboardDriver, keyboardTemplate), pointerStyleHandler, transformAlgorithm, theme);
        this.keyboardDriver = keyboardDriver;
    }

    /**
     * Update the visibility of this root; if the keyboard driver has no focused
     * root, then the root is disabled, else, it is enabled. Call this method
     * on every frame to automatically enable/disable the root if needed
     */
    updateVisibility(): void {
        // Update visibility of root by enabling/disabling it
        this.enabled = this.keyboardDriver.getFocusedRoot() !== null;
    }
}