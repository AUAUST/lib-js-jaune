import { rgbChannelMax } from "#formats/channels/constants";
import { parseRgbTuple } from "#formats/channels/utils/parseRgbTuple";
import { isHex } from "#formats/hex/utils/isHex";
import type { Color } from "#color/types/Color";

/**
 * The `srgb` color of a HEX string, or `undefined` when `value` is not one.
 */
export function parseHex(value: string): Color | undefined {
  if (!isHex(value)) {
    return;
  }

  const digits = value.slice(1);
  const isShort = digits.length < 6;

  const byte = (index: number) => {
    return parseInt(
      isShort
        ? digits[index].repeat(2)
        : digits.slice(index * 2, index * 2 + 2),
      16,
    );
  };

  const hasAlpha = digits.length === 4 || digits.length === 8;

  return parseRgbTuple(
    hasAlpha
      ? [byte(0), byte(1), byte(2), byte(3) / rgbChannelMax]
      : [byte(0), byte(1), byte(2)],
  );
}
