/**
 * customPop - A custom implementation of the Array.prototype.pop method
 *
 * Removes the last element from an array and returns that element. This method
 * changes the length of the array. If the array is empty, undefined is returned
 * and the array is not modified. This implementation maintains the same behavior
 * as the native pop method, including proper handling of sparse arrays.
 *
 * @template T - The type of elements in the array
 *
 * @returns {T | undefined} The removed element from the array; undefined if the array is empty
 *
 * @example
 * // Remove last element from array
 * const fruits = ['apple', 'banana', 'cherry'];
 * const lastFruit = fruits.customPop(); // 'cherry'
 * console.log(fruits); // ['apple', 'banana']
 *
 * @example
 * // Handle empty array
 * const emptyArray: string[] = [];
 * const result = emptyArray.customPop(); // undefined
 * console.log(emptyArray.length); // 0
 *
 * @example
 * // Handling sparse arrays
 * const sparseArray = [1, , , 4]; // Array with holes
 * console.log(sparseArray.customPop()); // 4
 * console.log(sparseArray.customPop()); // undefined (hole)
 * console.log(sparseArray.length); // 2
 *
 * @example
 * // Multiple pops until empty
 * const stack = ['bottom', 'middle', 'top'];
 * while (stack.length > 0) {
 *   const item = stack.customPop();
 *   console.log(`Popped: ${item}`);
 * }
 * // Output: "Popped: top", "Popped: middle", "Popped: bottom"
 */
declare global {
  interface Array<T> {
    customPop<T>(): T | undefined;
  }
}

Array.prototype.customPop = function <T>(): T | undefined {
  // Check if array has any elements
  if (this.length > 0) {
    // Store the last element before removing it
    const lastElement = this[this.length - 1];

    // Reduce array length by 1, effectively removing the last element
    this.length--;

    // Return the element that was removed
    return lastElement;
  }

  // If array is empty, return undefined (implicit return)
  // This matches the behavior of native Array.prototype.pop()
};
