# engrenage

## 1. `engrenage tsdown` fails with tsdown 0.23.7 on the deprecated top-level `eager` option

- why: the build logs "The top-level `eager` option is deprecated. Use `tsc.eager` instead." and exits 1; Jaune pins `tsdown@0.23.1` like toolkit to build.
- want: engrenage passes `tsc.eager`, so libraries can take current tsdown.
- done: Jaune builds with the latest tsdown 0.23 and the pin is removed.

## 2. `engrenage sync --check` accepts `package.json` exports in an order `engrenage tsdown` rewrites

- why: the build reorders hand-appended `exports` alphabetically, so every `pnpm run build` dirties `package.json` while the gate passes.
- want: sync writes or checks `exports` in the order tsdown emits.
- done: a build on a clean tree leaves `package.json` unchanged.
