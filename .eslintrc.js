module.exports = {
  extends: [require.resolve("@skylib/config/src/eslintrc")],
  // eslint-disable-next-line no-warning-comments -- Wait for @skylib/config update
  // fixme
  overrides: [
    {
      files: "tests/**",
      rules: {
        "@skylib/no-multi-type-tuples": "off",
        "@skylib/prefer-readonly-props": "off"
      }
    }
  ]
};
