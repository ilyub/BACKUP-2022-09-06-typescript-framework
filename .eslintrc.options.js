module.exports = {
  consistentImport: [
    {
      localName: "MiniSearch",
      sourcePattern: "minisearch",
      type: "default"
    },
    {
      autoImportSource: "./classes",
      sourcePattern: "@skylib/framework/src/classes",
      type: "wildcard"
    },
    {
      autoImportSource: "./facade-implementations",
      localName: "implementations",
      sourcePattern: "@skylib/framework/src/facade-implementations",
      type: "wildcard"
    },
    {
      autoImportSource: "./test-utils",
      sourcePattern: "@skylib/framework/src/test-utils",
      type: "wildcard"
    }
  ],
  extends: [
    "@skylib/functions/configs/eslintrc.options.js",
    "@skylib/facades/configs/eslintrc.options",
    "./configs/eslintrc.options.js"
  ]
};
