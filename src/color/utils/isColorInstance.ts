import { isObject } from "@auaust/toolkit/guard";

import { channels } from "#color/constants";
import type { Color } from "#color/classes/Color";

/**
 * Whether the value is a `Color` instance, recognized by the channels it holds
 * under the `channels` symbol.
 */
export function isColorInstance(value: unknown): value is Color {
  return isObject(value) && channels in value;
}
