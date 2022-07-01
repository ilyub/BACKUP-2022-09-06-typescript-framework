const { eslint } = require("@skylib/config");

module.exports = {
  rules: {
    "boundaries/element-types": [
      "warn",
      {
        default: "disallow",
        rules: [
          ...eslint.boundaries.elementTypes.rules,
          ...eslint.boundaries.elementTypes.createRules(
            filename => [
              "src3",
              {
                dir1: "classes",
                dir2: "database",
                filename
              }
            ],
            "Item",
            "AttachedItem"
          ),
          ...eslint.boundaries.elementTypes.createRules(
            filename => [
              "src4",
              {
                dir1: "facade-implementations",
                dir2: "database",
                dir3: "pouchdb-wrapper",
                filename
              }
            ],
            "PouchProxy",
            "Database",
            "PouchWrapper"
          ),
          ...eslint.boundaries.elementTypes.createRules(
            filename => [
              "src5",
              {
                dir1: "facade-implementations",
                dir2: "database",
                dir3: "pouchdb-wrapper",
                dir4: "core",
                filename
              }
            ],
            "guards",
            ["map-reduce", "misc"]
          ),
          ...eslint.boundaries.elementTypes.createRules(
            filename => [
              "src4",
              {
                dir1: "facade-implementations",
                dir2: "lang",
                dir3: "dictionary",
                filename
              }
            ],
            "Definition",
            "Definitions",
            "Dictionary"
          ),
          // eslint-disable-next-line no-warning-comments -- Wait for @skylib/config update
          // fixme
          {
            allow: "{src1,src2,src3,src4,src5,src6,src7}",
            from: "{mocks,tests}"
          }
        ]
      }
    ]
  }
};
