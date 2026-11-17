import { isArray, isNumber } from "@auaust/toolkit/guard";
import { randomInteger } from "@auaust/toolkit/random";
import type { ChannelRange } from "#formats/channels/index";

export function randomRgbChannel(range?: ChannelRange | undefined): number {
  if (isNumber(range)) {
    return range;
  }

  if (isArray(range)) {
    return randomInteger(range[0], range[1]);
  }

  return randomInteger(0, 255);
}
