import { convert } from "#color/utils/convert";
import { createColor } from "#color/utils/createColor";
import { blendMode } from "#computations/composite/constants";
import { blendCoords } from "#computations/composite/utils/blendCoords";
import { srgb } from "#spaces/rgb/adapters/srgb";
import type { Color } from "#color/types/Color";
import type { CompositeOptions } from "#computations/composite/types/CompositeOptions";

/**
 * `source` blended with `backdrop` by `blend`, then composited source-over
 * it, following Compositing and Blending Level 1, in the RGB `space`, `srgb`
 * by default. Returns a record in `space`; a fully transparent result has
 * coordinates 0. Throws a `TypeError` when `space` is not an RGB space.
 */
export function composite(
  source: Color,
  backdrop: Color,
  { blend = blendMode, space = srgb }: CompositeOptions = {},
): Color {
  if (space.gamut !== space) {
    throw new TypeError(`Compositing needs an RGB space, got "${space.id}".`);
  }

  const { coords: sourceCoords, alpha: as } = convert(source, space);
  const { coords: backdropCoords, alpha: ab } = convert(backdrop, space);
  const alpha = as + ab * (1 - as);

  if (alpha === 0) {
    return createColor(space, [0, 0, 0], 0);
  }

  const [
    br,
    bg,
    bb,
  ] = blendCoords(blend, backdropCoords, sourceCoords, [0, 0, 0]);

  const channel = (
    backdropChannel: number,
    sourceChannel: number,
    blended: number,
  ): number => {
    return (
      (as * ((1 - ab) * sourceChannel + ab * blended) +
        ab * (1 - as) * backdropChannel) /
      alpha
    );
  };

  return createColor(
    space,
    [
      channel(backdropCoords[0], sourceCoords[0], br),
      channel(backdropCoords[1], sourceCoords[1], bg),
      channel(backdropCoords[2], sourceCoords[2], bb),
    ],
    alpha,
  );
}
