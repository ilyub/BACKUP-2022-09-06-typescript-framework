module.exports = {
  extends: [
    "./node_modules/@skylib/config/eslint/options/allow-type-assertions"
  ],
  overrides: [
    {
      files:
        "./{src,tests}/facade-implementations/{google,handle-promise,facebook}/**",
      extends: "./node_modules/@skylib/config/eslint/options/allow-promises"
    }
  ]
};
