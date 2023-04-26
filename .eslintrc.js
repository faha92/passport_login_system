module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:secure-access/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["secure-access"],
  rules: {},
};
