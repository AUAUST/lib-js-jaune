import { A, N } from "@auaust/primitive-kit";
import type { ColorChannels } from "~/types";
import { toColorChannels } from "./channels";

export type ChannelRange = number | [min: number, max: number];

function randomRgbChannel(range?: ChannelRange | undefined): number {
  if (N.is(range)) {
    return range;
  }

  if (A.is(range)) {
    return N.randInt(range[0], range[1]);
  }

  return N.randInt(0, 255);
}

function randomAlphaChannel(range?: ChannelRange | undefined): number {
  if (N.is(range)) {
    return range;
  }

  if (A.is(range)) {
    return N.randFloat(range[0], range[1]);
  }

  return 1;
}

/**
 * Generates a random color.
 *
 * Specific values or ranges can be provided for each channel.
 * If a range is provided, the value will be randomly selected from within that range.
 * If a single value is provided, that value will be used for the channel.
 * If no value is provided, the channel will be randomly selected from 0 to 255 for RGB channels and be set to 1 for the alpha channel.
 */
export function random({
  r,
  g,
  b,
  a,
}: {
  r?: ChannelRange;
  g?: ChannelRange;
  b?: ChannelRange;
  a?: ChannelRange;
} = {}): ColorChannels {
  return toColorChannels(
    randomRgbChannel(r),
    randomRgbChannel(g),
    randomRgbChannel(b),
    randomAlphaChannel(a)
  );
}
