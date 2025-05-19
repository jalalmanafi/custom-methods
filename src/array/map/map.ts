/**
 * Extends the global Array interface to add a custom map method.
 * This declaration tells TypeScript that arrays have an additional
 * method called 'customMap' with the specified signature.
 */
declare global {
  interface Array<T> {
    /**
     * Custom implementation of the map method to transform array elements.
     *
     * @param callback - Function to execute on each element in the array
     * @returns A new array with each element being the result of the callback function
     */
    customMap<U>(callback: (value: T, index: number, array: T[]) => U): U[];
  }
}

/**
 * Implementation of the customMap method on the Array prototype.
 * This follows the same behavior as the native Array.prototype.map method
 * but is implemented as a custom method.
 *
 * @param callback - Function that produces an element of the new array, taking three arguments:
 *                  - value: Current element being processed in the array
 *                  - index: Index of the current element being processed
 *                  - array: The array customMap was called upon
 * @returns A new array with each element being the result of the callback function
 */
Array.prototype.customMap = function <T, U>(
  callback: (value: T, index: number, array: T[]) => U
): U[] {
  // Create a new array for the mapped values, preserving the type transformation from T to U
  const newArr: U[] = [];

  // Cast 'this' to an array of T. This is required since 'this' inside a prototype method
  // refers to the array instance that the method is called on
  const currentArray = this as T[];

  // Cache the array length for slight performance improvement
  const length: number = currentArray.length;

  // Loop through each item in the original array
  for (let index = 0; index < length; index++) {
    // Apply the callback function to the current item and store the result
    // The callback gets three arguments: current value, current index, and the whole array
    const currentItem: U = callback(currentArray[index], index, currentArray);

    // Add the transformed item to our new result array
    newArr.push(currentItem);
  }

  // Return the new array with all transformed values
  // This preserves functional programming principles by not mutating the original array
  return newArr;
};

/**
 * Example usage:
 *
 * const numbers = [1, 2, 3, 4, 5];
 * const doubled = numbers.customMap(num => num * 2);
 * console.log(doubled); // [2, 4, 6, 8, 10]
 *
 * const names = ["Alice", "Bob", "Charlie"];
 * const greetings = names.customMap(name => `Hello, ${name}!`);
 * console.log(greetings); // ["Hello, Alice!", "Hello, Bob!", "Hello, Charlie!"]
 */