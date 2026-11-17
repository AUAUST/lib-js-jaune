import type { MixOptions } from "#computations/mix/types/MixOptions";

/**
 * How `createGradient` interpolates between stops.
 */
export interface GradientOptions extends MixOptions {
  /**
   * The CSS transition hint between every pair of stops: the fraction of the
   * span where the two colors mix half and half, in (0, 1).
   */
  readonly hint?: number | undefined;
}
