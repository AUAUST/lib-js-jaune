import { N } from "@auaust/primitive-kit";

export function isRgbChannel(value: unknown): value is number {
  return N.is(value) && N.isBetween(value, 0, 255);
}
