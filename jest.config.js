const config = require("@skylib/config/src/jest-preset");

module.exports = {
  // eslint-disable-next-line no-warning-comments
  // fixme: Wait for @skylib/config update
  collectCoverageFrom: ["src/**/*.{ts,tsx,vue}", "!**/*.d.ts"],
  moduleNameMapper: {
    ...config.moduleNameMapper,
    [/^pouchdb$/u.source]: require.resolve("pouchdb/dist/pouchdb.js")
  },
  preset: "@skylib/config/src",
  testEnvironment: "@skylib/config/src/jest-env-jsdom"
};
