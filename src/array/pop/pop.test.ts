import { describe, it, expect } from "vitest";

import "./pop";

describe("Array.prototype.customPop", () => {
  it("should remove and return the last element from a non-empty array", () => {
    const arr = [1, 2, 3, 4];
    const result = arr.customPop();

    expect(result).toBe(4);
    expect(arr).toEqual([1, 2, 3]);
    expect(arr.length).toBe(3);
  });

  it("should return undefined for an empty array", () => {
    const arr: number[] = [];
    const result = arr.customPop();

    expect(result).toBeUndefined();
    expect(arr).toEqual([]);
    expect(arr.length).toBe(0);
  });

  it("should work with string arrays", () => {
    const arr = ["apple", "banana", "cherry"];
    const result = arr.customPop();

    expect(result).toBe("cherry");
    expect(arr).toEqual(["apple", "banana"]);
    expect(arr.length).toBe(2);
  });

  it("should work with mixed type arrays", () => {
    const arr = [1, "hello", true, null];
    const result = arr.customPop();

    expect(result).toBe(null);
    expect(arr).toEqual([1, "hello", true]);
    expect(arr.length).toBe(3);
  });

  it("should handle single element arrays", () => {
    const arr = ["only"];
    const result = arr.customPop();

    expect(result).toBe("only");
    expect(arr).toEqual([]);
    expect(arr.length).toBe(0);
  });

  it("should handle sparse arrays correctly", () => {
    const arr = [1, , , 4]; // sparse array with holes
    const result = arr.customPop();

    expect(result).toBe(4);
    expect(arr.length).toBe(3);
    expect(arr[2]).toBeUndefined(); // checking the hole
  });

  it("should return undefined when popping from sparse array holes", () => {
    const arr = [1, , ,]; // ends with holes
    const result = arr.customPop();

    expect(result).toBeUndefined();
    expect(arr.length).toBe(2);
  });

  it("should work multiple times on the same array", () => {
    const arr = ["a", "b", "c"];

    expect(arr.customPop()).toBe("c");
    expect(arr.length).toBe(2);

    expect(arr.customPop()).toBe("b");
    expect(arr.length).toBe(1);

    expect(arr.customPop()).toBe("a");
    expect(arr.length).toBe(0);

    expect(arr.customPop()).toBeUndefined();
    expect(arr.length).toBe(0);
  });

  it("should behave identically to native pop()", () => {
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [1, 2, 3, 4, 5];

    const customResult = arr1.customPop();
    const nativeResult = arr2.pop();

    expect(customResult).toBe(nativeResult);
    expect(arr1).toEqual(arr2);
    expect(arr1.length).toBe(arr2.length);
  });

  it("should handle object arrays", () => {
    const obj1 = { id: 1, name: "Alice" };
    const obj2 = { id: 2, name: "Bob" };
    const arr = [obj1, obj2];

    const result = arr.customPop();

    expect(result).toBe(obj2);
    expect(arr).toEqual([obj1]);
    expect(arr.length).toBe(1);
  });

  it("should work with nested arrays", () => {
    const nested1 = [1, 2];
    const nested2 = [3, 4];
    const arr = [nested1, nested2];

    const result = arr.customPop();

    expect(result).toBe(nested2);
    expect(result).toEqual([3, 4]);
    expect(arr).toEqual([nested1]);
    expect(arr.length).toBe(1);
  });

  it("should maintain array reference integrity", () => {
    const original = [1, 2, 3];
    const reference = original;

    const result = original.customPop();

    expect(result).toBe(3);
    expect(reference).toBe(original); // same reference
    expect(reference).toEqual([1, 2]); // modified through reference
    expect(reference.length).toBe(2);
  });

  describe("edge cases", () => {
    it("should handle arrays with undefined values", () => {
      const arr = [1, undefined, 3];
      const result = arr.customPop();

      expect(result).toBe(3);
      expect(arr).toEqual([1, undefined]);
    });

    it("should handle arrays with null values", () => {
      const arr = [null, "test"];
      const result = arr.customPop();

      expect(result).toBe("test");
      expect(arr).toEqual([null]);
    });

    it("should work on very large arrays", () => {
      const arr = new Array(10000).fill(0).map((_, i) => i);
      const result = arr.customPop();

      expect(result).toBe(9999);
      expect(arr.length).toBe(9999);
      expect(arr[arr.length - 1]).toBe(9998);
    });
  });
});
