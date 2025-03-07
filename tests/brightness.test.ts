import { describe, expect, test } from "vitest";
import { Color } from "~/classes/Color";

describe("Colors", () => {
  test("have a brightness value", () => {
    expect(Color.from("white").isBrighterThan(Color.from("black"))).toBe(true);

    black: {
      const c = Color.fromRgb([0, 0, 0]);

      expect(c.brightness).toBeCloseTo(0);
      expect(c.isBright).toBe(false);
      expect(c.isDark).toBe(true);
    }

    white: {
      const c = Color.fromRgb([255, 255, 255]);

      expect(c.brightness).toBeCloseTo(1);
      expect(c.isBright).toBe(true);
      expect(c.isDark).toBe(false);
    }

    gray: {
      const c = Color.fromRgb([128, 128, 128]);

      expect(c.brightness).toBeCloseTo(0.5);
      // Due to the closeness to 0.5, bright or dark can't be determined; it would be impacted by rounding errors, implementation details, etc.
    }

    red: {
      const c = Color.fromRgb([255, 0, 0]);

      expect(c.brightness).toBeCloseTo(0.546);
      expect(c.isBright).toBe(true);
      expect(c.isDark).toBe(false);
    }
  });
});
