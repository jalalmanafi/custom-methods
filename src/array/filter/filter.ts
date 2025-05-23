/**
 * Custom Array Filter Extension
 *
 * This module extends the native Array prototype with a custom filter implementation
 * that replicates the behavior of the standard Array.filter() method. The implementation
 * serves as an educational example and demonstrates how array filtering can be built
 * from fundamental JavaScript operations.
 *
 */

/**
 * Global type declaration extending the Array interface
 *
 * This declaration adds the customFilter method to all Array instances,
 * making it available throughout the application with proper TypeScript support.
 */
declare global {
  interface Array<T> {
    /**
     * Creates a new array with all elements that pass the test implemented by the provided function.
     *
     * @template T - The type of elements in the array
     * @param callback - Function that tests each element of the array. Return true to keep the element, false otherwise.
     * @param thisArg - Optional. Value to use as 'this' when executing the callback function.
     * @returns A new array with elements that pass the test. If no elements pass the test, an empty array is returned.
     */
    customFilter(
      callback: (value: T, index: number, array: T[]) => boolean,
      thisArg?: any
    ): T[];
  }
}

/**
 * Custom implementation of array filtering functionality
 *
 * This method creates a shallow copy of a portion of the array, filtered down to just
 * the elements from the original array that pass the test implemented by the provided
 * callback function. The original array is not modified.
 *
 * Key Implementation Details:
 * - Maintains type safety through TypeScript generics
 * - Handles sparse arrays by checking property existence with 'in' operator
 * - Supports optional 'thisArg' parameter for callback context binding
 * - Throws TypeError for invalid callback functions (matching native behavior)
 * - Returns a new array instance to preserve immutability
 *
 * @template T - The type of elements contained in the array
 * @param callback - Predicate function to test each element. Receives three arguments:
 *                  - value: The current element being processed
 *                  - index: The index of the current element being processed
 *                  - array: The array customFilter was called upon
 * @param thisArg - Optional value to use as 'this' context when executing callback
 * @returns New array containing only elements that satisfy the callback predicate
 * @throws {TypeError} When callback parameter is not a function
 */
Array.prototype.customFilter = function <T>(
  callback: (value: T, index: number, array: T[]) => boolean,
  thisArg?: any
): T[] {
  // Input validation: Ensure callback is a function to prevent runtime errors
  // This matches the behavior of the native Array.filter() method
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  // Initialize result array to collect filtered elements
  const newArr: T[] = [];

  // Cast 'this' context to typed array for type safety
  // The 'this' keyword refers to the array instance on which customFilter was called
  const currentArray = this as T[];

  // Cache array length for performance optimization
  // Prevents repeated property access during iteration
  const length: number = currentArray.length;

  // Iterate through each index in the array
  // Using traditional for loop for maximum compatibility and performance
  for (let index = 0; index < length; index++) {
    // Check if the current index exists in the array
    // This handles sparse arrays (arrays with gaps/holes) correctly
    // The 'in' operator returns true if the property exists, even if the value is undefined
    if (index in currentArray) {
      // Execute the callback function with proper context binding
      // Uses Function.call() to apply the optional thisArg parameter
      // The callback receives the current element, its index, and the entire array
      const shouldInclude: boolean = callback.call(
        thisArg,
        currentArray[index],
        index,
        currentArray
      );

      // Add element to result array if callback returns truthy value
      // Only elements that pass the predicate test are included
      if (shouldInclude) {
        newArr.push(currentArray[index]);
      }
    }
  }

  // Return the new filtered array
  // The original array remains unchanged, maintaining immutability
  return newArr;
};
