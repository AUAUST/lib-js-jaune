import { Color } from "@auaust/jaune";
import { isBetween, isInteger } from "@auaust/primitive-kit/numbers";
import { assert, describe, expect, test } from "vitest";

describe("Random colors", () => {
  test("can be generated", () => {
    for (let i = 0; i < 10; i++) {
      const c = Color.random();

      assert(isBetween(c.r, 0, 255));
      assert(isInteger(c.r));

      assert(isBetween(c.g, 0, 255));
      assert(isInteger(c.g));

      assert(isBetween(c.b, 0, 255));
      assert(isInteger(c.b));

      assert(isBetween(c.a, 0, 1));
    }
  });

  test("can be generated with defined channels", () => {
    single: for (let i = 0; i < 10; i++) {
      const c = Color.random({
        r: 24,
      });

      expect(c.r).toBe(24);
      expect(c.a).toBe(1);

      assert(isBetween(c.g, 0, 255));
      assert(isBetween(c.b, 0, 255));
    }

    multiple: for (let i = 0; i < 10; i++) {
      const c = Color.random({
        r: 24,
        g: 32,
        a: 0.5,
      });

      expect(c.r).toBe(24);
      expect(c.g).toBe(32);
      expect(c.a).toBe(0.5);

      assert(isBetween(c.b, 0, 255));
    }

    all: {
      // Setting all channels to a single value is effectively creating the provided color
      const c = Color.random({
        r: 24,
        g: 32,
        b: 64,
        a: 0.5,
      });

      expect(c.toRgb()).toEqual([24, 32, 64, 0.5]);
    }
  });

  test("can be generated with channel ranges", () => {
    for (let i = 0; i < 10; i++) {
      const c = Color.random({
        r: [24, 32],
        a: [0.5, 0.55],
      });

      assert(isBetween(c.r, 24, 32));
      assert(isInteger(c.r));

      assert(isBetween(c.g, 0, 255));
      assert(isInteger(c.g));

      assert(isBetween(c.a, 0.5, 0.55));
    }
  });

  test("can be generated with mixed channel ranges and values", () => {
    for (let i = 0; i < 10; i++) {
      const c = Color.random({
        r: 24,
        g: [32, 64],
        a: 0.5,
      });

      expect(c.r).toBe(24);

      assert(isBetween(c.g, 32, 64));
      assert(isInteger(c.g));

      expect(c.a).toBe(0.5);
    }
  });
});
