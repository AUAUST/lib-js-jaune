import { clamp } from "@auaust/toolkit/math";

import { createColor } from "#color/utils/createColor";
import { rgbChannelMax } from "#formats/channels/constants";
import { cssSpace } from "#formats/css/utils/cssSpace";
import { parseHex } from "#formats/hex/utils/parseHex";
import { parseNamedColor } from "#formats/named/utils/parseNamedColor";
import { hsl } from "#spaces/hsl/adapters/hsl";
import { hwb } from "#spaces/hsl/adapters/hwb";
import { srgb } from "#spaces/rgb/adapters/srgb";
import type { Color } from "#color/types/Color";
import type { ColorSpace } from "#space/ports/ColorSpace";
import type { ColorChannel } from "#space/types/ColorChannel";

interface CssFunction {
  space: ColorSpace;
  /**
   * The factor turning each channel's plain number into a coordinate.
   */
  numberScales: readonly [number, number, number];
  /**
   * Whether channels clamp to their range and comma syntax is accepted.
   */
  isLegacy: boolean;
}

const rgbFunction: CssFunction = {
  space: srgb,
  numberScales: [1 / rgbChannelMax, 1 / rgbChannelMax, 1 / rgbChannelMax],
  isLegacy: true,
};

const hslFunction: CssFunction = {
  space: hsl,
  numberScales: [1, 1 / 100, 1 / 100],
  isLegacy: true,
};

const functions = new Map<string, CssFunction>([
  ["rgb", rgbFunction],
  ["rgba", rgbFunction],
  ["hsl", hslFunction],
  ["hsla", hslFunction],
  [
    "hwb",
    {
      space: hwb,
      numberScales: [1, 1 / 100, 1 / 100],
      isLegacy: false,
    },
  ],
]);

function findFunction(name: string): CssFunction | undefined {
  const space = cssSpace(name, "function");

  return space
    ? {
        space,
        numberScales: [1, 1, 1],
        isLegacy: false,
      }
    : functions.get(name);
}

const degreesPerUnit = new Map([
  ["", 1],
  ["deg", 1],
  ["rad", 180 / Math.PI],
  ["grad", 0.9],
  ["turn", 360],
]);

const tokenPattern = /^([+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)(%|deg|rad|grad|turn)?$/;

const functionPattern = /^([a-z-]+)\((.*)\)$/s;

function parseChannel(
  token: string,
  channel: ColorChannel,
  numberScale: number,
): number | undefined {
  if (token === "none") {
    return 0;
  }

  const match = tokenPattern.exec(token);

  if (!match) {
    return;
  }

  const value = Number(match[1]);
  const unit = match[2] ?? "";

  if (unit === "%") {
    return channel.isHue ? undefined : (value / 100) * channel.range[1];
  }

  if (channel.isHue) {
    const degrees = degreesPerUnit.get(unit);

    return degrees === undefined ? undefined : value * degrees;
  }

  return unit === "" ? value * numberScale : undefined;
}

function parseAlpha(token: string | undefined): number | undefined {
  if (token === undefined || token === "none") {
    return token === undefined ? 1 : 0;
  }

  const match = tokenPattern.exec(token);

  if (!match || (match[2] !== undefined && match[2] !== "%")) {
    return;
  }

  return match[2] === "%" ? Number(match[1]) / 100 : Number(match[1]);
}

function split(body: string): string[] {
  return body.trim().split(/\s+/).filter(Boolean);
}

/**
 * The channel and alpha tokens of a function body in comma or space syntax, or
 * `undefined` when malformed.
 */
function tokenize(
  body: string,
  allowsCommas: boolean,
): { channels: string[]; alpha: string | undefined } | undefined {
  if (body.includes(",")) {
    const parts = body.split(",").map((part) => part.trim());

    if (!allowsCommas || parts.length < 3 || parts.length > 4) {
      return;
    }

    return parts.some((part) => {
      return part === "" || /\s/.test(part);
    })
      ? undefined
      : { channels: parts.slice(0, 3), alpha: parts[3] };
  }

  const [channels = "", alpha, ...rest] = body.split("/");
  const alphaTokens = alpha === undefined ? [] : split(alpha);

  if (rest.length > 0 || (alpha !== undefined && alphaTokens.length !== 1)) {
    return;
  }

  return { channels: split(channels), alpha: alphaTokens[0] };
}

function toRecord(
  space: ColorSpace,
  tokens: readonly string[],
  alphaToken: string | undefined,
  numberScales: readonly number[],
  isLegacy: boolean,
): Color | undefined {
  if (tokens.length !== 3) {
    return;
  }

  const coords: number[] = [];

  for (const [index, channel] of space.channels.entries()) {
    const value = parseChannel(tokens[index], channel, numberScales[index]);

    if (value === undefined) {
      return;
    }

    coords.push(
      isLegacy && !channel.isHue
        ? clamp(value, channel.range[0], channel.range[1])
        : value,
    );
  }

  const alpha = parseAlpha(alphaToken);

  return alpha === undefined
    ? undefined
    : createColor(space, [coords[0], coords[1], coords[2]], alpha);
}

/**
 * The color record of a CSS Color 4 string, matched case-insensitively: a HEX
 * string, a name, `rgb()`, `hsl()` (both also in comma syntax), `hwb()`, `lab()`,
 * `lch()`, `oklab()`, `oklch()` or `color()` over a space `cssSpace` names.
 * `none` parses as 0; `rgb()` and `hsl()` clamp their channels, other notations
 * keep them out of range. `undefined` when `value` is none of these.
 */
export function parseCss(value: string): Color | undefined {
  const normalized = value.trim().toLowerCase();
  const literal = parseHex(normalized) ?? parseNamedColor(normalized);

  if (literal) {
    return literal;
  }

  const match = functionPattern.exec(normalized);

  if (!match) {
    return;
  }

  const [, name, body] = match;

  if (name === "color") {
    const tokens = tokenize(body, false);
    const space = tokens && cssSpace(tokens.channels[0] ?? "");

    return space && tokens
      ? toRecord(
          space,
          tokens.channels.slice(1),
          tokens.alpha,
          [1, 1, 1],
          false,
        )
      : undefined;
  }

  const cssFunction = findFunction(name);
  const tokens = cssFunction && tokenize(body, cssFunction.isLegacy);

  return cssFunction && tokens
    ? toRecord(
        cssFunction.space,
        tokens.channels,
        tokens.alpha,
        cssFunction.numberScales,
        cssFunction.isLegacy,
      )
    : undefined;
}
