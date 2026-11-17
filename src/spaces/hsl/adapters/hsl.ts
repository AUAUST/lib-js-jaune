import { abs, max, min } from "@auaust/toolkit/math";

import { createSpace } from "#space/utils/createSpace";
import { normalizeHue } from "#space/utils/normalizeHue";
import { hslAchromaticThreshold } from "#spaces/hsl/constants";
import { hslToSrgbChannel } from "#spaces/hsl/utils/hslToSrgbChannel";
import { srgbToHue } from "#spaces/hsl/utils/srgbToHue";
import { srgb } from "#spaces/rgb/adapters/srgb";

/**
 * HSL over gamma-encoded sRGB, bounded by the sRGB cube; hue 0 when achromatic.
 */
export const hsl = createSpace({
  id: "hsl",
  channels: [
    {
      name: "h",
      range: [0, 360],
      isHue: true,
    },
    {
      name: "s",
      range: [0, 1],
      isHue: false,
    },
    {
      name: "l",
      range: [0, 1],
      isHue: false,
    },
  ],
  base: srgb,
  gamut: srgb,
  toBase(coords, out) {
    const hue = normalizeHue(coords[0]);
    const saturation = coords[1];
    const lightness = coords[2];

    out[0] = hslToSrgbChannel(0, hue, saturation, lightness);
    out[1] = hslToSrgbChannel(8, hue, saturation, lightness);
    out[2] = hslToSrgbChannel(4, hue, saturation, lightness);

    return out;
  },
  fromBase(coords, out) {
    const highest = max(coords[0], coords[1], coords[2]);
    const lowest = min(coords[0], coords[1], coords[2]);
    const lightness = (highest + lowest) / 2;
    const delta = highest - lowest;

    let hue = srgbToHue(coords[0], coords[1], coords[2]);

    let saturation = delta === 0 || lightness === 0 || lightness === 1
      ? 0
      : (highest - lightness) / min(lightness, 1 - lightness);

    if (saturation < 0) {
      hue = normalizeHue(hue + 180);
      saturation = abs(saturation);
    }

    out[0] = saturation < hslAchromaticThreshold ? 0 : hue;
    out[1] = saturation;
    out[2] = lightness;

    return out;
  },
  isAchromatic: (coords) => abs(coords[1]) < hslAchromaticThreshold,
});
