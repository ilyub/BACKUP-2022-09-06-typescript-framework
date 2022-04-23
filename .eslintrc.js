module.exports = {
  extends: [require.resolve("@skylib/config/src/eslintrc")],
  // eslint-disable-next-line no-warning-comments -- Wait for @skylib/config update
  // fixme
  rules: {
    "@skylib/class-only-export": "off",
    "@skylib/only-export-name": "off",
    "@skylib/prefer-readonly": "off",
    "@skylib/primary-export-only": "off",
    "import/no-internal-modules": [
      "warn",
      {
        allow: [
          "@skylib/*/configs/*",
          "@skylib/config/src/*",
          "@skylib/functions/dist/testUtils",
          "date-fns/locale/*",
          "jest-extended/all",
          "src/testUtils",
          "ts-toolbelt/**"
        ]
      }
    ]
  }
};
