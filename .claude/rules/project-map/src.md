---
paths:
  - src/**
---

# Project map: src

```
src/  formats < computations < color < helpers  (global roles: *.d.ts constants.ts)
├─ color*[collects: types]  The Color class and the detection and parsing of any color value.
├─ computations/  #computations/…  Computations over color channels: gamma transfer, measures, derived colors and randomness.
│  ├─ gamma  sRGB gamma transfer: conversions between gamma-encoded and linear channel values.
│  ├─ metrics  Measures and predicates over colors: luminance, brightness, contrast, distance and opacity.
│  ├─ random  Random colors and channels.
│  └─ transformations  Colors derived from others: grayscale and inversion.
├─ formats/  #formats/…  channels < * < named  Color representations: channel objects, HEX strings, RGB tuples and CSS names.
│  ├─ channels  The canonical channel object, channel validation and normalization, and the fallback color.
│  ├─ hex  HEX color strings: detection, parsing and serialization.
│  ├─ named  CSS named colors, their aliases and their channels.
│  └─ rgb  RGB tuples: detection, parsing and serialization.
└─ helpers*[collects: utils constants]  Every helper of the library, exposed as the utils entry.
```
