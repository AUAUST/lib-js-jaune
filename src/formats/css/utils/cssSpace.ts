import { lab } from "#spaces/lab/adapters/lab";
import { lch } from "#spaces/lab/adapters/lch";
import { oklab } from "#spaces/oklab/adapters/oklab";
import { oklch } from "#spaces/oklab/adapters/oklch";
import { a98Rgb } from "#spaces/rgb/adapters/a98Rgb";
import { displayP3 } from "#spaces/rgb/adapters/displayP3";
import { prophotoRgb } from "#spaces/rgb/adapters/prophotoRgb";
import { rec2020 } from "#spaces/rgb/adapters/rec2020";
import { srgb } from "#spaces/rgb/adapters/srgb";
import { srgbLinear } from "#spaces/rgb/adapters/srgbLinear";
import { xyzD50 } from "#spaces/xyz/adapters/xyzD50";
import { xyzD65 } from "#spaces/xyz/adapters/xyzD65";
import type { CssNotation } from "#formats/css/types/CssNotation";
import type { ColorSpace } from "#space/ports/ColorSpace";

function byId(spaces: readonly ColorSpace[]): ReadonlyMap<string, ColorSpace> {
  return new Map(spaces.map((space) => [space.id, space] as const));
}

const tables: Readonly<Record<CssNotation, ReadonlyMap<string, ColorSpace>>> = {
  color: new Map([
    ...byId([
      srgb,
      srgbLinear,
      displayP3,
      a98Rgb,
      prophotoRgb,
      rec2020,
      xyzD50,
      xyzD65,
    ]),
    ["xyz", xyzD65],
  ]),
  function: byId([lab, lch, oklab, oklch]),
};

/**
 * The built-in space a CSS identifier names, matched case-insensitively: by
 * default a `color()` identifier, or with `notation` `"function"` the name
 * of a function of plain-number channels (`lab`, `lch`, `oklab`, `oklch`);
 * `undefined` when it names none.
 */
export function cssSpace(
  id: string,
  notation: CssNotation = "color",
): ColorSpace | undefined {
  return tables[notation].get(id.toLowerCase());
}
