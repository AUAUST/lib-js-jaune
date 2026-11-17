import type { ColorTypeMap } from "#color/types/ColorTypeMap";

/**
 * The known color types.
 *
 * `channels` - An object of each color channel. `color` - A `Color` instance.
 * `hex` - A HEX color string. `named` - A CSS color name. `rgb` - A tuple
 * representing RGB color channels.
 */
export type ColorType = keyof ColorTypeMap;
