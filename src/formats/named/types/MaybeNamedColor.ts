import type { NamedColor } from "#formats/named/types/NamedColor";

/**
 * A CSS color name, or any string that may be one.
 */
export type MaybeNamedColor = NamedColor | (string & {});
