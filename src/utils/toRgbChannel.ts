import { clamp, round } from "@auaust/primitive-kit/numbers";

export function toRgbChannel(value: number | undefined | null): number {
  return clamp(round(value), 0, 255);
}
