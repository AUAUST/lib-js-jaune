import type { ColorChannel } from "#space/types/ColorChannel";
import type { Coords } from "#space/types/Coords";

/**
 * A color space: its channels, its position in the conversion tree and its
 * conversion kernels.
 */
export interface ColorSpace {
  /**
   * CSS Color 4 identifier, such as `"srgb"` or `"oklch"`.
   */
  readonly id: string;
  /**
   * The three channels, in coordinate order.
   */
  readonly channels: readonly [ColorChannel, ColorChannel, ColorChannel];
  /**
   * The index of the hue channel in `channels`; `undefined` without one.
   */
  readonly hueIndex: 0 | 1 | 2 | undefined;
  /**
   * The space `toBase` converts into; `undefined` for a root space.
   */
  readonly base: ColorSpace | undefined;
  /**
   * The RGB space whose [0, 1] cube bounds this one; `undefined` when unbounded.
   */
  readonly gamut: ColorSpace | undefined;
  /**
   * Converts `coords` into `base` coordinates written to `out`, and returns `out`.
   * Reads every input before writing, so `out` may be `coords`; allocates nothing.
   */
  toBase(
    coords: Coords,
    out: [number, number, number],
  ): [number, number, number];
  /**
   * Converts `base` coordinates into this space's, written to `out`, and
   * returns `out`. Reads every input before writing, so `out` may be `coords`;
   * allocates nothing.
   */
  fromBase(
    coords: Coords,
    out: [number, number, number],
  ): [number, number, number];
  // @debt the type ties neither `hueIndex` to a hue channel in `channels` nor `isAchromatic` to a set `hueIndex`; only `createSpace` enforces both, so spaces built without it can mismatch and consumers still guard with `?.`.
  /**
   * Whether `coords` have no meaningful hue; `createSpace` requires it of every
   * space with a hue channel.
   */
  isAchromatic?(coords: Coords): boolean;
}
