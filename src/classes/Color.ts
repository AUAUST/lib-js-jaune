import { N } from "@auaust/primitive-kit";
import type { Writable } from "type-fest";
import type { ColorChannels, ColorValue, MaybeNamedColor, Rgb } from "~/types";
import { isNamedColor, parseHex, parseNamedColor, parseRgb } from "~/utils";
import {
  fallbackColor,
  isColorChannels,
  toAlphaChannel,
  toColorChannels,
  toRgbChannel,
} from "~/utils/channels";
import { isHex, toHex } from "~/utils/hex";
import { isOpaque, isTranslucent, isTransparent } from "~/utils/opacity";
import { couldBeRgb, toRgb } from "~/utils/rgb";
import { cache, channels } from "~/utils/symbols";

export class Color {
  protected [channels]: Required<Writable<ColorChannels>> = undefined!;
  protected [cache]: Map<string, any> = new Map();

  constructor(value: ColorChannels) {
    this[channels] = { ...toColorChannels(value) };
  }

  static from(value: ColorValue): Color;
  static from(red: number, green: number, blue: number, alpha?: number): Color;
  static from(value: ColorValue | number, ...rest: number[]): Color {
    if (!value) {
      return new this(fallbackColor);
    }

    if (value instanceof Color) {
      return value.clone();
    }

    if (N.is(value)) {
      return new this({ r: value, g: rest[0], b: rest[1], a: rest[2] });
    }

    if (isColorChannels(value)) {
      return this.fromChannels(value);
    }

    if (isNamedColor(value)) {
      return this.fromNamedColor(value);
    }

    if (isHex(value)) {
      return this.fromHex(value);
    }

    if (couldBeRgb(value)) {
      const channels = parseRgb(value);

      if (!channels.isFallback) {
        return new this(channels);
      }
    }

    return new this(fallbackColor);
  }

  static fromChannels(channels: ColorChannels) {
    return new this(channels);
  }

  static fromRgb(rgb: Rgb) {
    return new this(parseRgb(rgb));
  }

  static fromHex(hex: string) {
    return new this(parseHex(hex));
  }

  static fromNamedColor(name: MaybeNamedColor) {
    return new this(parseNamedColor(name));
  }

  clone() {
    return Color.fromChannels(this[channels]);
  }

  private updated() {
    this[cache].clear();
    this[channels].isFallback = false; // once updated, it's no longer a fallback
    this[channels].isTransformed = false;
    return this;
  }

  /** The red channel of the color. */
  get red() {
    return this[channels].r;
  }

  /** @see Color#red */
  get r() {
    return this[channels].r;
  }

  set red(value: number) {
    this[channels].r = toRgbChannel(value);
    this.updated();
  }

  /** The green channel of the color. */
  get green() {
    return this[channels].g;
  }

  /** @see Color#green */
  get g() {
    return this[channels].g;
  }

  set green(value: number) {
    this[channels].g = toRgbChannel(value);
    this.updated();
  }

  /** The blue channel of the color. */
  get blue() {
    return this[channels].b;
  }

  /** @see Color#blue */
  get b() {
    return this[channels].b;
  }

  set blue(value: number) {
    this[channels].b = toRgbChannel(value);
    this.updated();
  }

  /** The alpha channel of the color. */
  get alpha() {
    return this[channels].a;
  }

  set alpha(value: number) {
    this[channels].a = toAlphaChannel(value);
    this.updated();
  }

  /** @see Color#alpha */
  get a() {
    return this[channels].a;
  }

  /**
   * Whether the color is the fallback color, which is used when the input is invalid.
   * As soon as a color channel is updated, this will always be `false`.
   */
  get isFallback() {
    return this[channels].isFallback;
  }

  /**
   * Whether any of the channels have been transformed by the color parser.
   * As soon as a color channel is updated, this will always be `false`.
   */
  get isTransformed() {
    return this[channels].isTransformed;
  }

  /** Helper to cache data until the channels are updated. */
  private memoize<T>(key: string, getter: (channels: ColorChannels) => T): T {
    if (!this[cache].has(key)) {
      this[cache].set(key, getter(this[channels]));
    }

    return this[cache].get(key);
  }

  /** Checks if the color is fully opaque. */
  get isOpaque() {
    return this.memoize("opaque", isOpaque);
  }

  /** Checks if the color is fully transparent. */
  get isTransparent() {
    return this.memoize("transparent", isTransparent);
  }

  /** Checks if the color is at least partially transparent. */
  get isTranslucent() {
    return this.memoize("translucent", isTranslucent);
  }

  /** Returns the closest named color. */
  get closestNamedColor() {
    return;
  }

  toHex() {
    return this.memoize("hex", toHex);
  }

  toRgb() {
    return this.memoize("rgb", toRgb);
  }

  toString() {
    return this.toHex();
  }

  valueOf() {
    return this.toString();
  }

  [Symbol.toPrimitive]() {
    return this.toString();
  }

  toJSON() {
    return this.toString();
  }
}
