import { N } from "@auaust/primitive-kit";
import type { ColorChannels } from "~/types";
import { toColorChannels } from "./channels";

/**
 * Returns the linearized value of a sRGB channel.
 *
 * @see https://stackoverflow.com/a/56678483
 */
export function sRGBtoLinear(channel: number) {
  if (channel <= 0.04045) {
    return channel / 12.92;
  }

  return Math.pow((channel + 0.055) / 1.055, 2.4);
}

/**
 * Returns the gamma corrected sRGB value of a linear channel.
 *
 * @see sRGBtoLinear
 */
export function linearTosRGB(channel: number) {
  if (channel <= 0.04045 / 12.92) {
    return channel * 12.92;
  }

  return 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;
}

/**
 * Returns the luminance of a color normalized to the range [0, 1].
 *
 * @see https://stackoverflow.com/a/56678483
 * @see https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 */
export function luminance(channels: ColorChannels) {
  let { r, g, b } = channels;

  [r, g, b] = [r, g, b].map((v) => sRGBtoLinear(v / 255));

  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

/**
 * Returns the perceived brightness of a color normalized to the range [0, 1].
 *
 * @see https://stackoverflow.com/a/56678483
 */
export function brightness(channels: ColorChannels): number {
  const l = luminance(channels);

  if (l <= 216 / 24389) {
    return l * (24389 / 27);
  }

  return (Math.pow(l, 1 / 3) * 116 - 16) / 100;
}

/** Returns whether the color is bright, as in its brightness is greater than 0.5 or the provided threshold. */
export function isBright(channels: ColorChannels, threshold = 0.5): boolean {
  return brightness(channels) > threshold;
}

/** Returns whether the color is dark, as in its brightness is less than or equal to 0.5 or the provided threshold. */
export function isDark(channels: ColorChannels, threshold = 0.5): boolean {
  return brightness(channels) <= threshold;
}

/**
 * Returns the contrast ratio between two colors.
 *
 * @see https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 */
export function contrast(channelsA: ColorChannels, channelsB: ColorChannels) {
  const [darkest, brightest] = N.minMax(
    luminance(channelsA),
    luminance(channelsB)
  );

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Returns the grayscale equivalent of a color as a new color channels object.
 */
export function grayscale(channels: ColorChannels): ColorChannels {
  // Reverse gamma correction from luminance
  const gray = linearTosRGB(luminance(channels)) * 255;

  return toColorChannels(gray, gray, gray, channels.a);
}
