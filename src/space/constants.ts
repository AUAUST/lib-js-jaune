import { freeze } from "@auaust/toolkit/object";

import type { ColorChannel } from "#space/types/ColorChannel";

/**
 * The hue channel shared by every cylindrical space: an angle in degrees.
 */
export const hueChannel: ColorChannel = freeze({
  name: "h",
  range: freeze([0, 360] as const),
  isHue: true,
});
