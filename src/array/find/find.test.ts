import { describe, it, expect, beforeEach, vi } from 'vitest';

import './find'

describe('Array.prototype.customFind', () => {
  describe('Basic functionality with objects', () => {
    let users: Array<{ id: number; name: string; age: number }>;

    beforeEach(() => {
      users = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 }
      ];
    });

    it('should find an existing user by name', () => {
      const result = users.customFind(user => user.name === 'Bob');
      expect(result).toEqual({ id: 2, name: 'Bob', age: 30 });
    });

    it('should find an existing user by id', () => {
      const result = users.customFind(user => user.id === 3);
      expect(result).toEqual({ id: 3, name: 'Charlie', age: 35 });
    });

    it('should return undefined when no match is found', () => {
      const result = users.customFind(user => user.name === 'David');
      expect(result).toBeUndefined();
    });

    it('should find the first matching element when multiple matches exist', () => {
      const duplicatedUsers = [
        ...users,
        { id: 4, name: 'Bob', age: 40 }
      ];
      const result = duplicatedUsers.customFind(user => user.name === 'Bob');
      expect(result).toEqual({ id: 2, name: 'Bob', age: 30 });
    });
  });

  describe('Basic functionality with primitives', () => {
    it('should find a number in an array', () => {
      const numbers = [1, 2, 3, 4, 5];
      const result = numbers.customFind(num => num === 3);
      expect(result).toBe(3);
    });

    it('should find a string in an array', () => {
      const fruits = ['apple', 'banana', 'cherry'];
      const result = fruits.customFind(fruit => fruit === 'banana');
      expect(result).toBe('banana');
    });

    it('should return undefined for primitives when no match found', () => {
      const numbers = [1, 2, 3];
      const result = numbers.customFind(num => num === 5);
      expect(result).toBeUndefined();
    });
  });

  describe('Callback function parameters', () => {
    it('should pass correct value, index, and array to callback', () => {
      const testArray = ['a', 'b', 'c'];
      const callbackSpy = vi.fn(() => false);

      testArray.customFind(callbackSpy);

      expect(callbackSpy).toHaveBeenCalledTimes(3);
      expect(callbackSpy).toHaveBeenNthCalledWith(1, 'a', 0, testArray);
      expect(callbackSpy).toHaveBeenNthCalledWith(2, 'b', 1, testArray);
      expect(callbackSpy).toHaveBeenNthCalledWith(3, 'c', 2, testArray);
    });

    it('should stop execution when first match is found', () => {
      const numbers = [1, 2, 3, 4, 5];
      const callbackSpy = vi.fn(num => num === 3);

      const result = numbers.customFind(callbackSpy);

      expect(result).toBe(3);
      expect(callbackSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('thisArg parameter', () => {
    it('should use thisArg as context in callback function', () => {
      const numbers = [1, 2, 3, 4, 5];
      const context = { threshold: 3 };

      const result = numbers.customFind(function(this: { threshold: number }, num: number) {
        return num > this.threshold;
      }, context);

      expect(result).toBe(4);
    });

    it('should work without thisArg parameter', () => {
      const numbers = [1, 2, 3, 4, 5];
      const result = numbers.customFind(num => num > 3);
      expect(result).toBe(4);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty arrays', () => {
      const emptyArray: number[] = [];
      const result = emptyArray.customFind(num => num === 1);
      expect(result).toBeUndefined();
    });

    it('should handle arrays with null and undefined values', () => {
      const mixedArray = [null, undefined, 'valid', null];
      const result = mixedArray.customFind(item => item === 'valid');
      expect(result).toBe('valid');
    });

    it('should find null values when specifically searched for', () => {
      const mixedArray = [1, null, 3];
      const result = mixedArray.customFind(item => item === null);
      expect(result).toBeNull();
    });

    it('should find undefined values when specifically searched for', () => {
      const mixedArray = [1, undefined, 3];
      const result = mixedArray.customFind(item => item === undefined);
      expect(result).toBeUndefined();
    });

    it('should handle arrays with falsy values', () => {
      const falsyArray = [0, false, '', null];
      const result = falsyArray.customFind(item => item === false);
      expect(result).toBe(false);
    });
  });

  describe('Complex search scenarios', () => {
    it('should handle complex object searches with nested conditions', () => {
      const products = [
        { id: 1, name: 'Laptop', category: 'Electronics', price: 999 },
        { id: 2, name: 'Book', category: 'Education', price: 29 },
        { id: 3, name: 'Phone', category: 'Electronics', price: 699 }
      ];

      const result = products.customFind(product =>
        product.category === 'Electronics' && product.price < 800
      );

      expect(result).toEqual({ id: 3, name: 'Phone', category: 'Electronics', price: 699 });
    });

    it('should handle search with regular expressions', () => {
      const emails = ['user@gmail.com', 'admin@company.org', 'test@yahoo.com'];
      const result = emails.customFind(email => /gmail\.com$/.test(email));
      expect(result).toBe('user@gmail.com');
    });
  });

  describe('Comparison with native Array.find', () => {
    it('should produce identical results to native Array.find for basic searches', () => {
      const numbers = [1, 2, 3, 4, 5];
      const predicate = (num: number) => num > 3;

      const nativeResult = numbers.find(predicate);
      const customResult = numbers.customFind(predicate);

      expect(customResult).toBe(nativeResult);
    });

    it('should produce identical results to native Array.find when no match is found', () => {
      const numbers = [1, 2, 3];
      const predicate = (num: number) => num > 5;

      const nativeResult = numbers.find(predicate);
      const customResult = numbers.customFind(predicate);

      expect(customResult).toBe(nativeResult);
      expect(customResult).toBeUndefined();
    });
  });
});