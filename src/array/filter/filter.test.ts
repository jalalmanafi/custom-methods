import { describe, it, expect } from "vitest";

import "./filter";

describe("Array.prototype.customFilter", () => {
  it("should filter strings based on equality condition", () => {
    const names = ["Alice", "Bob", "Charlie", "Alice"];
    const result = names.customFilter((item) => item === "Alice");
    expect(result).toEqual(["Alice", "Alice"]);
  });

  it("should filter numbers based on conditional logic", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const evenNumbers = numbers.customFilter((num) => num % 2 === 0);
    expect(evenNumbers).toEqual([2, 4, 6]);
  });

  it("should return empty array when no elements match filter condition", () => {
    const data = [1, 3, 5, 7];
    const result = data.customFilter((num) => num > 10);
    expect(result).toEqual([]);
  });

  it("should handle empty array input", () => {
    const emptyArray: number[] = [];
    const result = emptyArray.customFilter((num) => num > 0);
    expect(result).toEqual([]);
  });

  it("should provide correct index parameter to callback function", () => {
    const items = ["a", "b", "c"];
    const indices: number[] = [];
    items.customFilter((_item, index) => {
      indices.push(index);
      return true;
    });
    expect(indices).toEqual([0, 1, 2]);
  });

  it("should provide correct array parameter to callback function", () => {
    const originalArray = [10, 20, 30];
    let passedArray: number[];
    originalArray.customFilter((_item, _index, array) => {
      passedArray = array;
      return true;
    });
    expect(passedArray!).toBe(originalArray);
  });

  it("should handle sparse arrays correctly", () => {
    const sparseArray = [1, , 3, , 5]; // Array with holes
    const result = sparseArray.customFilter((num) => num !== undefined);
    expect(result).toEqual([1, 3, 5]);
  });

  it("should work with object arrays using complex filter conditions", () => {
    const users = [
      { name: "John", age: 25, active: true },
      { name: "Jane", age: 30, active: false },
      { name: "Bob", age: 35, active: true },
    ];
    const activeUsers = users.customFilter(
      (user) => user.active && user.age > 30
    );
    expect(activeUsers).toEqual([{ name: "Bob", age: 35, active: true }]);
  });

  it("should throw TypeError when callback is not a function", () => {
    const array = [1, 2, 3];
    expect(() => {
      array.customFilter("not a function" as any);
    }).toThrow(TypeError);
    expect(() => {
      array.customFilter("not a function" as any);
    }).toThrow("not a function is not a function");
  });

  it("should apply thisArg parameter correctly when provided", () => {
    const numbers = [1, 2, 3, 4, 5];
    const context = { threshold: 3 };

    const result = numbers.customFilter(function (this: typeof context, num) {
      return num > this.threshold;
    }, context);

    expect(result).toEqual([4, 5]);
  });

  it("should maintain original array immutability", () => {
    const originalArray = [1, 2, 3, 4, 5];
    const originalCopy = [...originalArray];
    const filtered = originalArray.customFilter((num) => num > 3);

    expect(originalArray).toEqual(originalCopy);
    expect(filtered).toEqual([4, 5]);
    expect(filtered).not.toBe(originalArray);
  });

  it("should handle boolean filter conditions correctly", () => {
    const booleans = [true, false, true, false];
    const truthyValues = booleans.customFilter((bool) => bool);
    expect(truthyValues).toEqual([true, true]);
  });

  it("should work with mixed data types when filter condition is appropriate", () => {
    const mixedArray = [1, "hello", null, undefined, 0, "world"];
    const truthyValues = mixedArray.customFilter((item) => !!item);
    expect(truthyValues).toEqual([1, "hello", "world"]);
  });

  it("should handle large arrays efficiently", () => {
    const largeArray = Array.from({ length: 10000 }, (_, i) => i);
    const filtered = largeArray.customFilter((num) => num % 1000 === 0);
    expect(filtered).toEqual([
      0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,
    ]);
  });

  it("should return new array instance even when all elements match", () => {
    const numbers = [1, 2, 3];
    const result = numbers.customFilter(() => true);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(numbers);
  });
});
