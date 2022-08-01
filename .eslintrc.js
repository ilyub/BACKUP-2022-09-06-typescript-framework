module.exports = {
  extends: [
    require.resolve("@skylib/config/src/eslintrc"),
    "./.eslintrc.overrides",
    "./.eslintrc.rule-overrides",
    "./.eslintrc.temp"
  ]
};
