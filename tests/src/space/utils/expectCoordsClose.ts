import { expect } from "vitest";

/**
 * Asserts each of `actual` lies within `tolerance` of the matching
 * `expected` value.
 */
export function expectCoordsClose(
  actual: readonly number[],
  expected: readonly number[],
  tolerance: number,
): void {
  expect(actual).toHaveLength(expected.length);

  for (const [index, value] of actual.entries()) {
    expect(
      Math.abs(value - (expected[index] ?? Number.NaN)),
    ).toBeLessThanOrEqual(tolerance);
  }
}
