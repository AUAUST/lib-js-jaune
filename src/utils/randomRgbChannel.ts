import { A, N } from "@auaust/primitive-kit";
import type { ChannelRange } from "~/types";

export function randomRgbChannel(range?: ChannelRange | undefined): number {
  if (N.is(range)) {
    return range;
  }

  if (A.is(range)) {
    return N.randInt(range[0], range[1]);
  }

  return N.randInt(0, 255);
}
