---
paths:
  - src/**
---

# Project map: src

```
src/  space < spaces < color < gamut < formats < computations < parse  (global roles: *.d.ts constants.ts)
├─ color*  The color record, the color encoding contract and record conversion.
├─ computations/  #computations/…  Operations over color records: measures, derived colors, mixing and randomness.
│  ├─ composite*  Compositing and blending colors over a backdrop.
│  ├─ metrics*  Measures and predicates over colors: luminance, lightness, contrast, perceptual difference, equality and opacity.
│  ├─ mix*  Mixing, gradients and palettes.
│  ├─ random*  Random colors and channels.
│  └─ transformations*  Colors derived from one color: grayscale, inversion and hue rotation.
├─ formats/  #formats/…  * < named < css  Color notations: 8-bit channels, HEX strings, CSS names and CSS color strings.
│  ├─ channels*  8-bit sRGB channels as objects, tuples and packed integers.
│  ├─ css*  CSS color strings: parsing and serialization of every CSS Color 4 notation.
│  ├─ hex*  HEX color strings: detection, parsing and serialization.
│  └─ named*  CSS named colors, their aliases and their records.
├─ gamut*  Gamut checks, clipping and CSS Color 4 gamut mapping.
├─ parse*  Any accepted color input to a record, and input detection.
├─ space*  The color space contract, space creation and coordinate conversion.
└─ spaces/  #spaces/…  xyz < rgb < *  Built-in color spaces, one domain per family.
   ├─ hsl*  Cylindrical sRGB spaces: HSL and HWB.
   ├─ lab*  CIE Lab spaces: Lab and LCH, D50.
   ├─ oklab*  Perceptual spaces: OKLab and OKLCH.
   ├─ rgb*  RGB spaces: sRGB, linear sRGB and the wide-gamut RGB spaces.
   └─ xyz*  CIE XYZ spaces: the D65 reference and D50.
```
