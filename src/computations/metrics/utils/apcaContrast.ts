import { abs, clamp, pow } from "@auaust/toolkit/math";

import {
  apcaBlackClamp,
  apcaBlackThreshold,
  apcaChannelWeights,
  apcaLowClip,
  apcaMainTrc,
  apcaMinimumLuminanceDelta,
  apcaNormalBackground,
  apcaNormalText,
  apcaOffsetBlackOnWhite,
  apcaOffsetWhiteOnBlack,
  apcaReverseBackground,
  apcaReverseText,
  apcaScaleBlackOnWhite,
  apcaScaleWhiteOnBlack,
} from "#computations/metrics/constants";
import { flattenOnBackdrop } from "#computations/metrics/utils/flattenOnBackdrop";
import { convertCoords } from "#space/utils/convertCoords";
import { srgb } from "#spaces/rgb/adapters/srgb";
import type { Color } from "#color/types/Color";

const scratch: [number, number, number] = [0, 0, 0];

function screenLuminance(color: Color): number {
  const coords = convertCoords(color.space, srgb, color.coords, scratch);

  let y = 0;

  for (let index = 0; index < 3; index++) {
    y += (
      apcaChannelWeights[index] * pow(clamp(coords[index], 0, 1), apcaMainTrc)
    );
  }

  return y > apcaBlackThreshold
    ? y
    : y + pow(apcaBlackThreshold - y, apcaBlackClamp);
}

/**
 * The APCA-W3 0.0.98G-4g lightness contrast `Lc` of `text` on `background`,
 * after `background` is composited over `backdrop`, opaque white by default, and
 * `text` over the result: positive for dark text on a light background, negative
 * for the reverse, 0 below the low clip.
 *
 * @see https://github.com/Myndex/apca-w3
 */
export function apcaContrast(
  text: Color,
  background: Color,
  backdrop?: Color,
): number {
  const [
    flatText,
    flatBackground,
  ] = flattenOnBackdrop(text, background, backdrop);

  const textY = screenLuminance(flatText);
  const backgroundY = screenLuminance(flatBackground);

  if (abs(backgroundY - textY) < apcaMinimumLuminanceDelta) {
    return 0;
  }

  if (backgroundY > textY) {
    const sapc = (
      (pow(backgroundY, apcaNormalBackground) - pow(textY, apcaNormalText)) *
      apcaScaleBlackOnWhite
    );

    return sapc < apcaLowClip ? 0 : (sapc - apcaOffsetBlackOnWhite) * 100;
  }

  const sapc = (
    (pow(backgroundY, apcaReverseBackground) - pow(textY, apcaReverseText)) *
    apcaScaleWhiteOnBlack
  );

  return sapc > -apcaLowClip ? 0 : (sapc + apcaOffsetWhiteOnBlack) * 100;
}
