module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["@har"],
  globals: {
    uni: true,
  },
  rules: {
    "@typescript-eslint/ban-types": "off",
  },
};
