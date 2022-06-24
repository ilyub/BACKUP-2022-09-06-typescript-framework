module.exports = {
  overrides: [
    {
      extends: require.resolve("@skylib/config/src/eslintrc.allow-promises"),
      files:
        "./{src,tests}/facade-implementations/{google,handle-promise,facebook}/**"
    },
    {
      extends: require.resolve(
        "@skylib/config/src/eslintrc.skip-only-export-check"
      ),
      files: "./src/facade-implementations/*/index.ts"
    }
  ]
};
