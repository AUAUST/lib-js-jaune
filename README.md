###### AUAUST LIBRARIES — JavaScript — jaune

> This repository is made public to open the codebase to contributors.
> When contributing to this repo, you agree to assign your copyrights to AUAUST.

# jaune

A toolkit for working with colors in JavaScript.

## Installation

```sh
pnpm add @auaust/jaune
```

or if you prefer Yarn:

```sh
yarn add @auaust/jaune
```

## Usage

A color is a frozen `Color` record: `coords` in a `ColorSpace`, plus an `alpha` in [0, 1]. Spaces are frozen objects (`srgb`, `oklch`, `lab`…) linked in a conversion tree; functions take and return records. Every name is exported from the root `@auaust/jaune` and from its subpath below.

Parse any accepted input (record, HEX, CSS name or string, 8-bit channels or tuple) with `toColor`, which throws, or `parseColor`, which returns `undefined`; change space with `convert`:

```ts
import { convert, oklch, parseColor, toColor } from "@auaust/jaune";

const red = toColor("#ff0000");
const maybe = parseColor("not a color"); // undefined
const polar = convert(red, oklch); // { space: oklch, coords: [0.628, 0.258, 29.2], alpha: 1 }
```

### `@auaust/jaune/color`

The `Color` record and the `ColorEncoding` contract: `createColor`, `convert`, `withAlpha`, `isColor`, `colorEncoding`.

```ts
import { convert, createColor, withAlpha } from "@auaust/jaune/color";
import { oklab } from "@auaust/jaune/oklab";
import { srgb } from "@auaust/jaune/rgb";

const teal = createColor(srgb, [0, 0.5, 0.5]);
const faded = withAlpha(convert(teal, oklab), 0.5);
```

### `@auaust/jaune/space`

The `ColorSpace` contract and allocation-free coordinate conversion: `convertCoords`, `createSpace`, `createPolarSpace`, `createMatrix`, `multiplyMatrix`, `normalizeHue`.

```ts
import { convertCoords } from "@auaust/jaune/space";
import { oklch } from "@auaust/jaune/oklab";
import { srgb } from "@auaust/jaune/rgb";

const out: [number, number, number] = [0, 0, 0];

convertCoords(srgb, oklch, [1, 0.5, 0], out); // out now holds OKLCH coordinates
```

### `@auaust/jaune/xyz`, `/rgb`, `/hsl`, `/lab`, `/oklab`

The spaces: `xyzD65`, `xyzD50`; `srgb`, `srgbLinear`, `displayP3`, `a98Rgb`, `prophotoRgb`, `rec2020`; `hsl`, `hwb`; `lab`, `lch`; `oklab`, `oklch`, with `deltaEOK`.

```ts
import { convert, toColor } from "@auaust/jaune";
import { hsl } from "@auaust/jaune/hsl";
import { lch } from "@auaust/jaune/lab";
import { deltaEOK, oklab } from "@auaust/jaune/oklab";
import { displayP3 } from "@auaust/jaune/rgb";
import { xyzD50 } from "@auaust/jaune/xyz";

const orange = toColor("orange");

const spaces = [hsl, lch, displayP3, xyzD50].map((space) =>
  convert(orange, space),
);

const difference = deltaEOK(
  convert(orange, oklab).coords,
  convert(toColor("gold"), oklab).coords,
);
```

### `@auaust/jaune/gamut`

Gamut checks, clipping and CSS Color 4 gamut mapping: `isInGamut`, `toGamut`, and their coordinate forms `isInGamutCoords`, `clipCoordsToGamut`, `mapCoordsToGamut`.

```ts
import { createColor } from "@auaust/jaune/color";
import { isInGamut, toGamut } from "@auaust/jaune/gamut";
import { displayP3, srgb } from "@auaust/jaune/rgb";

const vivid = createColor(displayP3, [0, 1, 0]);

isInGamut(vivid, srgb); // false

const mapped = toGamut(vivid, srgb);
```

### `@auaust/jaune/channels`

8-bit sRGB channel objects `{ r, g, b, a }`, tuples `[r, g, b, a?]` and packed `0xRRGGBBAA` numbers: `toRgbChannels`, `toRgbTuple`, `toRgba32`, their `parse…` and `is…` counterparts, and the `rgba32Encoding`.

```ts
import { parseRgbTuple, toRgba32, toRgbChannels } from "@auaust/jaune/channels";

const color = parseRgbTuple([255, 128, 0]);

toRgbChannels(color!); // { r: 255, g: 128, b: 0, a: 1 }
toRgba32(color!); // 0xff8000ff
```

### `@auaust/jaune/hex`

HEX strings: `parseHex`, `toHex`, `isHex`.

```ts
import { parseHex, toHex } from "@auaust/jaune/hex";

toHex(parseHex("#F80")!); // "#ff8800"
```

### `@auaust/jaune/named`

CSS named colors: `parseNamedColor`, `isNamedColor`, `namedColorToHex`, `isAliasToNamedColor`, `namedColorAliases`.

```ts
import {
  isNamedColor,
  namedColorToHex,
  parseNamedColor,
} from "@auaust/jaune/named";

isNamedColor("rebeccapurple"); // true
namedColorToHex("rebeccapurple"); // "#663399ff"

const purple = parseNamedColor("RebeccaPurple");
```

### `@auaust/jaune/css`

CSS Color 4 strings: `parseCss`, `toCss`, `normalizeCss`, `cssSpace`.

```ts
import { parseCss, toCss } from "@auaust/jaune/css";

const color = parseCss("oklch(70% 0.1 200 / 50%)");

toCss(color!); // "oklch(0.7 0.1 200 / 0.5)"
```

### `@auaust/jaune/metrics`

Measures and predicates: `contrast` (WCAG 2), `apcaContrast`, `deltaE`, `luminance`, `lightness`, `equals`, `closestNamedColor`, `isDark`, `isLight`, `isOpaque`, `isTranslucent`, `isTransparent`, `flattenOnBackdrop`.

```ts
import { toColor } from "@auaust/jaune";
import { closestNamedColor, contrast, isDark } from "@auaust/jaune/metrics";

const navy = toColor("#001f3f");

contrast(toColor("white"), navy); // about 16.6
isDark(navy); // true
closestNamedColor(navy); // "midnightblue"
```

### `@auaust/jaune/composite`

Compositing over a backdrop with every CSS blend mode: `composite`, `blendCoords`.

```ts
import { toColor } from "@auaust/jaune";
import { composite } from "@auaust/jaune/composite";

const overlay = composite(toColor("rgb(255 0 0 / 50%)"), toColor("blue"), {
  blend: "multiply",
});
```

### `@auaust/jaune/transformations`

Colors derived from one color: `lighten`, `darken`, `saturate`, `desaturate`, `rotateHue`, `grayscale`, `invert`.

```ts
import { toColor } from "@auaust/jaune";
import { lighten, rotateHue } from "@auaust/jaune/transformations";

const complement = rotateHue(toColor("tomato"), 180);
const lighter = lighten(complement, 0.1);
```

### `@auaust/jaune/mix`

Mixing, averages and gradients: `mix`, `average`, `createGradient`, `gradient`, `interpolateCoords`.

```ts
import { toColor } from "@auaust/jaune";
import { createGradient, gradient, mix } from "@auaust/jaune/mix";
import { oklch } from "@auaust/jaune/oklab";

const red = toColor("red");
const blue = toColor("blue");
const middle = mix(red, blue, 0.5, { space: oklch });
const steps = [...gradient([red, [toColor("white"), 0.3], blue], { count: 5 })];
const sampler = createGradient([red, blue]);
```

`gradient` takes a `ColorEncoding` to emit compact values instead of records. Drawing a gradient into a canvas through `rgba32Encoding`:

```ts
import { toColor } from "@auaust/jaune";
import { rgba32Encoding } from "@auaust/jaune/channels";
import { gradient } from "@auaust/jaune/mix";

const width = 256;
const image = new ImageData(width, 1);

const colors = gradient([toColor("red"), toColor("blue")], {
  count: width,
  encoding: rgba32Encoding,
});

let offset = 0;

for (const rgba of colors) {
  image.data[offset++] = rgba >>> 24;
  image.data[offset++] = (rgba >>> 16) & 0xff;
  image.data[offset++] = (rgba >>> 8) & 0xff;
  image.data[offset++] = rgba & 0xff;
}

document.querySelector("canvas")?.getContext("2d")?.putImageData(image, 0, 0);
```

### `@auaust/jaune/random`

Random colors: `randomColor`, `randomColors`, `randomChannel`.

```ts
import { oklch } from "@auaust/jaune/oklab";
import { randomColor, randomColors } from "@auaust/jaune/random";

const any = randomColor();

const pastels = randomColors({
  count: 5,
  space: oklch,
  ranges: [
    [0.85, 0.95],
    [0.02, 0.08],
  ],
});
```

### `@auaust/jaune/parse`

Any accepted input to a color, and input detection: `toColor`, `parseColor`, `isColorInput`, `colorType`.

```ts
import { colorType, isColorInput, toColor } from "@auaust/jaune/parse";

colorType("#fff"); // "hex"

isColorInput({
  r: 0,
  g: 0,
  b: 0,
}); // true

const color = toColor("not a color", "black"); // falls back to black
```

## Sponsor

This library is a project by us, [AUAUST](https://auaust.ch/). We sponsor ourselves!
