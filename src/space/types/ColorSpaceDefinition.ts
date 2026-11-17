import type { ColorSpace } from "#space/ports/ColorSpace";

/**
 * The input of `createSpace`: a `ColorSpace` whose `gamut` may be `"self"`
 * for the created space.
 */
export interface ColorSpaceDefinition extends Omit<ColorSpace, "gamut"> {
  /**
   * The bounding RGB space, `"self"` for the created space, or absent
   * when unbounded.
   */
  readonly gamut?: ColorSpace | "self" | undefined;
}
