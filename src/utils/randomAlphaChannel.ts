import { A, N } from "@auaust/primitive-kit";
import type { ChannelRange } from "~/types";

export function randomAlphaChannel(range?: ChannelRange | undefined): number {
  if (N.is(range)) {
    return range;
  }

  if (A.is(range)) {
    return N.randFloat(range[0], range[1]);
  }

  return 1;
}
