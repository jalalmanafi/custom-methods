/**
 * customMap - A custom implementation of the Array.prototype.map method
 *
 * Creates a new array populated with the results of calling a provided function
 * on every element in the calling array. This implementation maintains the same
 * behavior as the native map method, including proper handling of sparse arrays
 * and the thisArg parameter.
 *
 * @template T - The type of elements in the source array
 * @template U - The type of elements in the resulting array
 *
 * @param {function(T, number, T[]): U} callback - Function that produces an element of the new array
 *        taking three arguments:
 *        - currentValue (T): The current element being processed
 *        - index (number): The index of the current element
 *        - array (T[]): The array customMap was called upon
 *
 * @param {any} [thisArg] - Value to use as 'this' when executing the callback.
 *        If omitted, undefined is used as the this value. For arrow functions,
 *        thisArg has no effect as arrow functions establish 'this' lexically.
 *
 * @returns {U[]} A new array with each element being the result of the callback function
 *
 * @example
 * // Double all numbers in an array
 * [1, 2, 3].customMap(x => x * 2); // [2, 4, 6]
 *
 * @example
 * // Using thisArg parameter
 * const multiplier = { factor: 10 };
 * [1, 2, 3].customMap(function(x) { return x * this.factor; }, multiplier); // [10, 20, 30]
 *
 * @example
 * // Handling sparse arrays
 * [1, , 3].customMap(x => x * 2); // [2, <empty>, 6]
 *
 * @throws {TypeError} If callback is not a function
 */
declare global {
  interface Array<T> {
    customMap<U>(
      callback: (value: T, index: number, array: T[]) => U,
      thisArg?: any
    ): U[];
  }
}

Array.prototype.customMap = function <T, U>(
  callback: (value: T, index: number, array: T[]) => U,
  thisArg?: any
): U[] {
  // Check if callback is actually a function
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  // Initialize new array with same length to maintain sparse structure
  const newArr = new Array(this.length) as U[];

  const currentArray = this as T[];
  const length: number = currentArray.length;

  for (let index = 0; index < length; index++) {
    // Skip holes in sparse arrays (just like native map)
    if (index in currentArray) {
      // Use call() to invoke the callback with the specified thisArg context
      const currentItem: U = callback.call(
        thisArg,
        currentArray[index],
        index,
        currentArray
      );

      // Assign to the same index to maintain sparse structure
      newArr[index] = currentItem;
    }
    // No else branch is needed - not assigning to an index preserves the hole
  }

  return newArr;
};