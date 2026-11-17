import { freeze } from "@auaust/toolkit/object";

import type { Matrix3 } from "#space/types/Matrix3";

type Row = Matrix3[number];

function copyRow(row: Row): Row {
  const copy: Row = [row[0], row[1], row[2]];

  return freeze(copy);
}

/**
 * Returns a deeply frozen copy of `rows`, leaving `rows` itself untouched.
 */
export function createMatrix(rows: Matrix3): Matrix3 {
  const matrix: Matrix3 = [
    copyRow(rows[0]),
    copyRow(rows[1]),
    copyRow(rows[2]),
  ];

  return freeze(matrix);
}
