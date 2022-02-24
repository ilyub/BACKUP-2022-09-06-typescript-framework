module.exports = {
  extends: [require.resolve("@skylib/config/src/eslintrc")],
  rules: {
    "@typescript-eslint/switch-exhaustiveness-check": "off",
    "eslint-comments/disable-enable-pair": [
      "error",
      { "allowWholeFile": true }
    ],
    // test files
    "max-classes-per-file": "off",
    "prefer-object-has-own": "off",
    "regexp/prefer-lookaround": "off",
    // test files
    "unicorn/no-null": "off"
  }
};
