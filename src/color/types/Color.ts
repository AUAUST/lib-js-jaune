import type { ColorSpace } from "#space/ports/ColorSpace";
import type { Coords } from "#space/types/Coords";

/**
 * A frozen color: coordinates in a color space and an alpha.
 */
export interface Color {
  /**
   * The space `coords` are expressed in.
   */
  readonly space: ColorSpace;
  /**
   * Finite, unclamped coordinates in the order of `space.channels`; frozen.
   */
  readonly coords: Coords;
  /**
   * Opacity, finite and clamped to [0, 1].
   */
  readonly alpha: number;
}
