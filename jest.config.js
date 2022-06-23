const { jest } = require("@skylib/config");

module.exports = {
  moduleNameMapper: {
    ...jest.preset.moduleNameMapper,
    [/^pouchdb$/u.source]: require.resolve("pouchdb/dist/pouchdb.js")
  },
  preset: "@skylib/config/src",
  testEnvironment: "@skylib/config/src/jest-env-jsdom"
};
