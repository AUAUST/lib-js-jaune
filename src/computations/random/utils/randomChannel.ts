import { isNumber } from "@auaust/toolkit/guard";
import { randomFloat } from "@auaust/toolkit/random";

import type { ChannelRange } from "#computations/random/types/ChannelRange";

/**
 * The fixed value, or a random float within the inclusive bounds.
 */
export function randomChannel(range: ChannelRange): number {
  return isNumber(range) ? range : randomFloat(range[0], range[1]);
}
