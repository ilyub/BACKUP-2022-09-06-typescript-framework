module.exports = {
  consistentImport: [
    {
      altLocalNames: ["frameworkTestUtils"],
      autoImportSource: "@/testUtils",
      sourcePattern: "@skylib/framework/src/testUtils",
      type: "wildcard"
    },
    {
      autoImportSource: "@/classes",
      sourcePattern: "@skylib/framework/src/classes",
      type: "wildcard"
    },
    {
      autoImportSource: "@/facade-implementations",
      localName: "implementations",
      sourcePattern: "@skylib/framework/src/facade-implementations",
      type: "wildcard"
    },
    {
      autoImportSource:
        "@/facade-implementations/compare/natural-compare-wrapper",
      sourcePattern:
        "@skylib/framework/src/facade-implementations/compare/natural-compare-wrapper",
      type: "wildcard"
    },
    {
      autoImportSource: "@/facade-implementations/datetime/date-fns-wrapper",
      sourcePattern:
        "@skylib/framework/src/facade-implementations/datetime/date-fns-wrapper",
      type: "wildcard"
    },
    {
      autoImportSource: "@/facade-implementations/handlePromise/promiseHandler",
      sourcePattern:
        "@skylib/framework/src/facade-implementations/handlePromise/promiseHandler",
      type: "wildcard"
    },
    {
      autoImportSource: "@/facade-implementations/httpRequest/axios-wrapper",
      sourcePattern:
        "@skylib/framework/src/facade-implementations/httpRequest/axios-wrapper",
      type: "wildcard"
    },
    {
      autoImportSource: "@/facade-implementations/inlineSearch/lunr-wrapper",
      sourcePattern:
        "@skylib/framework/src/facade-implementations/inlineSearch/lunr-wrapper",
      type: "wildcard"
    },
    {
      autoImportSource:
        "@/facade-implementations/inlineSearch/minisearch-wrapper",
      sourcePattern:
        "@skylib/framework/src/facade-implementations/inlineSearch/minisearch-wrapper",
      type: "wildcard"
    },
    {
      autoImportSource: "@/facade-implementations/progressReporter/progressBar",
      sourcePattern:
        "@skylib/framework/src/facade-implementations/progressReporter/progressBar",
      type: "wildcard"
    },
    {
      autoImportSource:
        "@/facade-implementations/reactiveStorage/reflectStorage",
      sourcePattern:
        "@skylib/framework/src/facade-implementations/reactiveStorage/reflectStorage",
      type: "wildcard"
    },
    {
      autoImportSource: "@/facade-implementations/showAlert/jsAlert",
      sourcePattern:
        "@skylib/framework/src/facade-implementations/showAlert/jsAlert",
      type: "wildcard"
    },
    {
      autoImportSource: "@/facade-implementations/showConfirm/jsConfirm",
      sourcePattern:
        "@skylib/framework/src/facade-implementations/showConfirm/jsConfirm",
      type: "wildcard"
    },
    {
      autoImportSource:
        "@/facade-implementations/testDelay/configurableTestDelay",
      sourcePattern:
        "@skylib/framework/src/facade-implementations/testDelay/configurableTestDelay",
      type: "wildcard"
    },
    {
      autoImportSource: "@/facade-implementations/uniqueId/uuidWrapper",
      sourcePattern:
        "@skylib/framework/src/facade-implementations/uniqueId/uuidWrapper",
      type: "wildcard"
    },
    {
      altLocalNames: ["shortcutsPlugin"],
      autoImportSource: "@/plugins/shortcuts",
      sourcePattern: "@skylib/framework/src/plugins/shortcuts",
      type: "wildcard"
    },
    {
      autoImportSource: "@/vue-decorators/Prop",
      sourcePattern: "@skylib/framework/src/vue-decorators/Prop",
      type: "wildcard"
    },
    {
      altLocalNames: ["tooltipsPlugin"],
      autoImportSource: "@/vue-plugins/tooltips",
      sourcePattern: "@skylib/framework/src/vue-plugins/tooltips",
      type: "wildcard"
    },
    {
      localName: "MiniSearch",
      sourcePattern: "minisearch",
      type: "default"
    }
  ],
  extends: [require("@skylib/functions/configs/eslintrc.options")]
};
