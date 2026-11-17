# Discarded solutions

- per-domain package subpaths: replace `./utils` with one entry per domain like toolkit — breaks every `@auaust/jaune/utils` import
- type-fest: `Writable` for the Color channels — toolkit's `Writable` covers it
- in-domain import cycle: keep `instanceof Color` in `parseColor` and `type` — structure check rejects the cycle
- CSS hue-rotate filter matrix: hue rotation — clips channels and shifts saturation and lightness; HSL rotation is exact and reversible
- hsl format domain: hue extraction for hue rotation — new public format is an architectural contract beyond #10
- single reference space storage: wide-gamut color model — float drift on hex round trips, conversion on every channel read
- extended sRGB float storage: wide-gamut color model — out-of-gamut colors become negative channels, hue ops stay RGB-bound
- chroma-js: color math engine — sRGB-centred, weak wide-gamut support
- tinycolor2: color math engine — 8-bit sRGB, same limits as today
