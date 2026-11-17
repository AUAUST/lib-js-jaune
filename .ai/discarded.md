# Discarded solutions

- per-domain package subpaths: replace `./utils` with one entry per domain like toolkit — breaks every `@auaust/jaune/utils` import
- type-fest: `Writable` for the Color channels — toolkit's `Writable` covers it
- in-domain import cycle: keep `instanceof Color` in `parseColor` and `type` — structure check rejects the cycle
- CSS hue-rotate filter matrix: hue rotation — clips channels and shifts saturation and lightness; HSL rotation is exact and reversible
- hsl format domain: hue extraction for hue rotation — new public format is an architectural contract beyond #10
