/**
 * An object of each color channel.
 *
 * `r`, `g`, and `b` are integers between 0 and 255 representing the red, green,
 * and blue channels, respectively. `a` is a number between 0 and 1 representing
 * the alpha channel. It may contain metadata about the color and its handling
 * by the color parser.
 */
export interface ColorChannels {
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
  readonly a?: number | undefined;

  /**
   * Whether any of the channels have been transformed by the color parser.
   */
  readonly isTransformed?: boolean;

  /**
   * Whether the color is the fallback color, which is used when the
   * input is invalid.
   */
  readonly isFallback?: boolean;
}
