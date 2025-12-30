import { isArray } from "@auaust/primitive-kit/arrays";
import { isNumber, randomFloat } from "@auaust/primitive-kit/numbers";
import type { ChannelRange } from "~/types";

export function randomAlphaChannel(range?: ChannelRange | undefined): number {
  if (isNumber(range)) {
    return range;
  }

  if (isArray(range)) {
    return randomFloat(range[0], range[1]);
  }

  return 1;
}
