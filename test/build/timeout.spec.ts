import { describe, expect, it } from "vitest";
import { timeout } from '../../dist/index.js'

describe("timeout", () => {
  it("must be a function", () => {
    expect(typeof timeout).toBe("function");
  });
});
