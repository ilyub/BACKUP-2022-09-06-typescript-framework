module.exports = {
  extends: [
    "./node_modules/@skylib/config/eslint",
    "./node_modules/@skylib/config/eslint/skylib/functions",
    "./node_modules/@skylib/config/eslint/skylib/facades",
    "./node_modules/@skylib/config/eslint/skylib/framework",
    "./node_modules/@skylib/config/eslint/special-locations",
    "./.eslintrc.overrides",
    "./.eslintrc.rule-overrides",
    "./.eslintrc.temp"
  ]
};
