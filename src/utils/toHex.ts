import { isNumber, max, round } from "@auaust/primitive-kit/numbers";
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
    (isNumber(a) && a < 1
      ? round(max(0, a) * 255)
          .toString(16)
          .padStart(2, "0")
      : "")
  );
}
