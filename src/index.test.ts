import { hello } from ".";
import { describe, it, expect } from "@jest/globals";

describe("index", () => {
  it("should pass", () => {
    expect(hello()).toBe("Hello, world!");
  });
});
