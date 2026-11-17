import { isNumber } from "@auaust/toolkit/guard";
import { getOrSet } from "@auaust/toolkit/maplike";
import type { Writable } from "@auaust/toolkit/types";

import { cache, channels } from "#color/constants";
import { isColor } from "#color/utils/isColor";
import { parseColor } from "#color/utils/parseColor";
import { type } from "#color/utils/type";
import {
  brightness,
  closestNamedColor,
  contrast,
  distance,
  isBright,
  isDark,
  isOpaque,
  isTranslucent,
  isTransparent,
  luminance,
} from "#computations/metrics/index";
import { random } from "#computations/random/index";
import { grayscale, invert } from "#computations/transformations/index";
import {
  isColorChannels,
  toAlphaChannel,
  toColorChannels,
  toRgbChannel,
  type ColorChannels,
  type ResolvedColorChannels,
} from "#formats/channels/index";
import { isHex, parseHex, toHex } from "#formats/hex/index";
import {
  isAliasToNamedColor,
  isNamedColor,
  namedColorAliases,
  parseNamedColor,
  type MaybeNamedColor,
  type NamedColor,
} from "#formats/named/index";
import { isRgb, parseRgb, toRgb, type Rgb } from "#formats/rgb/index";
import type { ColorValue } from "#color/types/ColorValue";

/**
 * A mutable color holding RGB and alpha channels. Setting a channel clears its
 * memoized values and its `isFallback` and `isTransformed` flags.
 */
export class Color {
  protected [channels]: Writable<ResolvedColorChannels> = undefined!;
  // @debt the memo cache is keyed by `Function` and holds `any`, so `memoize` returns untyped values.
  protected [cache] = new Map<string | Function, any>();

  constructor(value: ColorChannels) {
    this[channels] = { ...toColorChannels(value) };
  }

  static from(value: ColorValue): Color;
  static from(red: number, green: number, blue: number, alpha?: number): Color;
  static from(value: ColorValue | number, ...rest: number[]): Color {
    if (isNumber(value)) {
      return new Color({
        r: value,
        g: rest[0],
        b: rest[1],
        a: rest[2],
      });
    }

    return new Color(parseColor(value));
  }

  static fromChannels(channels: ColorChannels): Color {
    return new Color(channels);
  }

  static fromRgb(rgb: Rgb): Color {
    return new Color(parseRgb(rgb));
  }

  static fromHex(hex: string): Color {
    return new Color(parseHex(hex));
  }

  static fromName(name: MaybeNamedColor): Color {
    return new Color(parseNamedColor(name));
  }

  static parse(value: ColorValue): ColorChannels | undefined {
    const color = parseColor(value);

    return color.isFallback ? undefined : color;
  }

  static random(presets: Parameters<typeof random>[0] = {}): Color {
    return new Color(random(presets));
  }

  /**
   * Returns the color type of the passed value, or `undefined` if it's
   * not a color.
   *
   * It is slightly stricter than the logic used to parse colors. It would return
   * false for an array of channels which values are not within the expected range,
   * where `parseColor` would return a color with the invalid values clamped.
   */
  static type = type;

  /**
   * Returns a boolean indicating whether the passed value is a color.
   */
  static isColor = isColor;

  /**
   * Alias of `Color.isColor`.
   */
  static is = isColor;

  /**
   * Returns a boolean indicating whether the passed value is a HEX color string.
   */
  static isHex = isHex;

  /**
   * Returns a boolean indicating whether the passed value is a named color.
   */
  static isNamedColor = isNamedColor;

  /**
   * Returns a boolean indicating whether the passed value is a color
   * channel object.
   */
  static isColorChannels = isColorChannels;

  /**
   * Returns a boolean indicating whether the passed value is a RGB color tuple.
   */
  static isRgb = isRgb;

  /**
   * Returns all the aliases of a named color, including the name itself.
   */
  static namedColorAliases = namedColorAliases;

  /**
   * Returns a boolean whether two named colors are aliases, meaning they have
   * the same HEX value.
   */
  static isAliasToNamedColor = isAliasToNamedColor;

  /**
   * Returns a new `Color` instance with the same channels as the current one. If
   * you want the clone to have different channels, use the `with` method.
   */
  clone(): Color {
    return Color.fromChannels(this[channels]);
  }

  /**
   * Returns a new `Color` instance with the passed channels overriding
   * the current ones.
   */
  with(value: Partial<Pick<ColorChannels, "r" | "g" | "b" | "a">>): Color {
    return Color.fromChannels({
      ...this[channels],
      ...value,
      isFallback: false,
      isTransformed: false,
    });
  }

  /**
   * Returns a new `Color` instance with the specified red channel.
   */
  withRed(value: number): Color {
    return this.with({ r: value });
  }

  /**
   * Returns a new `Color` instance with the specified green channel.
   */
  withGreen(value: number): Color {
    return this.with({ g: value });
  }

  /**
   * Returns a new `Color` instance with the specified blue channel.
   */
  withBlue(value: number): Color {
    return this.with({ b: value });
  }

  /**
   * Returns a new `Color` instance with the specified alpha channel.
   */
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
    this[channels][channel] = channel === "a"
      ? toAlphaChannel(value)
      : toRgbChannel(value);

    return this.updated();
  }

  /**
   * The red channel of the color.
   */
  get red(): number {
    return this[channels].r;
  }

  set red(value: number) {
    this.setRed(value);
  }

  /**
   * @see Color#red
   */
  get r(): number {
    return this[channels].r;
  }

  setRed(value: number): this {
    return this.set("r", value);
  }

  /**
   * The green channel of the color.
   */
  get green(): number {
    return this[channels].g;
  }

  set green(value: number) {
    this.setGreen(value);
  }

  /**
   * @see Color#green
   */
  get g(): number {
    return this[channels].g;
  }

  setGreen(value: number): this {
    return this.set("g", value);
  }

  /**
   * The blue channel of the color.
   */
  get blue(): number {
    return this[channels].b;
  }

  set blue(value: number) {
    this.setBlue(value);
  }

  /**
   * @see Color#blue
   */
  get b(): number {
    return this[channels].b;
  }

  setBlue(value: number): this {
    return this.set("b", value);
  }

  /**
   * The alpha channel of the color.
   */
  get alpha(): number {
    return this[channels].a;
  }

  set alpha(value: number) {
    this.setAlpha(value);
  }

  /**
   * @see Color#alpha
   */
  get a(): number {
    return this[channels].a;
  }

  setAlpha(value: number): this {
    return this.set("a", value);
  }

  /**
   * Whether the color is the fallback color, which is used when the input is
   * invalid. As soon as a color channel is updated, this will always be `false`.
   */
  get isFallback(): boolean {
    return this[channels].isFallback;
  }

  /**
   * Whether any of the channels have been transformed by the color parser. As
   * soon as a color channel is updated, this will always be `false`.
   */
  get isTransformed(): boolean {
    return this[channels].isTransformed;
  }

  /**
   * Helper to cache data until the channels are updated.
   */
  private memoize<T>(getter: (channels: ColorChannels) => T, key?: string): T {
    // If no key is passed, we use the getter function as the key
    // This means no key is required when the getter is a named function, while allowing to use anonymous functions within getters as well by passing a key
    const cacheKey = key ?? getter;

    return getOrSet(this[cache], cacheKey, () => {
      return getter(this[channels]);
    });
  }

  /**
   * Checks if the color is fully opaque.
   */
  get isOpaque(): boolean {
    return this.memoize(isOpaque);
  }

  /**
   * Checks if the color is fully transparent.
   */
  get isTransparent(): boolean {
    return this.memoize(isTransparent);
  }

  /**
   * Checks if the color is at least partially transparent.
   */
  get isTranslucent(): boolean {
    return this.memoize(isTranslucent);
  }

  /**
   * Returns the closest named color. If aliases exist, which one is returned is
   * not guaranteed. In some cases, calling `namedColorAliases()` on the result
   * might help achieve the desired result.
   */
  get closestNamedColor(): NamedColor {
    return this.memoize(closestNamedColor);
  }

  /**
   * The relative brightness of the color.
   */
  get brightness(): number {
    return this.memoize(brightness);
  }

  /**
   * Whether the color is considered bright.
   */
  get isBright(): boolean {
    return this.memoize(isBright);
  }

  /**
   * Whether the color is considered dark.
   */
  get isDark(): boolean {
    return this.memoize(isDark);
  }

  /**
   * Whether the color is brighter than the passed threshold or color.
   */
  isBrighterThan(threshold: Color | number): boolean {
    return (
      this.brightness > (isNumber(threshold) ? threshold : threshold.brightness)
    );
  }

  /**
   * Whether the color is darker than the passed threshold or color.
   */
  isDarkerThan(threshold: Color | number): boolean {
    return (
      this.brightness < (isNumber(threshold) ? threshold : threshold.brightness)
    );
  }

  /**
   * Returns the relative luminance of the color.
   */
  get luminance(): number {
    return this.memoize(luminance);
  }

  /**
   * Returns the contrast ratio between this color and another.
   */
  contrast(color: ColorValue): number {
    return contrast(this[channels], parseColor(color));
  }

  /**
   * Returns the distance between this color and another. If `alpha` is `true`,
   * the alpha channel is included in the calculation.
   */
  distance(color: ColorValue, alpha = false): number {
    return distance(this[channels], parseColor(color), alpha);
  }

  /**
   * Returns a new color with the grayscale equivalent of the current color,
   * preserving the alpha channel.
   */
  toGrayscale(): Color {
    return Color.fromChannels(grayscale(this[channels]));
  }

  toInvert(): Color {
    return Color.fromChannels(invert(this[channels]));
  }

  toHex(): string {
    return this.memoize(toHex);
  }

  toRgb(): Rgb {
    return this.memoize(toRgb);
  }

  toChannels(): ColorChannels {
    return this.memoize(toColorChannels); // can't return `this[channels]` directly as it's writable, and could cause unexpected behavior
  }

  toString(): string {
    return this.toHex();
  }

  valueOf(): string {
    return this.toString();
  }

  [Symbol.toPrimitive](): string {
    return this.toString();
  }

  toJSON(): string {
    return this.toString();
  }
}
