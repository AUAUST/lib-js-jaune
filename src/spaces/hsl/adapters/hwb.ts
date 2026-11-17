import { max, min } from "@auaust/toolkit/math";

import { hueChannel } from "#space/constants";
import { createSpace } from "#space/utils/createSpace";
import { normalizeHue } from "#space/utils/normalizeHue";
import { hslAchromaticThreshold } from "#spaces/hsl/constants";
import { hslToSrgbChannel } from "#spaces/hsl/utils/hslToSrgbChannel";
import { srgbToHue } from "#spaces/hsl/utils/srgbToHue";
import { srgb } from "#spaces/rgb/adapters/srgb";

/**
 * HWB over gamma-encoded sRGB, bounded by the sRGB cube; hue 0 when achromatic.
 */
export const hwb = createSpace({
  id: "hwb",
  channels: [
    hueChannel,
    {
      name: "w",
      range: [0, 1],
      isHue: false,
    },
    {
      name: "b",
      range: [0, 1],
      isHue: false,
    },
  ],
  base: srgb,
  gamut: srgb,
  toBase(coords, out) {
    const hue = normalizeHue(coords[0]);
    const whiteness = coords[1];
    const blackness = coords[2];
    const sum = whiteness + blackness;

    if (sum >= 1) {
      const gray = whiteness / sum;

      out[0] = gray;
      out[1] = gray;
      out[2] = gray;

      return out;
    }

    const scale = 1 - sum;

    out[0] = hslToSrgbChannel(0, hue, 1, 0.5) * scale + whiteness;
    out[1] = hslToSrgbChannel(8, hue, 1, 0.5) * scale + whiteness;
    out[2] = hslToSrgbChannel(4, hue, 1, 0.5) * scale + whiteness;

    return out;
  },
  fromBase(coords, out) {
    const whiteness = min(coords[0], coords[1], coords[2]);
    const blackness = 1 - max(coords[0], coords[1], coords[2]);

    out[0] = whiteness + blackness >= 1 - hslAchromaticThreshold
      ? 0
      : srgbToHue(coords[0], coords[1], coords[2]);

    out[1] = whiteness;
    out[2] = blackness;

    return out;
  },
  isAchromatic: (coords) => coords[1] + coords[2] >= 1 - hslAchromaticThreshold,
});
