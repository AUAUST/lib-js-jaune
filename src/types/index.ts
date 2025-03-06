import type { namedColors } from "~/utils/namedColors";
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
export type Rgb = readonly [number, number, number, number?];

/**
 * A CSS color name.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/named-color
 */
export type NamedColor = keyof typeof namedColors;

/**
 * An object of each color channel.
 *
 * `r`, `g`, and `b` are integers between 0 and 255 representing the red, green, and blue channels, respectively.
 * `a` is a number between 0 and 1 representing the alpha channel.
 */
export type ColorChannels = {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a?: number;
};

/**
 * Represents a color in various formats.
 */
export type ColorValue = Hex | Rgb | NamedColor | ColorChannels;
