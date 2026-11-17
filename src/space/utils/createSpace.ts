import { freeze, type Writable } from "@auaust/toolkit";

import type { ColorSpace } from "#space/ports/ColorSpace";
import type { ColorSpaceDefinition } from "#space/types/ColorSpaceDefinition";

/**
 * Creates a frozen color space from `definition`, resolving `gamut: "self"` to
 * the created space. Throws a `TypeError` when the definition does not have
 * exactly three channels.
 */
export function createSpace(definition: ColorSpaceDefinition): ColorSpace {
  const { channels, gamut } = definition;

  if (channels.length !== 3) {
    throw new TypeError(
      `Color space "${definition.id}" must have three channels, got ${channels.length}.`,
    );
  }

  const space: Writable<ColorSpace> = {
    ...definition,
    channels: freeze([
      freeze({ ...channels[0] }),
      freeze({ ...channels[1] }),
      freeze({ ...channels[2] }),
    ]),
    gamut: undefined,
  };

  space.gamut = gamut === "self" ? space : gamut;

  return freeze(space);
}
