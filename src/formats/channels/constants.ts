import type { ResolvedColorChannels } from "#formats/channels/types/ResolvedColorChannels";

export const fallbackColor: ResolvedColorChannels = Object.freeze({
  r: 0,
  g: 0,
  b: 0,
  a: 1,
  isTransformed: false,
  isFallback: true,
});
