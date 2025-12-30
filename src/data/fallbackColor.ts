import type { ColorChannels } from "~/types";

export const fallbackColor: Required<ColorChannels> = Object.freeze({
  r: 0,
  g: 0,
  b: 0,
  a: 1,
  isTransformed: false,
  isFallback: true,
});
