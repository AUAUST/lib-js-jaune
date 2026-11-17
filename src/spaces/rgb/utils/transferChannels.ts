import type { Coords } from "#space/types/Coords";

/**
 * Applies the channel transfer function `transfer` to each of `coords` into
 * `out`, and returns `out`. `out` may be `coords`.
 */
export function transferChannels(
  transfer: (value: number) => number,
  coords: Coords,
  out: [number, number, number],
): [number, number, number] {
  out[0] = transfer(coords[0]);
  out[1] = transfer(coords[1]);
  out[2] = transfer(coords[2]);

  return out;
}
