module.exports = {
  extends: require.resolve("@skylib/config/src/eslintrc.allow-type-assertions"),
  overrides: [
    {
      files:
        "./{src,tests}/facade-implementations/{google,handle-promise,facebook}/**",
      extends: require.resolve("@skylib/config/src/eslintrc.allow-promises")
    }
  ]
};
