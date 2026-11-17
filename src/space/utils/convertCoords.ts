import { freeze } from "@auaust/toolkit";

import type { ColorSpace } from "#space/ports/ColorSpace";
import type { Coords } from "#space/types/Coords";

const paths = new WeakMap<
  ColorSpace,
  WeakMap<ColorSpace, readonly ColorSpace[]>
>();

function ancestry(space: ColorSpace): ColorSpace[] {
  const chain: ColorSpace[] = [];

  for (
    let current: ColorSpace | undefined = space;
    current;
    current = current.base
  ) {
    chain.push(current);
  }

  return chain;
}

function resolvePath(from: ColorSpace, to: ColorSpace): readonly ColorSpace[] {
  let cached = paths.get(from);

  if (!cached) {
    cached = new WeakMap();
    paths.set(from, cached);
  }

  const known = cached.get(to);

  if (known) {
    return known;
  }

  const fromChain = ancestry(from);
  const toChain = ancestry(to);
  const toCommon = toChain.findIndex((space) => fromChain.includes(space));

  if (toCommon === -1) {
    throw new TypeError(
      `Cannot convert from "${from.id}" to "${to.id}": the spaces share no root.`,
    );
  }

  const fromCommon = fromChain.indexOf(toChain[toCommon]);

  const path = freeze([
    ...fromChain.slice(0, fromCommon + 1),
    ...toChain.slice(0, toCommon).reverse(),
  ]);

  cached.set(to, path);

  return path;
}

/**
 * Converts `coords` from the `from` space into the `to` space, written to `out`,
 * and returns `out`. Walks up to the closest common ancestor, then down. `out`
 * may be `coords`. Spaces compare by identity; allocates nothing once the pair's
 * path is cached. Throws a `TypeError` when the spaces share no root.
 */
export function convertCoords(
  from: ColorSpace,
  to: ColorSpace,
  coords: Coords,
  out: [number, number, number],
): [number, number, number] {
  const path = resolvePath(from, to);

  out[0] = coords[0];
  out[1] = coords[1];
  out[2] = coords[2];

  for (let index = 1; index < path.length; index++) {
    const previous = path[index - 1];
    const next = path[index];

    if (previous.base === next) {
      previous.toBase(out, out);
    } else {
      next.fromBase(out, out);
    }
  }

  return out;
}
