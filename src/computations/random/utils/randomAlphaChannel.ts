import { isArray, isNumber } from "@auaust/toolkit/guard";
import { randomFloat } from "@auaust/toolkit/random";
import type { ChannelRange } from "#formats/channels/index";

export function randomAlphaChannel(range?: ChannelRange | undefined): number {
  if (isNumber(range)) {
    return range;
  }

  if (isArray(range)) {
    return randomFloat(range[0], range[1]);
  }

  return 1;
}
