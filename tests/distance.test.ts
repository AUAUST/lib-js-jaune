import { expect, test } from "vitest";
import { Color } from "~/classes/Color";

test("Colors can be compared by distance", () => {
  expect(Color.from("black").distance("white")).toBeCloseTo(441.673);

  expect(Color.from("black").distance("red")).toBeLessThan(
    Color.from("black").distance("white")
  );

  // Same color, different alpha values -> ignored by default
  expect(Color.from("#f00").distance("#f000")).toBe(0);
  // but if `alpha` is `true` it should be different
  expect(Color.from("#f00").distance("#f000", true)).toBeGreaterThan(0);
});
