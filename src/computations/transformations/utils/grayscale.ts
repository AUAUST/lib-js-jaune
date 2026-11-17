import { createColor } from "#color/utils/createColor";
import { luminance } from "#computations/metrics/utils/luminance";
import { convertCoords } from "#space/utils/convertCoords";
import { srgbLinear } from "#spaces/rgb/adapters/srgbLinear";
import type { Color } from "#color/types/Color";

/**
 * The sRGB gray of the same luminance as `color`, in the space of `color`
 * and with its alpha.
 */
export function grayscale(color: Color): Color {
  const gray = luminance(color);

  return createColor(
    color.space,
    convertCoords(srgbLinear, color.space, [gray, gray, gray], [0, 0, 0]),
    color.alpha,
  );
}
