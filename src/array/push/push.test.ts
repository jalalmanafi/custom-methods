import { describe, it, expect } from 'vitest';

import './push'

describe('Array.prototype.customPush vs Native push', () => {
  describe('Identical behavior verification', () => {
    it('should return same length as native push with single element', () => {
      const nativeArray = [1, 2, 3];
      const customArray = [1, 2, 3];

      const nativeResult = nativeArray.push(4);
      const customResult = customArray.customPush(4);

      expect(customResult).toBe(nativeResult);
      expect(customArray).toEqual(nativeArray);
    });

    it('should return same length as native push with multiple elements', () => {
      const nativeArray = [1, 2, 3];
      const customArray = [1, 2, 3];

      const nativeResult = nativeArray.push(4, 5, 6);
      const customResult = customArray.customPush(4, 5, 6);

      expect(customResult).toBe(nativeResult);
      expect(customArray).toEqual(nativeArray);
    });

    it('should behave identically with empty arrays', () => {
      const nativeArray: number[] = [];
      const customArray: number[] = [];

      const nativeResult = nativeArray.push(1, 2, 3);
      const customResult = customArray.customPush(1, 2, 3);

      expect(customResult).toBe(nativeResult);
      expect(customArray).toEqual(nativeArray);
    });

    it('should behave identically when no arguments provided', () => {
      const nativeArray = [1, 2, 3];
      const customArray = [1, 2, 3];

      const nativeResult = nativeArray.push();
      const customResult = customArray.customPush();

      expect(customResult).toBe(nativeResult);
      expect(customArray).toEqual(nativeArray);
    });

    it('should handle string arrays identically', () => {
      const nativeArray = ['a', 'b'];
      const customArray = ['a', 'b'];

      const nativeResult = nativeArray.push('c', 'd', 'e');
      const customResult = customArray.customPush('c', 'd', 'e');

      expect(customResult).toBe(nativeResult);
      expect(customArray).toEqual(nativeArray);
    });

    it('should handle object arrays identically', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const obj3 = { id: 3 };

      const nativeArray = [obj1];
      const customArray = [obj1];

      const nativeResult = nativeArray.push(obj2, obj3);
      const customResult = customArray.customPush(obj2, obj3);

      expect(customResult).toBe(nativeResult);
      expect(customArray).toEqual(nativeArray);
      expect(customArray[1]).toBe(obj2); // Same reference
      expect(customArray[2]).toBe(obj3); // Same reference
    });

    it('should handle mixed type arrays identically', () => {
      const nativeArray: (string | number)[] = ['a', 1];
      const customArray: (string | number)[] = ['a', 1];

      const nativeResult = nativeArray.push('b', 2, 'c', 3);
      const customResult = customArray.customPush('b', 2, 'c', 3);

      expect(customResult).toBe(nativeResult);
      expect(customArray).toEqual(nativeArray);
    });
  });

  describe('Edge cases comparison', () => {
    it('should handle null and undefined identically', () => {
      // Use 'any' to test runtime behavior, not TypeScript compile-time restrictions
      const nativeArray: any[] = [1, 2];
      const customArray: any[] = [1, 2];

      const nativeResult = nativeArray.push(null, undefined, 3);
      const customResult = customArray.customPush(null, undefined, 3);

      expect(customResult).toBe(nativeResult);
      expect(customArray).toEqual(nativeArray);
      expect(customArray.includes(undefined)).toBe(true);
      expect(nativeArray.includes(undefined)).toBe(true);
    });

    it('should handle sparse arrays identically', () => {
      const nativeArray = [1, , 3]; // Array with hole
      const customArray = [1, , 3]; // Array with hole

      const nativeResult = nativeArray.push(4, 5);
      const customResult = customArray.customPush(4, 5);

      expect(customResult).toBe(nativeResult);
      expect(customArray).toEqual(nativeArray);
      expect(customArray.length).toBe(nativeArray.length);
    });

    it('should handle large number of elements identically', () => {
      const nativeArray = [1, 2, 3];
      const customArray = [1, 2, 3];

      const elementsToAdd = Array(100).fill(0).map((_, i) => i);

      const nativeResult = nativeArray.push(...elementsToAdd);
      const customResult = customArray.customPush(...elementsToAdd);

      expect(customResult).toBe(nativeResult);
      expect(customArray).toEqual(nativeArray);
      expect(customArray.length).toBe(103);
    });

    it('should handle nested arrays identically', () => {
      const nativeArray = [[1, 2], [3, 4]];
      const customArray = [[1, 2], [3, 4]];

      const nativeResult = nativeArray.push([5, 6], [7, 8]);
      const customResult = customArray.customPush([5, 6], [7, 8]);

      expect(customResult).toBe(nativeResult);
      expect(customArray).toEqual(nativeArray);
    });
  });

  describe('Mutation behavior comparison', () => {
    it('should modify original array like native push', () => {
      const nativeArray = [1, 2, 3];
      const customArray = [1, 2, 3];

      const nativeOriginalRef = nativeArray;
      const customOriginalRef = customArray;

      nativeArray.push(4, 5);
      customArray.customPush(4, 5);

      // Should modify the same reference
      expect(nativeArray).toBe(nativeOriginalRef);
      expect(customArray).toBe(customOriginalRef);

      // Should have identical final state
      expect(customArray).toEqual(nativeArray);
    });

    it('should update length property identically', () => {
      const nativeArray = [1, 2, 3];
      const customArray = [1, 2, 3];

      expect(nativeArray.length).toBe(customArray.length); // Before

      nativeArray.push(4, 5, 6);
      customArray.customPush(4, 5, 6);

      expect(customArray.length).toBe(nativeArray.length); // After
      expect(customArray.length).toBe(6);
    });
  });

  describe('Type consistency', () => {
    it('should maintain type constraints like native push', () => {
      const nativeStringArray: string[] = ['a', 'b'];
      const customStringArray: string[] = ['a', 'b'];

      // Both should work with strings
      const nativeResult = nativeStringArray.push('c');
      const customResult = customStringArray.push('c');

      expect(customResult).toBe(nativeResult);
      expect(customStringArray).toEqual(nativeStringArray);

      // TypeScript should prevent number assignment to string array
      // nativeStringArray.push(123); // TS Error
      // customStringArray.customPush(123); // TS Error
    });

    it('should work with complex generic types like native push', () => {
      interface TestObj {
        id: number;
        name: string;
      }

      const nativeArray: TestObj[] = [{ id: 1, name: 'test1' }];
      const customArray: TestObj[] = [{ id: 1, name: 'test1' }];

      const newObj = { id: 2, name: 'test2' };

      const nativeResult = nativeArray.push(newObj);
      const customResult = customArray.customPush(newObj);

      expect(customResult).toBe(nativeResult);
      expect(customArray).toEqual(nativeArray);
    });
  });

  describe('Performance characteristics', () => {
    it('should handle performance test like native push', () => {
      const nativeArray: number[] = [];
      const customArray: number[] = [];

      const iterations = 1000;

      console.time('Native push');
      for (let i = 0; i < iterations; i++) {
        nativeArray.push(i);
      }
      console.timeEnd('Native push');

      console.time('Custom push');
      for (let i = 0; i < iterations; i++) {
        customArray.customPush(i);
      }
      console.timeEnd('Custom push');

      expect(customArray).toEqual(nativeArray);
      expect(customArray.length).toBe(iterations);
    });
  });

  describe('Return value consistency', () => {
    it('should return exact same values as native push in all scenarios', () => {
      // Use any[] to avoid TypeScript type conflicts in test scenarios
      const testCases: { initial: any[], toAdd: any[] }[] = [
        { initial: [], toAdd: [1] },
        { initial: [1], toAdd: [2, 3] },
        { initial: [1, 2, 3], toAdd: [] },
        { initial: ['a'], toAdd: ['b', 'c', 'd'] },
        { initial: [null], toAdd: [undefined, 0, ''] },
      ];

      testCases.forEach(({ initial, toAdd }, _index) => {
        const nativeArray = [...initial];
        const customArray = [...initial];

        const nativeResult = nativeArray.push(...toAdd);
        const customResult = customArray.customPush(...toAdd);

        expect(customResult).toBe(nativeResult);
        expect(customArray).toEqual(nativeArray);
      });
    });
  });

  describe('Array integrity checks', () => {
    it('should maintain array prototype chain like native push', () => {
      const nativeArray = [1, 2, 3];
      const customArray = [1, 2, 3];

      nativeArray.push(4);
      customArray.customPush(4);

      expect(Array.isArray(customArray)).toBe(Array.isArray(nativeArray));
      expect(customArray instanceof Array).toBe(nativeArray instanceof Array);
      expect(customArray.constructor).toBe(nativeArray.constructor);
    });

    it('should preserve array methods availability after push', () => {
      const nativeArray = [1, 2, 3];
      const customArray = [1, 2, 3];

      nativeArray.push(4);
      customArray.customPush(4);

      // Should still have all array methods
      expect(typeof customArray.pop).toBe('function');
      expect(typeof customArray.shift).toBe('function');
      expect(typeof customArray.slice).toBe('function');
      expect(typeof customArray.map).toBe('function');

      // And should work the same
      expect(customArray.pop()).toBe(nativeArray.pop());
      expect(customArray).toEqual(nativeArray);
    });
  });
});