import type { ColorChannels } from "~/types";

/** Calculate the distance between two colors. */
export function distance(
  a: ColorChannels,
  b: ColorChannels,
  alpha = false
): number {
  return Math.sqrt(
    Math.pow(a.r - b.r, 2) +
      Math.pow(a.g - b.g, 2) +
      Math.pow(a.b - b.b, 2) +
      (alpha ? Math.pow((a.a ?? 1) - (b.a ?? 1), 2) : 0)
  );
}
