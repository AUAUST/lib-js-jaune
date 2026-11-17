import { rgba32Encoding } from "#formats/channels/adapters/rgba32Encoding";
import { convertCoords } from "#space/utils/convertCoords";
import { srgb } from "#spaces/rgb/adapters/srgb";
import type { Color } from "#color/types/Color";

const scratch: [number, number, number] = [0, 0, 0];

/**
 * `color` as `0xRRGGBBAA` through `rgba32Encoding`, clipped to the sRGB gamut.
 */
export function toRgba32(color: Color): number {
  return rgba32Encoding.encode(
    convertCoords(color.space, srgb, color.coords, scratch),
    color.alpha,
  );
}
