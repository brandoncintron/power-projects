// Import the required testing library
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

// Mock for the language-icons lib
jest.mock('@/lib/language-icons', () => ({
  getFrameworkIcon: jest.fn(() => <div data-testid="mock-framework-icon" />),
  getLanguageIcon: jest.fn(() => <div data-testid="mock-language-icon" />),
  getDatabaseIcon: jest.fn(() => <div data-testid="mock-database-icon" />)
}));

// Suppress specific console errors that might appear during testing
const originalError = console.error;
console.error = (...args) => {
  if (
    /Warning: ReactDOM.render is no longer supported in React 18/.test(args[0]) ||
    /Warning: useLayoutEffect does nothing on the server/.test(args[0])
  ) {
    return;
  }
  originalError.call(console, ...args);
}; 