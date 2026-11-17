import { clamp, round } from "@auaust/toolkit/math";

export function toRgbChannel(value: number | undefined | null): number {
  return clamp(round(value ?? 0), 0, 255);
}
