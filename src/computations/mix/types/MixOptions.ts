import type { HueInterpolation } from "#computations/mix/types/HueInterpolation";
import type { ColorSpace } from "#space/ports/ColorSpace";

/**
 * How `mix` interpolates two colors.
 */
export interface MixOptions {
  /**
   * The interpolation space, and the space of the result.
   */
  readonly space?: ColorSpace | undefined;
  /**
   * How a hue channel of `space` is interpolated.
   */
  readonly hue?: HueInterpolation | undefined;
}
