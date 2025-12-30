import { N } from "@auaust/primitive-kit";
import type { ColorChannels, Hex } from "~/types";
import { toRgbChannel } from "~/utils";

/**
 * Returns the corresponding hex string of a color channels object.
 *
 * If the alpha channel is 1, it will be omitted.
 */
export function toHex(channels: ColorChannels): Hex {
  const { r, g, b, a } = channels;

  return (
    "#" +
    (
      (1 << 24) +
      (toRgbChannel(r) << 16) +
      (toRgbChannel(g) << 8) +
      toRgbChannel(b)
    )
      .toString(16)
      .substring(1) +
    (N.is(a) && a < 1
      ? N.round(N.max(0, a) * 255)
          .toString(16)
          .padStart(2, "0")
      : "")
  );
}
