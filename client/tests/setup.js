// console.log('Setup file executed');

import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

// extends Vitest's expect method with methods from react-testing-library
// expect.extend(matchers)

expect.extend({
  // ... other matchers
  toBeInTheDocument: (received) => {
    const pass = received !== null && received !== undefined;
    return {
      pass,
      message: () =>
        `Expected element ${pass ? "not " : ""}to be in the document`,
    };
  },
});

//console.log('After extending expect');

// runs a cleanup after each test case
afterEach(() => {
  cleanup();
});
