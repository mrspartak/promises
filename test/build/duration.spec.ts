import { describe, expect, it } from "vitest";
import { duration } from '../../dist/index.js'

describe("duration", () => {
  it("must be a function", () => {
    expect(typeof duration).toBe("function");
  });
});
