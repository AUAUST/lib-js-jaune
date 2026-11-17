import type { ColorSpace } from "#space/ports/ColorSpace";

/**
 * A gradient sampled at any position.
 */
export interface Gradient {
  /**
   * The space `sample` writes coordinates in.
   */
  readonly space: ColorSpace;
  /**
   * Writes the coordinates in `space` at `position`, clamped to [0, 1], into
   * `out` and returns the alpha; allocates nothing.
   */
  sample(position: number, out: [number, number, number]): number;
}
