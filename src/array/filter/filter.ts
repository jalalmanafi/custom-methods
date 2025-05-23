declare global {
  interface Array<T> {
    customFilter(
      callback: (value: T, index: number, array: T[]) => boolean,
      thisArg?: any
    ): T[];
  }
}

Array.prototype.customFilter = function <T>(
  callback: (value: T, index: number, array: T[]) => boolean,
  thisArg?: any
): T[] {
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }

  const newArr: T[] = [];
  const currentArray = this as T[];
  const length: number = currentArray.length;

  for (let index = 0; index < length; index++) {
    if (index in currentArray) {
      const currentItem: boolean = callback.call(
        thisArg,
        currentArray[index],
        index,
        currentArray
      );
      if (currentItem) {
        newArr.push(currentArray[index]);
      }
    }
  }

  return newArr;
};

const nums = ["Jalal", "Sahil"];

const res = nums.customFilter((item) => item === "Sahil");

console.log(res);
