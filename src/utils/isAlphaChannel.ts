import { isBetween, isNumber } from "@auaust/primitive-kit/numbers";

export function isAlphaChannel(value: unknown): value is number {
  return isNumber(value) && isBetween(value, 0, 1);
}
