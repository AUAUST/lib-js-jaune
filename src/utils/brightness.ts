import type { ColorChannels } from "~/types";

/**
 * Returns the brightness of a color normalized to the range [0, 1].
 *
 * @see https://alienryderflex.com/hsp.html
 */
export function brightness(channels: ColorChannels): number {
  const { r, g, b } = channels;

  return Math.sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2) / 255;
}

/**
 * Returns whether the color is bright, as in its brightness is greater than 0.5.
 */
export function isBright(channels: ColorChannels): boolean {
  return brightness(channels) > 0.5;
}

/**
 * Returns whether the color is dark, as in its brightness is less than or equal to 0.5.
 */
export function isDark(channels: ColorChannels): boolean {
  return brightness(channels) <= 0.5;
}
