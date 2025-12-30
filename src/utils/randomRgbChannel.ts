import { isArray } from "@auaust/primitive-kit/arrays";
import { isNumber, randomInteger } from "@auaust/primitive-kit/numbers";
import type { ChannelRange } from "~/types";

export function randomRgbChannel(range?: ChannelRange | undefined): number {
  if (isNumber(range)) {
    return range;
  }

  if (isArray(range)) {
    return randomInteger(range[0], range[1]);
  }

  return randomInteger(0, 255);
}
