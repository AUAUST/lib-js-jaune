import { defaultAlpha } from "#color/constants";
import { colorEncoding } from "#color/utils/colorEncoding";
import { randomChannel } from "#computations/random/utils/randomChannel";
import { convertCoords } from "#space/utils/convertCoords";
import { srgb } from "#spaces/rgb/adapters/srgb";
import type { ColorEncoding } from "#color/ports/ColorEncoding";
import type { Color } from "#color/types/Color";
import type { RandomColorsOptions } from "#computations/random/types/RandomColorsOptions";

/**
 * Yields `count` random colors in `encoding`, records in `space` by default. Each
 * coordinate is drawn in `space`, `srgb` by default, from its range in `ranges`,
 * or else its channel's reference range; the alpha from `alpha`, `defaultAlpha`
 * by default. Draws and converts through two reused tuples, so a compact encoding
 * allocates nothing per color.
 */
export function randomColors<T>(
  options: RandomColorsOptions<T> & { readonly encoding: ColorEncoding<T> },
): IterableIterator<T>;
export function randomColors(
  options: RandomColorsOptions<Color>,
): IterableIterator<Color>;
export function* randomColors<T>({
  count,
  space = srgb,
  ranges,
  alpha = defaultAlpha,
  encoding,
}: RandomColorsOptions<T | Color>): IterableIterator<T | Color> {
  const target = encoding ?? colorEncoding(space);
  const [first, second, third] = space.channels;
  const drawn: [number, number, number] = [0, 0, 0];
  const converted: [number, number, number] = [0, 0, 0];

  for (let index = 0; index < count; index++) {
    drawn[0] = randomChannel(ranges?.[0] ?? first.range);
    drawn[1] = randomChannel(ranges?.[1] ?? second.range);
    drawn[2] = randomChannel(ranges?.[2] ?? third.range);

    yield target.encode(
      convertCoords(space, target.space, drawn, converted),
      randomChannel(alpha),
    );
  }
}
