module.exports = {
  extends: [
    require.resolve("@skylib/config/src/eslintrc"),
    require.resolve("@skylib/config/src/eslintrc.allow-type-assertions"),
    require.resolve("@skylib/functions/configs/eslintrc"),
    require.resolve("@skylib/facades/configs/eslintrc"),
    "./configs/eslintrc",
    "./.eslintrc.overrides",
    "./.eslintrc.rule-overrides",
    "./.eslintrc.temp"
  ]
};
