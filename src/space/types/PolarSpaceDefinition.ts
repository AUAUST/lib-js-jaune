import type { ColorSpace } from "#space/ports/ColorSpace";

/**
 * The input of `createPolarSpace`: the polar form of a Lab-like `base` whose
 * coordinates are lightness and two opponent axes.
 */
export interface PolarSpaceDefinition {
  /**
   * CSS Color 4 identifier, such as `"lch"` or `"oklch"`.
   */
  readonly id: string;
  /**
   * The Lab-like space the polar coordinates convert into.
   */
  readonly base: ColorSpace;
  /**
   * Reference range of the chroma channel.
   */
  readonly chromaRange: readonly [number, number];
  /**
   * Chroma below which a color has no hue.
   */
  readonly achromaticThreshold: number;
}
