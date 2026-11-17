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
import { oklab } from "#spaces/oklab/adapters/oklab";
import { oklabAchromaticThreshold } from "#spaces/oklab/constants";

// @debt lch and oklch repeat the same Lab-to-LCh polar conversion; a shared polar helper or space factory in `space` would own it.
/**
 * OKLCH, the polar form of OKLab; unbounded. Achromatic colors get hue 0.
 */
export const oklch = createSpace({
  id: "oklch",
  channels: [
    {
      name: "l",
      range: [0, 1],
      isHue: false,
    },
    {
      name: "c",
      range: [0, 0.4],
      isHue: false,
    },
    {
      name: "h",
      range: [0, 360],
      isHue: true,
    },
  ],
  base: oklab,
  isAchromatic: (coords) => coords[1] < oklabAchromaticThreshold,
  toBase(coords, out) {
    const [l, c, h] = coords;
    const radians = toRadians(h);

    out[0] = l;
    out[1] = c * cos(radians);
    out[2] = c * sin(radians);

    return out;
  },
  fromBase(coords, out) {
    const [l, a, b] = coords;
    const c = hypot(a, b);
    const h = c < oklabAchromaticThreshold ? 0 : toDegrees(atan2(b, a));

    out[0] = l;
    out[1] = c;
    out[2] = normalizeHue(h);

    return out;
  },
});
