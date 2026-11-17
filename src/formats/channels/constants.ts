import { freeze } from "@auaust/toolkit/object";

import type { ResolvedColorChannels } from "#formats/channels/types/ResolvedColorChannels";

/**
 * Opaque black flagged with `isFallback`, returned wherever an input
 * is not a color.
 */
export const fallbackColor: ResolvedColorChannels = freeze({
  r: 0,
  g: 0,
  b: 0,
  a: 1,
  isTransformed: false,
  isFallback: true,
});
