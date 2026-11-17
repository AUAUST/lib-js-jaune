import type { ColorType } from "#color/types/ColorType";
import type { ColorTypeMap } from "#color/types/ColorTypeMap";

/**
 * Represents a color in any of the various supported formats.
 */
export type ColorValue = ColorTypeMap[ColorType];
