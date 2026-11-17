import { pow } from "@auaust/toolkit/math";

/**
 * Returns the gamma corrected sRGB value of a linear channel.
 */
export function linearTosRGB(channel: number) {
  if (channel <= 0.04045 / 12.92) {
    return channel * 12.92;
  }

  return 1.055 * pow(channel, 1 / 2.4) - 0.055;
}
