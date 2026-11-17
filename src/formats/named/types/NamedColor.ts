import type { namedColorsMap } from "#formats/named/constants";

/**
 * A CSS color name.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/named-color
 */
export type NamedColor = keyof typeof namedColorsMap;
