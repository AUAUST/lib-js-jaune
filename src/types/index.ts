import { Color } from "~/classes/Color";
import type { namedColorsMap } from "~/utils/namedColors";

/**
 * The known color types.
 *
 * `hex` - A HEX color string.
 * `rgb` - A tuple representing RGB color channels.
 * `named` - A CSS color name.
 * `channels` - An object of each color channel.
 * `color` - A `Color` instance.
 */
export type ColorType = "hex" | "rgb" | "named" | "channels" | "color";

/**
 * A HEX color string.
 *
 * It must start with a hash (#) character followed by 3, 4, 6, or 8 hexadecimal digits.
 */
export type Hex = `#${string}` | (string & {});

/**
 * A tuple representing RGB color channels.
 *
 * The first three elements are integers between 0 and 255 representing the red, green, and blue channels, respectively.
 * The fourth element is a number between 0 and 1 representing the alpha channel.
 */
export type Rgb =
  | readonly [r: number, g: number, b: number, a?: number]
  | readonly number[]; // The above tuple type alone would make the type too annoying to use

/**
 * A CSS color name.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/named-color
 */
export type NamedColor = keyof typeof namedColorsMap;
export type MaybeNamedColor = NamedColor | (string & {});

/**
 * An object of each color channel.
 *
 * `r`, `g`, and `b` are integers between 0 and 255 representing the red, green, and blue channels, respectively.
 * `a` is a number between 0 and 1 representing the alpha channel.
 */
export type ColorChannels = {
  /**
   * The red channel.
   */
  readonly r: number;

  /**
   * The green channel.
   */
  readonly g: number;

  /**
   * The blue channel.
   */
  readonly b: number;

  /**
   * The alpha channel.
   */
  readonly a?: number;

  /**
   * Whether any of the channels have been transformed by the color parser.
   */
  readonly isTransformed?: boolean;

  /**
   * Whether the color is the fallback color, which is used when the input is invalid.
   */
  readonly isFallback?: boolean;
};

/**
 * Represents a color in various formats.
 */
export type ColorValue = Hex | Rgb | NamedColor | ColorChannels | Color;
