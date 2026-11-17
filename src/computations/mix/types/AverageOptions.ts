import type { ColorSpace } from "#space/ports/ColorSpace";

/**
 * How `average` weighs and combines colors.
 */
export interface AverageOptions {
  /**
   * One non-negative weight per color, normalized; equal weights by default.
   */
  readonly weights?: readonly number[] | undefined;
  /**
   * The averaging space, and the space of the result.
   */
  readonly space?: ColorSpace | undefined;
}
