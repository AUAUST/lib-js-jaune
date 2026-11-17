import { isArray, isNumber } from "@auaust/toolkit/guard";
import { randomFloat } from "@auaust/toolkit/random";

import type { ChannelRange } from "#computations/random/types/ChannelRange";

/**
 * Returns the fixed value, a random float within the bounds, or 1 without a range.
 */
export function randomAlphaChannel(range?: ChannelRange): number {
  if (isNumber(range)) {
    return range;
  }

  if (isArray(range)) {
    return randomFloat(range[0], range[1]);
  }

  return 1;
}
