import { describe, expect, test } from "vitest";
import { Color } from "~/classes/Color";

describe("Color instances", () => {
  describe("can be created", () => {
    test("from channels", () => {
      const c = new Color({ r: 0, g: 0, b: 0 });

      expect(c.r).toBe(0);
      expect(c.g).toBe(0);
      expect(c.b).toBe(0);
      expect(c.a).toBe(1);
    });

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
});
