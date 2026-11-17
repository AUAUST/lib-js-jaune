import { describe, expect, test } from "vitest";

import { cssSpace, parseCss, toCss } from "@auaust/jaune/css";
import { oklch } from "@auaust/jaune/oklab";
import { srgb } from "@auaust/jaune/rgb";
import { xyzD65 } from "@auaust/jaune/xyz";

describe("CSS color strings", () => {
  test("round-trip oklch with a percentage alpha", () => {
    const color = parseCss("oklch(70% 0.1 30 / 50%)");

    expect(color?.space).toBe(oklch);
    expect(color?.coords[0]).toBeCloseTo(0.7);
    expect(color?.coords[1]).toBeCloseTo(0.1);
    expect(color?.coords[2]).toBeCloseTo(30);
    expect(color?.alpha).toBe(0.5);
    expect(color && toCss(color)).toBe("oklch(0.7 0.1 30 / 0.5)");
  });

  test("clamp legacy rgb but keep color() out of range", () => {
    expect(parseCss("rgb(300, 0, 0)")?.coords).toEqual([1, 0, 0]);

    const wide = parseCss("color(srgb 1.2 0 0)");

    expect(wide?.space).toBe(srgb);
    expect(wide?.coords[0]).toBe(1.2);
    expect(wide && toCss(wide)).toBe("color(srgb 1.2 0 0)");
  });

  test("read none as 0 and reject missing channels", () => {
    expect(parseCss("hsl(120deg none 50%)")?.coords[1]).toBe(0);
    expect(parseCss("rgb(1 2)")).toBeUndefined();
  });

  test("resolve color() identifiers", () => {
    expect(cssSpace("XYZ")).toBe(xyzD65);
    expect(cssSpace("oklch")).toBeUndefined();
  });
});
