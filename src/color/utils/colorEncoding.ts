import { getOrSet } from "@auaust/toolkit/maplike";
import { freeze } from "@auaust/toolkit/object";

import { createColor } from "#color/utils/createColor";
import type { ColorEncoding } from "#color/ports/ColorEncoding";
import type { Color } from "#color/types/Color";
import type { ColorSpace } from "#space/ports/ColorSpace";

const encodings = new WeakMap<ColorSpace, ColorEncoding<Color>>();

/**
 * The encoding yielding `Color` records in `space`; the same frozen encoding for
 * every call with one space.
 */
export function colorEncoding(space: ColorSpace): ColorEncoding<Color> {
  return getOrSet(encodings, space, () => {
    const encoding: ColorEncoding<Color> = {
      space,
      encode: (coords, alpha) => createColor(space, coords, alpha),
    };

    return freeze(encoding);
  });
}
