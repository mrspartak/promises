import { describe, expect, it } from "vitest";
import { deferred } from '../../dist/index.js'

describe("deferred", () => {
  it("must be a function", () => {
    expect(typeof deferred).toBe("function");
  });
});