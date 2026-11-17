import { colorEncoding } from "#color/utils/colorEncoding";
import { createGradient } from "#computations/mix/utils/createGradient";
import { convertCoords } from "#space/utils/convertCoords";
import { oklab } from "#spaces/oklab/adapters/oklab";
import type { ColorEncoding } from "#color/ports/ColorEncoding";
import type { Color } from "#color/types/Color";
import type { Gradient } from "#computations/mix/types/Gradient";
import type { GradientColorsOptions } from "#computations/mix/types/GradientColorsOptions";
import type { GradientStop } from "#computations/mix/types/GradientStop";

function* sampleColors<T>(
  sampler: Gradient,
  count: number,
  encoding: ColorEncoding<T>,
): IterableIterator<T> {
  const sampled: [number, number, number] = [0, 0, 0];
  const converted: [number, number, number] = [0, 0, 0];

  for (let index = 0; index < count; index++) {
    const alpha = sampler.sample(index / (count - 1), sampled);

    yield encoding.encode(
      convertCoords(sampler.space, encoding.space, sampled, converted),
      alpha,
    );
  }
}

/**
 * Yields `count` colors of the gradient through `stops`, from the first stop to
 * the last, in `encoding`, records in `space` by default. Samples and converts
 * through two reused tuples, so a compact encoding allocates nothing per color.
 * Throws a `RangeError` when `count` is below 2, or as `createGradient` does.
 */
export function gradient<T>(
  stops: readonly GradientStop[],
  options: GradientColorsOptions<T> & {
    readonly encoding: ColorEncoding<T>;
  },
): IterableIterator<T>;
export function gradient(
  stops: readonly GradientStop[],
  options: GradientColorsOptions<Color>,
): IterableIterator<Color>;
export function gradient<T>(
  stops: readonly GradientStop[],
  { count, encoding, ...gradientOptions }: GradientColorsOptions<T | Color>,
): IterableIterator<T | Color> {
  if (count < 2) {
    throw new RangeError(`A gradient yields at least 2 colors, got ${count}.`);
  }

  const sampler = createGradient(stops, gradientOptions);

  return sampleColors(
    sampler,
    count,
    encoding ?? colorEncoding(gradientOptions.space ?? oklab),
  );
}
