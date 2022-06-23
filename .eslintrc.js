module.exports = {
  extends: [
    require.resolve("@skylib/config/src/eslintrc"),
    require.resolve("@skylib/config/src/eslintrc.allow-type-assertions"),
    require.resolve("@skylib/functions/configs/eslintrc"),
    require.resolve("@skylib/facades/configs/eslintrc"),
    "./configs/eslintrc"
  ],
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
    },
    { extends: ["./.eslintrc.overrides", "./.eslintrc.temp"], files: "**" }
  ]
};
