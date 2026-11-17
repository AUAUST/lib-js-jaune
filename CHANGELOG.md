# @auaust/jaune

## 0.1.0

### Minor Changes

- cb274c3: Rewrite jaune as a functional toolkit over immutable color records.
  
  - Replace the `Color` class with frozen `Color` records (`space`, `coords`, `alpha`) and plain functions that take and return them
  - Add color spaces linked in a conversion tree, with allocation-free coordinate conversion: XYZ (D65, D50), sRGB, linear sRGB, Display P3, A98 RGB, ProPhoto RGB, Rec. 2020, HSL, HWB, Lab, LCH, OKLab and OKLCH
  - Add gamut checks, clipping and CSS Color 4 gamut mapping
  - Parse and serialize HEX, CSS named colors, CSS Color 4 strings, 8-bit channel objects and tuples, and packed `0xRRGGBBAA` numbers; `toColor` throws on invalid input, `parseColor` returns `undefined`
  - Add metrics (WCAG and APCA contrast, delta E, luminance, closest named color), compositing with every CSS blend mode, mixing, averages, gradients, random colors and transformations, including OKLCH lightness and chroma adjustments
  - Expose each area as a subpath (`@auaust/jaune/color`, `/space`, `/rgb`, `/oklab`, `/css`, `/metrics`, `/mix`…), every name also exported from the root
  - Ship ES modules only, require Node.js 22 or later, and depend on `@auaust/toolkit` instead of `@auaust/primitive-kit`

## 0.0.5

### Patch Changes

- 2d96017: Add `Color.toInvert()` and `invert()` util

## 0.0.4

### Patch Changes

- 87827d1: Switch from `this` to `Color` in static method to avoid problems with bound function calls.

## 0.0.3

### Patch Changes

- 725a141: Fixed a bug in `brightness()` which caused colors close to black to have a brightness value 100x too large.

## 0.0.2

### Patch Changes

- 955d4e5: Add random color generation support, with preset values or ranges

## 0.0.1

### Patch Changes

- 43b7db0: Hello World! All the basics to work with colors in JavaScript, with a featureset focused on UI/CSS usage.
