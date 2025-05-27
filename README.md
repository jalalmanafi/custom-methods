# Custom Methods

A TypeScript project that implements custom versions of JavaScript's built-in array and object methods. This project provides educational implementations and alternative versions of native methods with identical functionality.

## 🎯 Purpose

This project serves as:
- **Educational resource** for understanding how JavaScript built-in methods work internally
- **Custom implementations** with identical behavior to native methods
- **TypeScript practice** with generics, type safety, and prototype extensions
- **Testing ground** for exploring JavaScript array and object manipulation

## 📁 Project Structure

```
CUSTOM-METHODS/
├── src/
│   ├── array/
│   │   ├── filter/          # Custom Array.prototype.filter implementation
│   │   ├── find/            # Custom Array.prototype.find implementation
│   │   ├── map/             # Custom Array.prototype.map implementation
│   │   └── push/            # Custom Array.prototype.push implementation
│   └── object/              # Custom object methods (future implementations)
├── public/                  # Static assets
├── node_modules/           # Dependencies
├── main.ts                 # Main entry point
├── style.css              # Styling
├── index.html             # HTML entry point
├── vite-env.d.ts          # Vite environment types
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies and scripts
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TypeScript knowledge

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CUSTOM-METHODS
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 📚 Implemented Methods

### Array Methods

#### ✅ `customPush(...args)`
Custom implementation of `Array.prototype.push()`.

```typescript
const arr = [1, 2, 3];
const newLength = arr.customPush(4, 5); // Returns 5
console.log(arr); // [1, 2, 3, 4, 5]
```

#### ✅ `customMap(callback, thisArg?)`
Custom implementation of `Array.prototype.map()`.

```typescript
const numbers = [1, 2, 3];
const doubled = numbers.customMap(x => x * 2); // [2, 4, 6]
```

#### ✅ `customFilter(callback, thisArg?)`
Custom implementation of `Array.prototype.filter()`.

```typescript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.customFilter(x => x % 2 === 0); // [2, 4]
```

#### ✅ `customFind(callback, thisArg?)`
Custom implementation of `Array.prototype.find()`.

```typescript
const users = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}];
const user = users.customFind(u => u.id === 2); // {id: 2, name: 'Jane'}
```

## 🧪 Testing

The project includes comprehensive test suites using Vitest:

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm run test:watch
```

### Test Coverage

- ✅ Behavior comparison with native methods
- ✅ Edge cases (empty arrays, sparse arrays, etc.)
- ✅ Type safety verification
- ✅ Performance benchmarks
- ✅ Error handling

## 🔧 Development

### Adding New Methods

1. Create a new folder in the appropriate category (`src/array/` or `src/object/`)
2. Implement the method with proper TypeScript types
3. Add comprehensive JSDoc documentation
4. Create test files comparing with native behavior
5. Update this README

### Code Style

- Use TypeScript for all implementations
- Follow JSDoc documentation standards
- Maintain identical behavior to native methods
- Include comprehensive examples
- Write tests for all edge cases

## 📖 Documentation Standards

Each method follows this documentation pattern:

```typescript
/**
 * customMethodName - A custom implementation of the native method
 *
 * Brief description of what the method does and its behavior.
 *
 * @template T - Generic type descriptions
 * @param {type} paramName - Parameter descriptions
 * @returns {type} Return value description
 *
 * @example
 * // Usage examples
 * [1, 2, 3].customMethod(); // Expected output
 */
```

## 🎓 Educational Value

This project demonstrates:

- **Prototype Extensions**: How to safely extend built-in prototypes
- **Generic Types**: Advanced TypeScript generics usage
- **Algorithm Implementation**: Understanding of built-in method algorithms
- **Testing Strategies**: Comprehensive testing approaches
- **Documentation**: Professional code documentation practices

## 🔍 Features

- **Type Safety**: Full TypeScript support with proper generics
- **Identical Behavior**: Methods behave exactly like native implementations
- **Comprehensive Testing**: Extensive test suites with edge cases
- **Educational Comments**: Detailed inline documentation
- **Modern Tooling**: Vite, TypeScript, Vitest setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-method`
3. Implement the method with tests and documentation
4. Commit your changes: `git commit -m 'Add customMethodName'`
5. Push to the branch: `git push origin feature/new-method`
6. Submit a pull request

### Contribution Guidelines

- Ensure identical behavior to native methods
- Include comprehensive tests
- Follow the established documentation format
- Add examples and edge cases
- Update the README with new methods

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [MDN Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)

## 🏆 Goals

- [ ] Implement all major array methods
- [ ] Add object methods
- [ ] Create performance benchmarks
- [ ] Add interactive documentation
- [ ] Publish as npm package
- [ ] Create tutorial series

---

**Note**: This project is for educational purposes. In production code, always use the native JavaScript methods unless you have specific requirements that necessitate custom implementations.