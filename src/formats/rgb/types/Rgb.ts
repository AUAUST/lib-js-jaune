// @debt `readonly number[]` widens the tuple to any number list for ergonomics, so arity is never checked statically.
/**
 * A tuple representing RGB color channels.
 *
 * The first three elements are integers between 0 and 255 representing the red,
 * green, and blue channels, respectively. The fourth element is a number between
 * 0 and 1 representing the alpha channel.
 */
export type Rgb =
  | readonly [r: number, g: number, b: number, a?: number]
  | readonly number[];
