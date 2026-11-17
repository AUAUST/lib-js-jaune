import {
  atan2,
  cos,
  hypot,
  sin,
  toDegrees,
  toRadians,
} from "@auaust/toolkit/math";

import { createSpace } from "#space/utils/createSpace";
import { normalizeHue } from "#space/utils/normalizeHue";
import { lab } from "#spaces/lab/adapters/lab";
import { labAchromaticThreshold } from "#spaces/lab/constants";

/**
 * CIE LCH, the polar form of `lab`; hue 0 when achromatic.
 */
export const lch = createSpace({
  id: "lch",
  channels: [
    {
      name: "l",
      range: [0, 100],
      isHue: false,
    },
    {
      name: "c",
      range: [0, 150],
      isHue: false,
    },
    {
      name: "h",
      range: [0, 360],
      isHue: true,
    },
  ],
  base: lab,
  toBase(coords, out) {
    const lightness = coords[0];
    const chroma = coords[1];
    const hue = toRadians(coords[2]);

    out[0] = lightness;
    out[1] = chroma * cos(hue);
    out[2] = chroma * sin(hue);

    return out;
  },
  fromBase(coords, out) {
    const lightness = coords[0];
    const chroma = hypot(coords[1], coords[2]);
    const hue = toDegrees(atan2(coords[2], coords[1]));

    out[0] = lightness;
    out[1] = chroma;
    out[2] = chroma < labAchromaticThreshold ? 0 : normalizeHue(hue);

    return out;
  },
  isAchromatic: (coords) => coords[1] < labAchromaticThreshold,
});
