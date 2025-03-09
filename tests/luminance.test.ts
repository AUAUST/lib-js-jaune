import { expect, test } from "vitest";
import { Color } from "~/classes/Color";

test("Colors have a luminance and brightness value", () => {
  black: {
    const c = Color.from([0, 0, 0]);

    expect(c.luminance).toBe(0);
    expect(c.brightness).toBe(0);
    expect(c.isBright).toBe(false);
    expect(c.isDark).toBe(true);
  }

  white: {
    const c = Color.from([255, 255, 255]);

    expect(c.luminance).toBe(1);
    expect(c.brightness).toBe(1);
    expect(c.isBright).toBe(true);
    expect(c.isDark).toBe(false);
  }

  gray: {
    const c = Color.from([128, 128, 128]);

    expect(c.luminance).toBeCloseTo(0.215);
    expect(c.brightness).toBeCloseTo(0.535);
  }

  lightgray: {
    const c = Color.from("lightgray");

    expect(c.luminance).toBeCloseTo(0.65);
    expect(c.brightness).toBeCloseTo(0.845);
    expect(c.isBright).toBe(true);
    expect(c.isDark).toBe(false);
  }

  lime: {
    const c = Color.from("lime");

    expect(c.isBright).toBe(true);
    expect(c.isDark).toBe(false);
  }
});

test("Colors can be compared for contrast", () => {
  // The below values have been picked from Google Chrome's web inspector's color contrast checker.
  expect(Color.from("#000000").contrast([255, 255, 255])).toBeCloseTo(21);

  expect(Color.from("white").contrast("#551A8B")).toBeCloseTo(11.01);

  expect(Color.from("gray").contrast([255, 0, 0])).toBeCloseTo(1.01);

  expect(Color.from("#58ab41").contrast("#0f782e")).toBeCloseTo(1.95);
});

test("Colors can be converted to grayscale", () => {
  expect(Color.from("black").toGrayscale().toHex()).toBe("#000000");

  expect(Color.from("white").toGrayscale().toHex()).toBe("#ffffff");

  expect(Color.from("gray").toGrayscale().toHex()).toBe("#808080");

  expect(Color.from("lime").toGrayscale().toHex()).toBe("#dcdcdc");
});
