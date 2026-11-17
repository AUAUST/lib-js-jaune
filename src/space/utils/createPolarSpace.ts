import {
  atan2,
  cos,
  hypot,
  sin,
  toDegrees,
  toRadians,
} from "@auaust/toolkit/math";

import { hueChannel } from "#space/constants";
import { createSpace } from "#space/utils/createSpace";
import { normalizeHue } from "#space/utils/normalizeHue";
import type { ColorSpace } from "#space/ports/ColorSpace";
import type { PolarSpaceDefinition } from "#space/types/PolarSpaceDefinition";

/**
 * Creates the lightness, chroma and hue form of a Lab-like space. Lightness keeps
 * the base's channel, the gamut is the base's, and achromatic colors get hue 0.
 */
export function createPolarSpace(definition: PolarSpaceDefinition): ColorSpace {
  const { id, base, chromaRange, achromaticThreshold } = definition;

  return createSpace({
    id,
    channels: [
      base.channels[0],
      {
        name: "c",
        range: chromaRange,
        isHue: false,
      },
      hueChannel,
    ],
    base,
    gamut: base.gamut,
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
      out[2] = chroma < achromaticThreshold ? 0 : normalizeHue(hue);

      return out;
    },
    isAchromatic: (coords) => coords[1] < achromaticThreshold,
  });
}
