import { clamp, isNumber } from "@auaust/primitive-kit/numbers";

export function toAlphaChannel(value: number | undefined | null): number {
  return isNumber(value) ? clamp(value, 0, 1) : 1;
}
