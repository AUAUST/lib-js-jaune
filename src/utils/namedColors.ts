import { O, S } from "@auaust/primitive-kit";
import type { ColorChannels, MaybeNamedColor, NamedColor } from "~/types";
import { distance, fallbackColor, parseHex } from "~/utils";

/**
 * A map of named colors and their HEX values.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/named-color
 */
export const namedColorsMap = O.freeze({
  aliceblue: "#f0f8ffff",
  antiquewhite: "#faebd7ff",
  aqua: "#00ffffff",
  aquamarine: "#7fffd4ff",
  azure: "#f0ffffff",
  beige: "#f5f5dcff",
  bisque: "#ffe4c4ff",
  black: "#000000ff",
  blanchedalmond: "#ffebcdff",
  blue: "#0000ffff",
  blueviolet: "#8a2be2ff",
  brown: "#a52a2aff",
  burlywood: "#deb887ff",
  cadetblue: "#5f9ea0ff",
  chartreuse: "#7fff00ff",
  chocolate: "#d2691eff",
  coral: "#ff7f50ff",
  cornflowerblue: "#6495edff",
  cornsilk: "#fff8dcff",
  crimson: "#dc143cff",
  cyan: "#00ffffff",
  darkblue: "#00008bff",
  darkcyan: "#008b8bff",
  darkgoldenrod: "#b8860bff",
  darkgray: "#a9a9a9ff",
  darkgreen: "#006400ff",
  darkgrey: "#a9a9a9ff",
  darkkhaki: "#bdb76bff",
  darkmagenta: "#8b008bff",
  darkolivegreen: "#556b2fff",
  darkorange: "#ff8c00ff",
  darkorchid: "#9932ccff",
  darkred: "#8b0000ff",
  darksalmon: "#e9967aff",
  darkseagreen: "#8fbc8fff",
  darkslateblue: "#483d8bff",
  darkslategray: "#2f4f4fff",
  darkslategrey: "#2f4f4fff",
  darkturquoise: "#00ced1ff",
  darkviolet: "#9400d3ff",
  deeppink: "#ff1493ff",
  deepskyblue: "#00bfffff",
  dimgray: "#696969ff",
  dimgrey: "#696969ff",
  dodgerblue: "#1e90ffff",
  firebrick: "#b22222ff",
  floralwhite: "#fffaf0ff",
  forestgreen: "#228b22ff",
  fuchsia: "#ff00ffff",
  gainsboro: "#dcdcdcff",
  ghostwhite: "#f8f8ffff",
  gold: "#ffd700ff",
  goldenrod: "#daa520ff",
  gray: "#808080ff",
  green: "#008000ff",
  greenyellow: "#adff2fff",
  grey: "#808080ff",
  honeydew: "#f0fff0ff",
  hotpink: "#ff69b4ff",
  indianred: "#cd5c5cff",
  indigo: "#4b0082ff",
  ivory: "#fffff0ff",
  khaki: "#f0e68cff",
  lavender: "#e6e6faff",
  lavenderblush: "#fff0f5ff",
  lawngreen: "#7cfc00ff",
  lemonchiffon: "#fffacdff",
  lightblue: "#add8e6ff",
  lightcoral: "#f08080ff",
  lightcyan: "#e0ffffff",
  lightgoldenrodyellow: "#fafad2ff",
  lightgray: "#d3d3d3ff",
  lightgreen: "#90ee90ff",
  lightgrey: "#d3d3d3ff",
  lightpink: "#ffb6c1ff",
  lightsalmon: "#ffa07aff",
  lightseagreen: "#20b2aaff",
  lightskyblue: "#87cefaff",
  lightslategray: "#778899ff",
  lightslategrey: "#778899ff",
  lightsteelblue: "#b0c4deff",
  lightyellow: "#ffffe0ff",
  lime: "#00ff00ff",
  limegreen: "#32cd32ff",
  linen: "#faf0e6ff",
  magenta: "#ff00ffff",
  maroon: "#800000ff",
  mediumaquamarine: "#66cdaaff",
  mediumblue: "#0000cdff",
  mediumorchid: "#ba55d3ff",
  mediumpurple: "#9370dbff",
  mediumseagreen: "#3cb371ff",
  mediumslateblue: "#7b68eeff",
  mediumspringgreen: "#00fa9aff",
  mediumturquoise: "#48d1ccff",
  mediumvioletred: "#c71585ff",
  midnightblue: "#191970ff",
  mintcream: "#f5fffaff",
  mistyrose: "#ffe4e1ff",
  moccasin: "#ffe4b5ff",
  navajowhite: "#ffdeadff",
  navy: "#000080ff",
  oldlace: "#fdf5e6ff",
  olive: "#808000ff",
  olivedrab: "#6b8e23ff",
  orange: "#ffa500ff",
  orangered: "#ff4500ff",
  orchid: "#da70d6ff",
  palegoldenrod: "#eee8aaff",
  palegreen: "#98fb98ff",
  paleturquoise: "#afeeeeff",
  palevioletred: "#db7093ff",
  papayawhip: "#ffefd5ff",
  peachpuff: "#ffdab9ff",
  peru: "#cd853fff",
  pink: "#ffc0cbff",
  plum: "#dda0ddff",
  powderblue: "#b0e0e6ff",
  purple: "#800080ff",
  rebeccapurple: "#663399ff",
  red: "#ff0000ff",
  rosybrown: "#bc8f8fff",
  royalblue: "#4169e1ff",
  saddlebrown: "#8b4513ff",
  salmon: "#fa8072ff",
  sandybrown: "#f4a460ff",
  seagreen: "#2e8b57ff",
  seashell: "#fff5eeff",
  sienna: "#a0522dff",
  silver: "#c0c0c0ff",
  skyblue: "#87ceebff",
  slateblue: "#6a5acdff",
  slategray: "#708090ff",
  slategrey: "#708090ff",
  snow: "#fffafaff",
  springgreen: "#00ff7fff",
  steelblue: "#4682b4ff",
  tan: "#d2b48cff",
  teal: "#008080ff",
  thistle: "#d8bfd8ff",
  tomato: "#ff6347ff",
  transparent: "#00000000",
  turquoise: "#40e0d0ff",
  violet: "#ee82eeff",
  wheat: "#f5deb3ff",
  white: "#ffffffff",
  whitesmoke: "#f5f5f5ff",
  yellow: "#ffff00ff",
  yellowgreen: "#9acd32ff",
});

const namedColors = new Set<NamedColor>(O.keys(namedColorsMap));

const namedColorsChannelsCache: Partial<Record<NamedColor, ColorChannels>> = {};

const namedColorsAliasesCache: Partial<
  Record<NamedColor, readonly NamedColor[]>
> = {};

/**
 * Whether the input is a valid named color.
 *
 * The check is case-sensitive.
 */
export function isNamedColor(value: unknown): value is NamedColor {
  return S.is(value) && namedColors.has(<NamedColor>value.toLowerCase());
}

/**
 * Returns the color channels from a named color. Must be a valid named color, already lowercased.
 *
 * @internal
 */
export function namedColorChannels(name: NamedColor): ColorChannels {
  return (namedColorsChannelsCache[name] ??= parseHex(namedColorToHex(name)!));
}

/**
 * Returns the color channels from a named color.
 */
export function parseNamedColor(name: MaybeNamedColor): ColorChannels {
  if (!isNamedColor(name)) {
    return fallbackColor;
  }

  return namedColorChannels(<NamedColor>name.toLowerCase());
}

/**
 * Returns the corresponding HEX value of a named color.
 */
export function namedColorToHex(name: NamedColor): string;
export function namedColorToHex(name: MaybeNamedColor): string | undefined;
export function namedColorToHex(name: MaybeNamedColor): string | undefined {
  return (
    namedColorsMap[<keyof typeof namedColorsMap>name.toLowerCase()] || undefined
  );
}

/** Returns the closest named color to the passed color channels. */
export function closestNamedColor(channels: ColorChannels): NamedColor {
  let closest: NamedColor | undefined;
  let smallestDistance = Infinity;

  for (const name of namedColors) {
    const value = namedColorChannels(name);
    const d = distance(
      value,
      channels,
      value.a === 1 // Ignore alpha channel only if it's 1 -> allows to match transparent/black correctly
    );

    if (d < smallestDistance) {
      closest = name;
      smallestDistance = d;
    }
  }

  return closest!;
}

/**
 * Returns all the aliases of a named color.
 */
export function namedColorAliases(name: NamedColor): readonly NamedColor[] {
  name = <NamedColor>name.toLowerCase();

  if (!isNamedColor(name)) {
    return [];
  }

  if (namedColorsAliasesCache[name]) {
    return namedColorsAliasesCache[name]!;
  }

  const aliases: NamedColor[] = [];
  const targetHex = namedColorToHex(name);

  for (const [name, hex] of O.entries(namedColorsMap)) {
    if (hex === targetHex) {
      aliases.push(name);
    }
  }

  return (namedColorsAliasesCache[name] = Object.freeze(aliases));
}

/**
 * Returns a boolean indicating whether two named colors are aliases.
 */
export function isAliasToNamedColor(
  name: NamedColor,
  alias: NamedColor
): boolean {
  return namedColorAliases(name).includes(<NamedColor>alias.toLowerCase());
}
