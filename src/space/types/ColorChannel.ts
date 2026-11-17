/**
 * A coordinate axis of a color space.
 */
export interface ColorChannel {
  /**
   * Short channel name, such as `"r"`, `"l"` or `"h"`.
   */
  readonly name: string;
  /**
   * Reference range of the channel's values; never used as a clamp.
   */
  readonly range: readonly [number, number];
  /**
   * Whether the channel is an angle in degrees.
   */
  readonly isHue: boolean;
}
