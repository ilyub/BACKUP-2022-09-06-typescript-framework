module.exports = {
  extends: [require.resolve("@skylib/config/src/eslintrc")],
  // eslint-disable-next-line no-warning-comments -- Wait for @skylib/config update
  // fixme
  overrides: [
    {
      files: ["tests/**"],
      rules: {
        "@skylib/no-mutable-signature": "off",
        "@skylib/prefer-readonly": "off"
      }
    }
  ],
  rules: {
    "@skylib/no-mutable-signature": [
      "warn",
      {
        ignoreClasses: true,
        ignoreIdentifiers: [/^mutable/u.source],
        ignoreInterfaces: true,
        ignoreNumberSignature: true,
        ignoreTypes: ["Promise", "ReadonlyMap", "ReadonlySet"]
      }
    ],
    "@skylib/no-unnecessary-readonly": "warn",
    "@skylib/no-unnecessary-writable": "warn",
    "@skylib/prefer-readonly": [
      "warn",
      {
        ignoreClasses: true,
        ignoreIdentifiers: [/^mutable/u.source],
        ignoreInterfaces: true,
        ignoreTypes: ["Promise", "ReadonlyMap", "ReadonlySet"]
      }
    ],
    "@typescript-eslint/consistent-indexed-object-style": [
      "warn",
      "index-signature"
    ]
  }
};
