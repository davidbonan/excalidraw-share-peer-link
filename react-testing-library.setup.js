import 'babel-polyfill';
import '@testing-library/jest-dom/extend-expect';

const originalError = console.error;
global.console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};
