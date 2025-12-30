/**
 * Returns the linearized value of a sRGB channel.
 *
 * @see https://stackoverflow.com/a/56678483
 */
export function sRGBtoLinear(channel: number) {
  if (channel <= 0.04045) {
    return channel / 12.92;
  }

  return Math.pow((channel + 0.055) / 1.055, 2.4);
}
