module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ["@har"],
  rules: {
    "@typescript-eslint/ban-types": "off",
  },
};
