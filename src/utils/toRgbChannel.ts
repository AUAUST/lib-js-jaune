import { N } from "@auaust/primitive-kit";

export function toRgbChannel(value: number | undefined | null): number {
  return N.clamp(N.round(value), 0, 255);
}
