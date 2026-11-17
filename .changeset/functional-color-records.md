---
"@auaust/jaune": minor
---

Rewrite jaune as a functional toolkit over immutable color records.

- Replace the `Color` class with frozen `Color` records (`space`, `coords`, `alpha`) and plain functions that take and return them
- Add color spaces linked in a conversion tree, with allocation-free coordinate conversion: XYZ (D65, D50), sRGB, linear sRGB, Display P3, A98 RGB, ProPhoto RGB, Rec. 2020, HSL, HWB, Lab, LCH, OKLab and OKLCH
- Add gamut checks, clipping and CSS Color 4 gamut mapping
- Parse and serialize HEX, CSS named colors, CSS Color 4 strings, 8-bit channel objects and tuples, and packed `0xRRGGBBAA` numbers; `toColor` throws on invalid input, `parseColor` returns `undefined`
- Add metrics (WCAG and APCA contrast, delta E, luminance, closest named color), compositing with every CSS blend mode, mixing, averages, gradients, random colors and transformations, including OKLCH lightness and chroma adjustments
- Expose each area as a subpath (`@auaust/jaune/color`, `/space`, `/rgb`, `/oklab`, `/css`, `/metrics`, `/mix`…), every name also exported from the root
- Ship ES modules only, require Node.js 22 or later, and depend on `@auaust/toolkit` instead of `@auaust/primitive-kit`
