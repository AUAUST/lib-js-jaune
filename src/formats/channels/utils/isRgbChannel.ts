import { isNumber } from "@auaust/toolkit/guard";
import { isBetween } from "@auaust/toolkit/number";

export function isRgbChannel(value: unknown): value is number {
  return isNumber(value) && isBetween(value, 0, 255);
}
