const { jest } = require("@skylib/config");

module.exports = {
  moduleNameMapper: {
    ...jest.preset.moduleNameMapper,
    [/^pouchdb$/u.source]: require.resolve("pouchdb/dist/pouchdb.js")
  },
  preset: "@skylib/config/jest",
  testEnvironment: "@skylib/config/jest/environments/jsdom"
};
