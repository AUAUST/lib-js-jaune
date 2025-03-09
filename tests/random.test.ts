import { N } from "@auaust/primitive-kit";
import { assert, describe, expect, test } from "vitest";
import { Color } from "~";

describe("Random colors", () => {
  test("can be generated", () => {
    for (let i = 0; i < 10; i++) {
      const c = Color.random();

      assert(N.isBetween(c.r, 0, 255));
      assert(N.isInteger(c.r));

      assert(N.isBetween(c.g, 0, 255));
      assert(N.isInteger(c.g));

      assert(N.isBetween(c.b, 0, 255));
      assert(N.isInteger(c.b));

      assert(N.isBetween(c.a, 0, 1));
    }
  });

  test("can be generated with defined channels", () => {
    single: for (let i = 0; i < 10; i++) {
      const c = Color.random({
        r: 24,
      });

      expect(c.r).toBe(24);
      expect(c.a).toBe(1);

      assert(N.isBetween(c.g, 0, 255));
      assert(N.isBetween(c.b, 0, 255));
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

      assert(N.isBetween(c.b, 0, 255));
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

      assert(N.isBetween(c.r, 24, 32));
      assert(N.isInteger(c.r));

      assert(N.isBetween(c.g, 0, 255));
      assert(N.isInteger(c.g));

      assert(N.isBetween(c.a, 0.5, 0.55));
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

      assert(N.isBetween(c.g, 32, 64));
      assert(N.isInteger(c.g));

      expect(c.a).toBe(0.5);
    }
  });
});
