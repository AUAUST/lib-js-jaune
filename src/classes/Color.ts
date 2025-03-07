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
import { closestNamedColor } from "~/utils/namedColors";
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
      return this.fromName(value);
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

  static fromChannels(channels: ColorChannels): Color {
    return new this(channels);
  }

  static fromRgb(rgb: Rgb): Color {
    return new this(parseRgb(rgb));
  }

  static fromHex(hex: string): Color {
    return new this(parseHex(hex));
  }

  static fromName(name: MaybeNamedColor): Color {
    return new this(parseNamedColor(name));
  }

  /**
   * Returns a new `Color` instance with the same channels as the current one.
   * If you want the clone to have different channels, use the `with` method.
   */
  clone(): Color {
    return Color.fromChannels(this[channels]);
  }

  /** Returns a new `Color` instance with the passed channels overriding the current ones. */
  with(value: Partial<Pick<ColorChannels, "r" | "g" | "b" | "a">>): Color {
    return Color.fromChannels({
      ...this[channels],
      ...value,
    });
  }

  /** Returns a new `Color` instance with the specified red channel. */
  withRed(value: number): Color {
    return this.with({ r: value });
  }

  /** Returns a new `Color` instance with the specified green channel. */
  withGreen(value: number): Color {
    return this.with({ g: value });
  }

  /** Returns a new `Color` instance with the specified blue channel. */
  withBlue(value: number): Color {
    return this.with({ b: value });
  }

  /** Returns a new `Color` instance with the specified alpha channel. */
  withAlpha(value: number): Color {
    return this.with({ a: value });
  }

  private updated(): this {
    this[cache].clear();
    this[channels].isFallback = false; // once updated, it's no longer a fallback
    this[channels].isTransformed = false;
    return this;
  }

  set(channel: "r" | "g" | "b" | "a", value: number): this {
    this[channels][channel] =
      channel === "a" ? toAlphaChannel(value) : toRgbChannel(value);
    return this.updated();
  }

  /** The red channel of the color. */
  get red(): number {
    return this[channels].r;
  }

  /** @see Color#red */
  get r(): number {
    return this[channels].r;
  }

  set red(value: number) {
    this.setRed(value);
  }

  setRed(value: number): this {
    return this.set("r", value);
  }

  /** The green channel of the color. */
  get green(): number {
    return this[channels].g;
  }

  /** @see Color#green */
  get g(): number {
    return this[channels].g;
  }

  set green(value: number) {
    this.setGreen(value);
  }

  setGreen(value: number): this {
    return this.set("g", value);
  }

  /** The blue channel of the color. */
  get blue(): number {
    return this[channels].b;
  }

  /** @see Color#blue */
  get b(): number {
    return this[channels].b;
  }

  set blue(value: number) {
    this.setBlue(value);
  }

  setBlue(value: number): this {
    return this.set("b", value);
  }

  /** The alpha channel of the color. */
  get alpha(): number {
    return this[channels].a;
  }

  /** @see Color#alpha */
  get a(): number {
    return this[channels].a;
  }

  set alpha(value: number) {
    this.setAlpha(value);
  }

  setAlpha(value: number): this {
    return this.set("a", value);
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
    return this.memoize("closestNamedColor", closestNamedColor);
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
