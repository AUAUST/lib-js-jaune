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
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;

  if (chroma === 0) {
    return toColorChannels(r, g, b, a);
  }

  // @debt hue extraction and HSL-to-RGB conversion live here; an HSL format domain would own them.
  const hue = max === r
    ? (g - b) / chroma
    : max === g
      ? (b - r) / chroma + 2
      : (r - g) / chroma + 4;

  const rotated = (((hue + degrees / 60) % 6) + 6) % 6;
  const x = chroma * (1 - Math.abs((rotated % 2) - 1)) + min;
  const c = chroma + min;

  switch (Math.floor(rotated)) {
    case 0: {
      return toColorChannels(c, x, min, a);
    }
    case 1: {
      return toColorChannels(x, c, min, a);
    }
    case 2: {
      return toColorChannels(min, c, x, a);
    }
    case 3: {
      return toColorChannels(min, x, c, a);
    }
    case 4: {
      return toColorChannels(x, min, c, a);
    }
    default: {
      return toColorChannels(c, min, x, a);
    }
  }
}
