const { eslint } = require("@skylib/config/api");

const consistentImport = eslint.rules["@skylib/consistent-import"];

module.exports = {
  rules: {
    "@skylib/consistent-import": [
      "warn",
      {
        sources: [
          ...consistentImport.sources,
          {
            _id: "classes",
            source: "@skylib/framework/src/classes",
            wildcard: true
          },
          {
            _id: "classes/database",
            source: "@skylib/framework/src/classes/database",
            wildcard: true
          },
          {
            _id: "implementations",
            localName: "implementations",
            source: "@skylib/framework/src/facade-implementations",
            wildcard: true
          },
          {
            _id: "implementations/compare",
            source: "@skylib/framework/src/facade-implementations/compare",
            wildcard: true
          },
          {
            _id: "implementations/database",
            source: "@skylib/framework/src/facade-implementations/database",
            wildcard: true
          },
          {
            _id: "implementations/datetime",
            source: "@skylib/framework/src/facade-implementations/datetime",
            wildcard: true
          },
          {
            _id: "implementations/dump",
            source: "@skylib/framework/src/facade-implementations/dump",
            wildcard: true
          },
          {
            _id: "implementations/facebook",
            source: "@skylib/framework/src/facade-implementations/facebook",
            wildcard: true
          },
          {
            _id: "implementations/faker",
            source: "@skylib/framework/src/facade-implementations/faker",
            wildcard: true
          },
          {
            _id: "implementations/google",
            source: "@skylib/framework/src/facade-implementations/google",
            wildcard: true
          },
          {
            _id: "implementations/handle-promise",
            source:
              "@skylib/framework/src/facade-implementations/handle-promise",
            wildcard: true
          },
          {
            _id: "implementations/http-request",
            source: "@skylib/framework/src/facade-implementations/http-request",
            wildcard: true
          },
          {
            _id: "implementations/inline-search",
            source:
              "@skylib/framework/src/facade-implementations/inline-search",
            wildcard: true
          },
          {
            _id: "implementations/lang",
            source: "@skylib/framework/src/facade-implementations/lang",
            wildcard: true
          },
          {
            _id: "implementations/lang/dictionary",
            source:
              "@skylib/framework/src/facade-implementations/lang/dictionary",
            wildcard: true
          },
          {
            _id: "implementations/progress-reporter",
            source:
              "@skylib/framework/src/facade-implementations/progress-reporter",
            wildcard: true
          },
          {
            _id: "implementations/reactive-storage",
            source:
              "@skylib/framework/src/facade-implementations/reactive-storage",
            wildcard: true
          },
          {
            _id: "implementations/show-alert",
            source: "@skylib/framework/src/facade-implementations/show-alert",
            wildcard: true
          },
          {
            _id: "implementations/show-confirm",
            source: "@skylib/framework/src/facade-implementations/show-confirm",
            wildcard: true
          },
          {
            _id: "implementations/test-delay",
            source: "@skylib/framework/src/facade-implementations/test-delay",
            wildcard: true
          },
          {
            _id: "implementations/unique-id",
            source: "@skylib/framework/src/facade-implementations/unique-id",
            wildcard: true
          }
        ]
      }
    ],
    "@skylib/no-sibling-import": [
      "warn",
      {
        folders: [
          {
            filesToLint: ["./*"],
            levels: [["./jest.config"], ["./jest.config.fast"]]
          },
          {
            filesToLint: ["./src/classes/database/*"],
            levels: [["./Item"], ["./AttachedItem"]]
          },
          {
            filesToLint: [
              "./src/facade-implementations/database/pouchdb-wrapper/*"
            ],
            levels: [["./PouchProxy"], ["./Database"], ["./PouchWrapper"]]
          },
          {
            filesToLint: ["./src/facade-implementations/lang/dictionary/*"],
            levels: [["./Definition"], ["./Definitions"], ["./Dictionary"]]
          },
          {
            filesToLint: [
              "./src/facade-implementations/database/pouchdb-wrapper/core/*"
            ],
            levels: [["./guards"], ["./misc"]]
          }
        ]
      }
    ]
  }
};
