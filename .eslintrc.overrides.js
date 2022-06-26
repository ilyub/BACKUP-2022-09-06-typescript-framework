module.exports = {
  overrides: [
    {
      extends: require.resolve("@skylib/config/src/eslintrc.allow-promises"),
      files:
        "./{src,tests}/facade-implementations/{google,handle-promise,facebook}/**"
    }
  ]
};
