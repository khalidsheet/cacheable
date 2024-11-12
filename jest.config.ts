/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true, // Enable coverage collection
  coverageDirectory: "./coverage", // Where to output the coverage report
  coverageReporters: ["text", "lcov"], // Types of coverage reports to generate
  moduleNameMapper: {
    // Ensures TypeScript files are resolved correctly
    "^src/(.*)$": "<rootDir>/src/$1",
  },
};
