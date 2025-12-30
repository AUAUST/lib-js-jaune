import { N } from "@auaust/primitive-kit";

export function toAlphaChannel(value: number | undefined | null): number {
  return N.is(value) ? N.clamp(value, 0, 1) : 1;
}
