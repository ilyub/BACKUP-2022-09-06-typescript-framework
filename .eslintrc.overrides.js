module.exports = {
  extends: [
    "plugin:@skylib/functions",
    "plugin:@skylib/facades",
    "plugin:@skylib/framework",
    "./node_modules/@skylib/config/src/eslintrc/options/allow-type-assertions"
  ],
  overrides: [
    {
      files:
        "./{src,tests}/facade-implementations/{google,handle-promise,facebook}/**",
      extends:
        "./node_modules/@skylib/config/src/eslintrc/options/allow-promises"
    }
  ]
};
