/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  moduleFileExtensions: ["tsx", "ts", "js", "jsx"],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/*/__tests__/**/*.test.ts?(x)"],
};
