import type { ChannelRange } from "#computations/random/types/ChannelRange";
import type { ChannelRanges } from "#computations/random/types/ChannelRanges";
import type { ColorSpace } from "#space/ports/ColorSpace";

/**
 * How `randomColor` draws a color.
 */
export interface RandomColorOptions {
  /**
   * The space coordinates are drawn in.
   */
  readonly space?: ColorSpace | undefined;
  /**
   * The range of each coordinate.
   */
  readonly ranges?: ChannelRanges | undefined;
  /**
   * The range of the alpha.
   */
  readonly alpha?: ChannelRange | undefined;
}
