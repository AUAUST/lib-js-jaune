import type { ColorEncoding } from "#color/ports/ColorEncoding";
import type { GradientOptions } from "#computations/mix/types/GradientOptions";

/**
 * How `gradient` samples and encodes its colors.
 */
export interface GradientColorsOptions<T> extends GradientOptions {
  /**
   * The number of colors yielded, at least 2.
   */
  readonly count: number;
  /**
   * The encoding each color is yielded in.
   */
  readonly encoding?: ColorEncoding<T> | undefined;
}
