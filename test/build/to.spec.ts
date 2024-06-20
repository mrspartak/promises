import { describe, expect, it } from "vitest";
import { to } from '../../dist/index.js'

describe("to", () => {
  it("must be a function", () => {
    expect(typeof to).toBe("function");
  });
});
