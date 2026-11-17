/**
 * 8-bit sRGB channels: `r`, `g` and `b` on 0–255, `a` on 0–1.
 */
export interface RgbChannels {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a?: number | undefined;
}
