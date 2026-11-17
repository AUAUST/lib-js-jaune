import { abs, floor, max, min } from "@auaust/toolkit/math";

import { toColorChannels, type ColorChannels } from "#formats/channels/index";

/**
 * Returns the color with its HSL hue rotated by `degrees`, preserving its HSL
 * saturation and lightness and its alpha channel. Negative degrees rotate
 * backwards; a color without chroma is returned unchanged.
 */
export function hueRotate(
  channels: ColorChannels,
  degrees: number,
): ColorChannels {
  const { r, g, b, a } = channels;
  const highest = max(r, g, b);
  const lowest = min(r, g, b);
  const chroma = highest - lowest;

  if (chroma === 0) {
    return toColorChannels(r, g, b, a);
  }

  // @debt hue extraction and HSL-to-RGB conversion live here; an HSL format domain would own them.
  const hue = highest === r
    ? (g - b) / chroma
    : highest === g
      ? (b - r) / chroma + 2
      : (r - g) / chroma + 4;

  const rotated = (((hue + degrees / 60) % 6) + 6) % 6;
  const x = chroma * (1 - abs((rotated % 2) - 1)) + lowest;
  const c = chroma + lowest;

  switch (floor(rotated)) {
    case 0: {
      return toColorChannels(c, x, lowest, a);
    }

    case 1: {
      return toColorChannels(x, c, lowest, a);
    }

    case 2: {
      return toColorChannels(lowest, c, x, a);
    }

    case 3: {
      return toColorChannels(lowest, x, c, a);
    }

    case 4: {
      return toColorChannels(x, lowest, c, a);
    }

    default: {
      return toColorChannels(c, lowest, x, a);
    }
  }
}
