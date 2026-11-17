import { createSpace } from "#space/utils/createSpace";

function copy(
  coords: readonly [number, number, number],
  out: [number, number, number],
): [number, number, number] {
  out[0] = coords[0];
  out[1] = coords[1];
  out[2] = coords[2];

  return out;
}

/**
 * CIE XYZ relative to the D65 white point: the root every built-in space
 * converts through.
 */
export const xyzD65 = createSpace({
  id: "xyz-d65",
  channels: [
    {
      name: "x",
      range: [0, 1],
      isHue: false,
    },
    {
      name: "y",
      range: [0, 1],
      isHue: false,
    },
    {
      name: "z",
      range: [0, 1],
      isHue: false,
    },
  ],
  base: undefined,
  toBase: copy,
  fromBase: copy,
});
