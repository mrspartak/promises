import { describe, expect, it } from "vitest";
import { retry } from '../../dist/index.js'

describe("retry", () => {
  it("must be a function", () => {
    expect(typeof retry).toBe("function");
  });
});