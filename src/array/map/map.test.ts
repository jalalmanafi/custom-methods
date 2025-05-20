import { describe, it, expect, vi } from "vitest";

import "./map";

describe("Array.prototype.customMap", () => {
  // Test basic functionality
  it("should apply the callback to each element and return a new array", () => {
    const input = [1, 2, 3, 4];
    const result = input.customMap((x) => x * 2);

    expect(result).toEqual([2, 4, 6, 8]);
    expect(result).not.toBe(input); // Should be a new array
  });

  // Test empty array
  it("should return an empty array when called on an empty array", () => {
    const input: number[] = [];
    const result = input.customMap((x) => x * 2);

    expect(result).toEqual([]);
    expect(result).not.toBe(input); // Should still be a new array
  });

  // Test callback arguments
  it("should pass value, index, and original array to the callback", () => {
    const input = ["a", "b", "c"];
    const mockCallback = vi.fn((val, _index, _array) => val.toUpperCase());

    input.customMap(mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenNthCalledWith(1, "a", 0, input);
    expect(mockCallback).toHaveBeenNthCalledWith(2, "b", 1, input);
    expect(mockCallback).toHaveBeenNthCalledWith(3, "c", 2, input);
  });

  // Test thisArg parameter
  it("should use the provided thisArg for the callback", () => {
    const input = [1, 2, 3];
    const thisObj = { multiplier: 10 };

    const result = input.customMap(function (this: typeof thisObj, x) {
      return x * this.multiplier;
    }, thisObj);

    expect(result).toEqual([10, 20, 30]);
  });

  // Test with sparse arrays
  it("should handle sparse arrays like native map", () => {
    // eslint-disable-next-line no-sparse-arrays
    const input = [1, , 3];
    const mockCallback = vi.fn((x) => x * 2);

    const result = input.customMap(mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(2); // Should skip empty slots
    expect(result).toEqual([2, , 6]);
  });

  // Test with different return types
  it("should handle transformations to different types", () => {
    const input = [1, 2, 3];
    const result = input.customMap((x) => x.toString());

    expect(result).toEqual(["1", "2", "3"]);
  });

  // Test with null/undefined values
  it("should process null/undefined values correctly", () => {
    const input = [1, null, 3, undefined] as (number | null | undefined)[];
    const result = input.customMap((x) =>
      x === null || x === undefined ? 0 : x * 2
    );

    expect(result).toEqual([2, 0, 6, 0]);
  });

  // Test error handling
  it("should throw TypeError if callback is not a function", () => {
    const input = [1, 2, 3];

    // @ts-expect-error - Intentionally testing runtime error
    expect(() => input.customMap("not a function")).toThrow(TypeError);
  });

  // Compare with native implementation
  it("should behave identically to the native map implementation", () => {
    const input = [1, 2, 3, 4];
    const nativeResult = input.map((x) => x * 3);
    const customResult = input.customMap((x) => x * 3);

    expect(customResult).toEqual(nativeResult);
  });
});
