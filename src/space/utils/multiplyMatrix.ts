import type { Coords } from "#space/types/Coords";
import type { Matrix3 } from "#space/types/Matrix3";

/**
 * Multiplies `matrix` by the `coords` column vector into `out`, and returns
 * `out`. Reads every input before writing, so `out` may be `coords`.
 */
export function multiplyMatrix(
  matrix: Matrix3,
  coords: Coords,
  out: [number, number, number],
): [number, number, number] {
  const [x, y, z] = coords;
  const [r0, r1, r2] = matrix;

  out[0] = r0[0] * x + r0[1] * y + r0[2] * z;
  out[1] = r1[0] * x + r1[1] * y + r1[2] * z;
  out[2] = r2[0] * x + r2[1] * y + r2[2] * z;

  return out;
}
