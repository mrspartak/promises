import { describe, expect, it } from "vitest";
import { delay, sleep } from '../../dist/index.js'

describe("delay", () => {
  it("must be a function", () => {
    expect(typeof delay).toBe("function");
  });
});

describe("sleep", () => {
  it("must be a function", () => {
    expect(typeof sleep).toBe("function");
  });
});
