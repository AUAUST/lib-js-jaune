# engrenage

## 1. `engrenage tsdown` fails with tsdown 0.23.7 on the deprecated top-level `eager` option

- why: the build logs "The top-level `eager` option is deprecated. Use `tsc.eager` instead." and exits 1; Jaune pins `tsdown@0.23.1` like toolkit to build.
- want: engrenage passes `tsc.eager`, so libraries can take current tsdown.
- done: Jaune builds with the latest tsdown 0.23 and the pin is removed.

## 2. Root entry re-exports every public domain, with no way to opt one out

- why: Jaune's `helpers` domain exists only to keep the `./utils` subpath, yet the generated `src/entry.ts` also re-exports it as a `utils` namespace.
- want: a domain `reexport` value that leaves it out of the root entry.
