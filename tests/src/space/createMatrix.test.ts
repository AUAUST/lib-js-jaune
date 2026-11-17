import { describe, expect, test } from "vitest";

import { createMatrix } from "@auaust/jaune/space";

describe("createMatrix", () => {
  test("returns equal rows that reject assignment", () => {
    const matrix = createMatrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    expect(matrix).toStrictEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    expect(() => Object.assign(matrix[1], { 0: 0 })).toThrow(TypeError);
    expect(() => Object.assign(matrix, { 0: [0, 0, 0] })).toThrow(TypeError);
  });

  test("keeps its copy when the input rows change", () => {
    const row: [number, number, number] = [1, 0, 0];

    const rows: [
      typeof row,
      typeof row,
      typeof row,
    ] = [row, [0, 1, 0], [0, 0, 1]];

    const matrix = createMatrix(rows);

    row[0] = 5;
    rows[1] = [9, 9, 9];

    expect(matrix).toStrictEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);

    expect(Object.isFrozen(rows)).toBe(false);
  });
});
