---
paths:
  - src/**
---

# Project map: src

```
src/  space < spaces < gamut < formats < computations < color < helpers  (global roles: *.d.ts constants.ts)
├─ color*[collects: types]  The Color class and the detection and parsing of any color value.
├─ computations/  #computations/…  Computations over color channels: gamma transfer, measures, derived colors and randomness.
│  ├─ gamma  sRGB gamma transfer: conversions between gamma-encoded and linear channel values.
│  ├─ metrics  Measures and predicates over colors: luminance, brightness, contrast, distance and opacity.
│  ├─ random  Random colors and channels.
│  └─ transformations  Colors derived from others: grayscale, inversion and hue rotation.
├─ formats/  #formats/…  channels < * < named  Color representations: channel objects, HEX strings, RGB tuples and CSS names.
│  ├─ channels  The canonical channel object, channel validation and normalization, and the fallback color.
│  ├─ hex  HEX color strings: detection, parsing and serialization.
│  ├─ named  CSS named colors, their aliases and their channels.
│  └─ rgb  RGB tuples: detection, parsing and serialization.
├─ gamut*  Gamut checks, clipping and CSS Color 4 gamut mapping.
├─ helpers*[collects: utils constants]  Every helper of the library, exposed as the utils entry.
├─ space*  The color space contract, space creation and coordinate conversion.
└─ spaces/  #spaces/…  xyz < rgb < *  Built-in color spaces, one domain per family.
   ├─ hsl*  Cylindrical sRGB spaces: HSL and HWB.
   ├─ lab*  CIE Lab spaces: Lab and LCH, D50.
   ├─ oklab*  Perceptual spaces: OKLab and OKLCH.
   ├─ rgb*  RGB spaces: sRGB, linear sRGB and the wide-gamut RGB spaces.
   └─ xyz*  CIE XYZ spaces: the D65 reference and D50.
```
