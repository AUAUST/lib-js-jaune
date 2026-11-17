import { freeze } from "@auaust/toolkit/object";
import type { Writable } from "@auaust/toolkit/types";

import type { ColorSpace } from "#space/ports/ColorSpace";
import type { ColorSpaceDefinition } from "#space/types/ColorSpaceDefinition";

const channelIndices = freeze([0, 1, 2] as const);

/**
 * Creates a frozen color space from `definition`, resolving `gamut: "self"`
 * to the created space and deriving `hueIndex`. Throws a `TypeError` when the
 * definition does not have exactly three channels, has several hue channels, or
 * has one without `isAchromatic`.
 */
export function createSpace(definition: ColorSpaceDefinition): ColorSpace {
  const { channels, gamut } = definition;

  if (channels.length !== 3) {
    throw new TypeError(
      `Color space "${definition.id}" must have three channels, got ${channels.length}.`,
    );
  }

  const hueIndices = channelIndices.filter((index) => channels[index].isHue);

  if (hueIndices.length > 1) {
    throw new TypeError(
      `Color space "${definition.id}" must have at most one hue channel, got ${hueIndices.length}.`,
    );
  }

  if (hueIndices.length === 1 && definition.isAchromatic == null) {
    throw new TypeError(
      `Color space "${definition.id}" has a hue channel and must define \`isAchromatic\`.`,
    );
  }

  const space: Writable<ColorSpace> = {
    ...definition,
    channels: freeze([
      freeze({ ...channels[0] }),
      freeze({ ...channels[1] }),
      freeze({ ...channels[2] }),
    ]),
    hueIndex: hueIndices[0],
    gamut: undefined,
  };

  space.gamut = gamut === "self" ? space : gamut;

  return freeze(space);
}
