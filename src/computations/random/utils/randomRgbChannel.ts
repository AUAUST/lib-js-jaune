import { isArray, isNumber } from "@auaust/toolkit/guard";
import { randomInteger } from "@auaust/toolkit/random";

import type { ChannelRange } from "#computations/random/types/ChannelRange";

/**
 * Returns the fixed value, a random integer within the bounds, or a random
 * integer from 0 to 255 without a range.
 */
export function randomRgbChannel(range?: ChannelRange): number {
  if (isNumber(range)) {
    return range;
  }

  if (isArray(range)) {
    return randomInteger(range[0], range[1]);
  }

  return randomInteger(0, 255);
}
