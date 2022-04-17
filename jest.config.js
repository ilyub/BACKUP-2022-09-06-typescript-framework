const config = require("@skylib/config/src/jest-preset");

module.exports = {
  moduleNameMapper: {
    ...config.moduleNameMapper,
    // eslint-disable-next-line no-warning-comments -- Wait for @skylib/config update
    // fixme
    [/^@$/u.source]: "<rootDir>/src",
    [/^pouchdb$/u.source]: require.resolve("pouchdb/dist/pouchdb.js")
  },
  preset: "@skylib/config/src",
  testEnvironment: "@skylib/config/src/jest-env-jsdom"
};
