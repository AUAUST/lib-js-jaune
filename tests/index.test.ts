import { describe, expect, test } from "vitest";

import index from "~";
import utils from "~/utils";

describe("index", () => {
  test("index", () => {
    expect(index).toBe("index");
  });

  test("utils", () => {
    expect(utils).toBe("utils/index");
  });
});
