import { hypot } from "@auaust/toolkit/math";

import type { Coords } from "#space/types/Coords";

/**
 * The Euclidean distance between two OKLab coordinate triples.
 */
export function deltaEOK(a: Coords, b: Coords): number {
  return hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}
