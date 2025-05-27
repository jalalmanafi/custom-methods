/**
 * customPush - A custom implementation of the Array.prototype.push method
 *
 * Adds one or more elements to the end of an array and returns the new length
 * of the array. This implementation maintains the same behavior as the native
 * push method, including proper handling of multiple arguments and direct
 * array mutation.
 *
 * @template T - The type of elements in the array
 *
 * @param {...T} args - The elements to add to the end of the array.
 *        Zero or more elements can be provided as separate arguments.
 *        Each element will be added sequentially to the end of the array.
 *
 * @returns {number} The new length property of the array after adding the elements.
 *          This is equivalent to array.length after the operation completes.
 *
 * @example
 * // Add single element
 * [1, 2, 3].customPush(4); // Returns 4, array becomes [1, 2, 3, 4]
 *
 * @example
 * // Add multiple elements
 * [1, 2].customPush(3, 4, 5); // Returns 5, array becomes [1, 2, 3, 4, 5]
 *
 * @example
 * // Add to empty array
 * [].customPush(1, 2); // Returns 2, array becomes [1, 2]
 *
 * @example
 * // No arguments (returns current length)
 * [1, 2, 3].customPush(); // Returns 3, array remains [1, 2, 3]
 *
 * @example
 * // Works with different types
 * ['a', 'b'].customPush('c', 'd'); // Returns 4, array becomes ['a', 'b', 'c', 'd']
 *
 * @example
 * // Identical behavior to native push
 * const arr1 = [1, 2, 3];
 * const arr2 = [1, 2, 3];
 * arr1.push(4, 5);        // Native: returns 5, arr1 = [1, 2, 3, 4, 5]
 * arr2.customPush(4, 5);  // Custom: returns 5, arr2 = [1, 2, 3, 4, 5]
 */
declare global {
  interface Array<T> {
    customPush(...args: T[]): number;
  }
}

Array.prototype.customPush = function <T>(...args: T[]): number {
  // Cast 'this' to the correct array type for type safety
  const currentArray = this as T[];

  // Iterate through each argument and add it to the end of the array
  // Key insight: currentArray.length grows dynamically with each addition
  // - First iteration: adds to index currentArray.length (e.g., 3)
  // - Second iteration: adds to index currentArray.length (now 4)
  // - Third iteration: adds to index currentArray.length (now 5)
  for (let index = 0; index < args.length; index++) {
    // Add the current argument to the end of the array
    // Using currentArray.length ensures we always add to the next available position
    currentArray[currentArray.length] = args[index];
  }

  // Return the new length of the array after all additions
  // This matches the exact behavior of native Array.prototype.push()
  return currentArray.length;
};