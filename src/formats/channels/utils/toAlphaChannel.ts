import { isNumber } from "@auaust/toolkit/guard";
import { clamp } from "@auaust/toolkit/math";

export function toAlphaChannel(value: number | undefined | null): number {
  return isNumber(value) ? clamp(value, 0, 1) : 1;
}
