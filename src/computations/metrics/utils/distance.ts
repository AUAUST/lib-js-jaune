import { sqrt } from "@auaust/toolkit/math";

import { rgbChannelMax } from "#formats/channels/constants";
import { convertCoords } from "#space/utils/convertCoords";
import { srgb } from "#spaces/rgb/adapters/srgb";
import type { Color } from "#color/types/Color";

const first: [number, number, number] = [0, 0, 0];
const second: [number, number, number] = [0, 0, 0];

// @debt the Euclidean distance on 0–255 sRGB channels is not perceptual and mixes alpha on 0–1 into it; #17 replaces it.
/**
 * The Euclidean distance between two colors on 0–255 sRGB channels, adding the
 * alpha difference when `alpha` is true. Only meaningful for comparisons.
 */
export function distance(a: Color, b: Color, alpha?: boolean): number {
  convertCoords(a.space, srgb, a.coords, first);
  convertCoords(b.space, srgb, b.coords, second);

  let sum = alpha === true ? (a.alpha - b.alpha) ** 2 : 0;

  for (let index = 0; index < 3; index++) {
    sum += ((first[index] - second[index]) * rgbChannelMax) ** 2;
  }

  return sqrt(sum);
}
