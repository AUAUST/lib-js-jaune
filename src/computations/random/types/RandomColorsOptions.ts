import type { ColorEncoding } from "#color/ports/ColorEncoding";
import type { RandomColorOptions } from "#computations/random/types/RandomColorOptions";

/**
 * How `randomColors` draws and encodes its colors.
 */
export interface RandomColorsOptions<T> extends RandomColorOptions {
  /**
   * The number of colors yielded.
   */
  readonly count: number;
  /**
   * The encoding each color is yielded in.
   */
  readonly encoding?: ColorEncoding<T> | undefined;
}
