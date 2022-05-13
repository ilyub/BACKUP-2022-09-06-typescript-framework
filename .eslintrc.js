module.exports = {
  extends: [require.resolve("@skylib/config/src/eslintrc")],
  overrides: [
    {
      files: ["./src/facade-implementations/*/index.ts"],
      rules: { "@skylib/only-export-name": "off" }
    }
  ]
};
