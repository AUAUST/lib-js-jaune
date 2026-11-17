// @debt the `constants` role is public and collected, so the symbols meant to keep `Color` storage private are exported by both package entries.
/**
 * Used to privately store the cached channels of a color.
 */
export const channels = Symbol("Color.channels");

/**
 * Used to privately store the cached data of a color.
 */
export const cache = Symbol("Color.cache");
