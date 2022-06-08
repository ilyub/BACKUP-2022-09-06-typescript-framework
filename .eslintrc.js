module.exports = {
  extends: [require.resolve("@skylib/config/src/eslintrc")],
  overrides: [
    {
      files: ["./src/facade-implementations/*/index.ts"],
      rules: { "@skylib/only-export-name": "off" }
    }
  ],
  rules: {
    // eslint-disable-next-line no-warning-comments -- Postponed
    // fixme
    "boundaries/element-types": "off"
  }
};
