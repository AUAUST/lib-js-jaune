// @debt `(string & {})` widens `Hex` to every string, so the type documents the format without checking it.
/**
 * A HEX color string. It must start with a hash (#) character followed by 3, 4,
 * 6, or 8 hexadecimal digits.
 */
export type Hex = `#${string}` | (string & {});
