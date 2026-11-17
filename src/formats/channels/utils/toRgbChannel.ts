import { clamp, round } from "@auaust/toolkit/math";

/**
 * Rounds the value and clamps it between 0 and 255; a nullish value gives 0
 * and `NaN` stays `NaN`.
 */
export function toRgbChannel(value: number | undefined | null): number {
  return clamp(round(value ?? 0), 0, 255);
}
