import type { ColorChannels, ColorValue, MaybeNamedColor, Rgb } from "~/types";
import { isNamedColor, parseHex, parseNamedColor, parseRgb } from "~/utils";
import { fallbackColor, toAlphaChannel, toRgbChannel } from "~/utils/channels";
import { isHex, toHex } from "~/utils/hex";
import { isOpaque, isTranslucent, isTransparent } from "~/utils/opacity";
import { isRgb, toRgb } from "~/utils/rgb";
import {
  alpha,
  blue,
  channels,
  conversions,
  green,
  red,
} from "~/utils/symbols";

export class Color {
  protected [red]: number;
  protected [green]: number;
  protected [blue]: number;
  protected [alpha]: number;
  protected [channels]: ColorChannels = undefined!;
  protected [conversions]: Record<string, ColorValue>;

  constructor(value: ColorChannels) {
    this[red] = value.r;
    this[green] = value.g;
    this[blue] = value.b;
    this[alpha] = value.a ?? 1;
    this[conversions] = {};
    this.refreshChannels();
  }

  static from(value: ColorValue) {
    if (!value) return new this(fallbackColor);
    if (isRgb(value)) return this.fromRgb(value);
    if (isNamedColor(value)) return this.fromNamedColor(value);
    if (isHex(value)) return this.fromHex(value);
    return new this(fallbackColor);
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

  private updated() {
    this.clearCache();
    this.refreshChannels();

    return this;
  }

  private clearCache() {
    this[conversions] = {};
  }

  private refreshChannels() {
    this[channels] = {
      r: this[red],
      g: this[green],
      b: this[blue],
      a: this[alpha],
    };
  }

  /** The red channel of the color. */
  get red() {
    return this[red];
  }

  /** @see Color#red */
  get r() {
    return this[red];
  }

  set red(value: number) {
    this[red] = toRgbChannel(value);
    this.updated();
  }

  /** The green channel of the color. */
  get green() {
    return this[green];
  }

  /** @see Color#green */
  get g() {
    return this[green];
  }

  set green(value: number) {
    this[green] = toRgbChannel(value);
    this.updated();
  }

  /** The blue channel of the color. */
  set blue(value: number) {
    this[blue] = toRgbChannel(value);
    this.updated();
  }

  /** @see Color#blue */
  get b() {
    return this[blue];
  }

  get blue() {
    return this[blue];
  }

  /** The alpha channel of the color. */
  get alpha() {
    return this[alpha];
  }

  set alpha(value: number) {
    this[alpha] = toAlphaChannel(value);
    this.updated();
  }

  /** @see Color#alpha */
  get a() {
    return this[alpha];
  }

  /** Checks if the color is fully opaque. */
  get isOpaque() {
    return isOpaque(this[channels]);
  }

  /** Checks if the color is fully transparent. */
  get isTransparent() {
    return isTransparent(this[channels]);
  }

  /** Checks if the color is at least partially transparent. */
  get isTranslucent() {
    return isTranslucent(this[channels]);
  }

  /** Helper to cache serialized values until the channels are updated. */
  private convert<T extends ColorValue>(
    name: string,
    converter: (channels: ColorChannels) => T
  ): T {
    return ((<T>this[conversions][name]) ??= converter(this[channels]));
  }

  toHex() {
    return this.convert("hex", toHex);
  }

  toRgb() {
    return this.convert("rgb", toRgb);
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
