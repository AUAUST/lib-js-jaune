import { colorType } from "#parse/utils/colorType";
import type { ColorInput } from "#parse/types/ColorInput";

// @debt names match case-insensitively, so an uppercase name narrows to `ColorInput` though `NamedColor` lists lowercase names only.
/**
 * Whether `parseColor` accepts `value`.
 */
export function isColorInput(value: unknown): value is ColorInput {
  return colorType(value) !== undefined;
}
