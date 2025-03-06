import type { ColorChannels, ColorValue, MaybeNamedColor, Rgb } from "~/types";
import { isNamedColor, parseHex, parseNamedColor, parseRgb } from "~/utils";
import { fallbackColor, toAlphaChannel, toRgbChannel } from "~/utils/channels";
import { isHex, toHex } from "~/utils/hex";
import { isOpaque, isTranslucent, isTransparent } from "~/utils/opacity";
import { isRgb, toRgb } from "~/utils/rgb";
import { cache, channels } from "~/utils/symbols";

export class Color {
  protected [channels]: {
    r: number;
    g: number;
    b: number;
    a: number;
  } = undefined!;
  protected [cache]: Map<string, any> = new Map();

  constructor(value: ColorChannels) {
    this[channels] = {
      r: value.r,
      g: value.g,
      b: value.b,
      a: value.a ?? 1,
    };
    this.updated();
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
    this[cache].clear();
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
