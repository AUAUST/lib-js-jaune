import { convert } from "#color/utils/convert";
import { rgbChannelMax } from "#formats/channels/constants";
import { cssPrecision } from "#formats/css/constants";
import { cssSpace } from "#formats/css/utils/cssSpace";
import { isInGamut } from "#gamut/utils/isInGamut";
import { hsl } from "#spaces/hsl/adapters/hsl";
import { hwb } from "#spaces/hsl/adapters/hwb";
import { srgb } from "#spaces/rgb/adapters/srgb";
import type { Color } from "#color/types/Color";
import type { ToCssOptions } from "#formats/css/types/ToCssOptions";

function write(value: number, precision: number): string {
  const rounded = Number(value.toPrecision(precision));

  return String(rounded === 0 ? 0 : rounded);
}

/**
 * The CSS string of `color` in its own space: `rgb()`, `hsl()` and `hwb()` for
 * in-gamut `srgb`, `hsl` and `hwb` colors, `lab()`, `lch()`, `oklab()` and
 * `oklch()` for their spaces, and `color(<id> …)` for any other, out-of-gamut
 * `hsl` and `hwb` colors converted to `srgb`. Numbers keep `precision` significant
 * digits; alpha is written only below 1.
 */
export function toCss(
  color: Color,
  { precision = cssPrecision }: ToCssOptions = {},
): string {
  const { space, coords } = color;
  const number = (value: number) => write(value, precision);
  const percentage = (value: number) => `${write(value * 100, precision)}%`;
  const alpha = color.alpha < 1 ? ` / ${number(color.alpha)}` : "";
  const isPolarSrgb = space === hsl || space === hwb;

  if (space === srgb && isInGamut(color)) {
    return `rgb(${coords
      .map((value) => {
        return number(value * rgbChannelMax);
      })
      .join(" ")}${alpha})`;
  }

  if (isPolarSrgb) {
    return isInGamut(color)
      ? `${space.id}(${number(coords[0])} ${percentage(coords[1])} ${percentage(coords[2])}${alpha})`
      : toCss(convert(color, srgb), { precision });
  }

  const channels = coords.map(number).join(" ");

  return cssSpace(space.id, "function") === space
    ? `${space.id}(${channels}${alpha})`
    : `color(${space.id} ${channels}${alpha})`;
}
