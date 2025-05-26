/**
 *
 * This module extends the native Array prototype with a custom find implementation
 * that replicates the behavior of the standard Array.find() method. The implementation
 * serves as an educational example and demonstrates how array searching can be built
 * from fundamental JavaScript operations.
 *
 */

/**
 * Global type declaration extending the Array interface
 *
 * This declaration adds the customFind method to all Array instances,
 * making it available throughout the application with proper TypeScript support.
 */
declare global {
  interface Array<T> {
    /**
     * Returns the value of the first element in the array that satisfies the provided testing function.
     *
     * @template T - The type of elements in the array
     * @param callback - Function that tests each element of the array. Return true to select the element, false otherwise.
     * @param thisArg - Optional. Value to use as 'this' when executing the callback function.
     * @returns The first element in the array that satisfies the provided testing function. Otherwise, undefined is returned.
     */
    customFind(
      callback: (value: T, index: number, array: T[]) => boolean,
      thisArg?: any
    ): T | undefined;
  }
}

/**
 * Custom implementation of array find functionality
 *
 * This method returns the first element in the array that satisfies the provided
 * testing function. If no elements satisfy the testing function, undefined is returned.
 * The original array is not modified and the search stops immediately when a match is found.
 *
 * Key Implementation Details:
 * - Maintains type safety through TypeScript generics
 * - Handles sparse arrays by checking property existence with 'in' operator
 * - Supports optional 'thisArg' parameter for callback context binding
 * - Provides early termination for performance optimization
 * - Returns the actual element (not a copy) for reference types
 *
 * @template T - The type of elements contained in the array
 * @param callback - Predicate function to test each element. Receives three arguments:
 *                  - value: The current element being processed
 *                  - index: The index of the current element being processed
 *                  - array: The array customFind was called upon
 * @param thisArg - Optional value to use as 'this' context when executing callback
 * @returns First element that satisfies the callback predicate, or undefined if none found
 */
Array.prototype.customFind = function <T>(
  callback: (value: T, index: number, array: T[]) => boolean,
  thisArg?: any
): T | undefined {
  // Cast 'this' context to typed array for type safety
  // The 'this' keyword refers to the array instance on which customFind was called
  const currentArray = this as T[];

  // Cache array length for performance optimization
  // Prevents repeated property access during iteration
  const length: number = this.length;

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
      const currentItem: boolean = callback.call(
        thisArg,
        currentArray[index],
        index,
        currentArray
      );

      // Return the element immediately if callback returns truthy value
      // This provides early termination, stopping the search as soon as a match is found
      if (currentItem) {
        return currentArray[index];
      }
    }
  }

  // Return undefined if no element satisfies the testing function
  // This matches the behavior of the native Array.find() method
  return undefined;
};

// Example usage demonstrating the custom find functionality
const nums = [
  {
    name: "Jalal",
  },
  {
    name: "Jale",
  },
].customFind(({ name }) => name === "Saan");

// Output the result to console
// This will log 'undefined' since no element has name "Saan"
console.log(nums);