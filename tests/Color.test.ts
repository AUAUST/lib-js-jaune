import { describe, expect, test } from "vitest";
import { Color } from "~/classes/Color";
import { isHex, isNamedColor, isRgb } from "~/utils";
import { isColorChannels } from "~/utils/channels";

describe("Static Color", () => {
  describe("can instantiate Color instances", () => {
    test("from RGB", () => {
      const c = Color.fromRgb([0, 0, 0]);

      expect(c.r).toBe(0);
      expect(c.g).toBe(0);
      expect(c.b).toBe(0);
      expect(c.a).toBe(1);
    });

    test("from HEX", () => {
      const c = Color.fromHex("#000");

      expect(c.r).toBe(0);
      expect(c.g).toBe(0);
      expect(c.b).toBe(0);
      expect(c.a).toBe(1);
    });

    test("from unknown source", () => {
      named: {
        const c = Color.from("magenta");

        expect(c.r).toBe(255);
        expect(c.g).toBe(0);
        expect(c.b).toBe(255);
        expect(c.a).toBe(1);
      }

      spread: {
        const c = Color.from(255, 0, 255, 0.5);

        expect(c.r).toBe(255);
        expect(c.g).toBe(0);
        expect(c.b).toBe(255);
        expect(c.a).toBe(0.5);
      }

      hex: {
        const c = Color.from("#f0f");

        expect(c.r).toBe(255);
        expect(c.g).toBe(0);
        expect(c.b).toBe(255);
        expect(c.a).toBe(1);
      }

      rgb: {
        const c = Color.from([255, 0, 255]);

        expect(c.r).toBe(255);
        expect(c.g).toBe(0);
        expect(c.b).toBe(255);
        expect(c.a).toBe(1);
      }

      fallback: {
        const c = Color.from(null!);

        expect(c.r).toBe(0);
        expect(c.g).toBe(0);
        expect(c.b).toBe(0);
        expect(c.a).toBe(1);
      }
    });
  });

  test("can test whether a value is a color", () => {
    expect(Color.isColor("black")).toBe(true);
    expect(Color.isColor([1, 2, 3])).toBe(true);
    expect(Color.isColor("#fff")).toBe(true);
    expect(Color.isColor(Color.from(1, 2, 3, 0.1))).toBe(true);
    expect(Color.isColor({ r: 1, g: 2, b: 3 })).toBe(true);

    expect(Color.isColor(" transparent")).toBe(false);
    expect(Color.isColor([1, 2, 3, 0.1, 0])).toBe(false);
    expect(Color.isColor("#fffg")).toBe(false);
    expect(Color.isColor({ r: -1, g: 256, b: 3 })).toBe(false);
    expect(Color.isColor({})).toBe(false);
    expect(Color.isColor(null!)).toBe(false);
  });

  test("can test values for color type", () => {
    expect(Color.type("black")).toBe("named");
    expect(Color.type([1, 2, 3])).toBe("rgb");
    expect(Color.type("#fff")).toBe("hex");
    expect(Color.type(Color.from(1, 2, 3, 0.1))).toBe("color");
    expect(Color.type({ r: 1, g: 2, b: 3 })).toBe("channels");
    expect(Color.type({})).toBeUndefined();
    expect(Color.type(null!)).toBeUndefined();
  });

  test("exposes internal color helpers as properties", () => {
    expect(Color.isHex).toBe(isHex);
    expect(Color.isRgb).toBe(isRgb);
    expect(Color.isNamedColor).toBe(isNamedColor);
    expect(Color.isColorChannels).toBe(isColorChannels);
  });
});

describe("Color instances", () => {
  describe("can be created", () => {
    test("from channels", () => {
      const c = new Color({ r: 0, g: 0, b: 0 });

      expect(c.r).toBe(0);
      expect(c.g).toBe(0);
      expect(c.b).toBe(0);
      expect(c.a).toBe(1);
    });
  });

  test("can be updated", () => {
    const c = Color.from({ r: 0, g: 0, b: 0 });

    expect(c.r).toBe(0);
    expect(c.toHex()).toBe("#000000");

    c.red = 100;

    expect(c.r).toBe(100);
    expect(c.toHex()).toBe("#640000");

    c.blue = 50;

    expect(c.b).toBe(50);
    expect(c.toHex()).toBe("#640032");

    c.alpha = 0.5;

    expect(c.toHex()).toBe("#64003280");
  });

  test("can be serialized", () => {
    const c = Color.from("white");

    expect(c.toHex()).toBe("#ffffff");
    expect(c.toRgb()).toEqual([255, 255, 255, 1]);
    expect(JSON.stringify({ color: c })).toBe('{"color":"#ffffff"}');
  });

  test("can be checked for opacity", () => {
    const opaque = Color.from("white");
    const translucent = Color.from("#ffffff80");
    const transparent = Color.from("transparent");

    expect(opaque.isOpaque).toBe(true);
    expect(opaque.isTransparent).toBe(false);
    expect(opaque.isTranslucent).toBe(false);

    expect(translucent.isOpaque).toBe(false);
    expect(translucent.isTransparent).toBe(false);
    expect(translucent.isTranslucent).toBe(true);

    expect(transparent.isOpaque).toBe(false);
    expect(transparent.isTransparent).toBe(true);
    expect(transparent.isTranslucent).toBe(true);
  });

  test("can guess their closest named color", () => {
    expect(Color.fromName("black").closestNamedColor).toBe("black");
    expect(Color.from(1, 2, 3, 1).closestNamedColor).toBe("black");
    expect(Color.from(250, 250, 250).closestNamedColor).toBe("snow");
    expect(Color.fromHex("#fd6143").closestNamedColor).toBe("tomato");
  });

  test("keep track of fallback colors", () => {
    {
      const c = Color.from(null!);

      expect(c.isFallback).toBe(true);

      c.red = 255;

      expect(c.isFallback).toBe(false);
    }

    {
      const black = Color.from("black");

      expect(black.isFallback).toBe(false);

      const unknown = Color.from("unknown");

      expect(unknown.isFallback).toBe(true);
    }
  });

  test("keep track of transformations when parsing", () => {
    const c = Color.from([-1, 0, 3400]);

    expect(c.isTransformed).toBe(true);
    expect(c.toRgb()).toEqual([0, 0, 255, 1]);
  });

  test("can be cloned", () => {
    clonesAndKeepFallbackState: {
      const c = Color.from("unknown");
      const clone = c.clone();

      expect(c).not.toBe(clone);
      expect(c.toHex()).toBe(clone.toHex());
      expect(clone.isFallback).toBe(true);
    }

    clonesAndKeepTransformedState: {
      const c = Color.from([-1, 0, 3400]);
      const clone = c.clone();

      expect(c).not.toBe(clone);
      expect(clone.toRgb()).toEqual([0, 0, 255, 1]);
      expect(clone.isTransformed).toBe(true);
    }
  });

  test("can be cloned with new channels", () => {
    withChannels: {
      const c = Color.from("black");
      const clone = c.with({ r: 255, a: 0.5 });

      expect(c).not.toBe(clone);
      expect(clone.r).toBe(255);
      expect(clone.g).toBe(0);
      expect(clone.b).toBe(0);
      expect(clone.a).toBe(0.5);
    }

    withRedChannel: {
      const c = Color.from("black");
      const clone = c.withRed(255);

      expect(c).not.toBe(clone);
      expect(c.r).toBe(0);
      expect(clone.r).toBe(255);
      expect(clone.g).toBe(0);
    }

    withAlphaChannel: {
      const c = Color.from("black");
      const clone = c.withAlpha(-1);

      expect(c).not.toBe(clone);
      expect(c.a).toBe(1);
      expect(clone.a).toBe(0);
    }
  });
});
