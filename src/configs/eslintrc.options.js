/**
 * Returns ESLint options.
 *
 * @param importPrefix - Import prefix.
 * @returns ESLint options.
 */
module.exports = importPrefix => {
  return {
    importSources: [
      {
        autoImportSource: `${importPrefix}/facade-implementations/compare/natural-compare-wrapper`,
        sourcePattern:
          "@skylib/framework/*/facade-implementations/compare/natural-compare-wrapper",
        type: "wildcard"
      },
      {
        autoImportSource: `${importPrefix}/facade-implementations/datetime/date-fns-wrapper`,
        sourcePattern:
          "@skylib/framework/*/facade-implementations/datetime/date-fns-wrapper",
        type: "wildcard"
      },
      {
        autoImportSource: `${importPrefix}/facade-implementations/handlePromise/promiseHandler`,
        sourcePattern:
          "@skylib/framework/*/facade-implementations/handlePromise/promiseHandler",
        type: "wildcard"
      },
      {
        autoImportSource: `${importPrefix}/facade-implementations/httpRequest/axios-wrapper`,
        sourcePattern:
          "@skylib/framework/*/facade-implementations/httpRequest/axios-wrapper",
        type: "wildcard"
      },
      {
        autoImportSource: `${importPrefix}/facade-implementations/inlineSearch/lunr-wrapper`,
        sourcePattern:
          "@skylib/framework/*/facade-implementations/inlineSearch/lunr-wrapper",
        type: "wildcard"
      },
      {
        autoImportSource: `${importPrefix}/facade-implementations/inlineSearch/minisearch-wrapper`,
        sourcePattern:
          "@skylib/framework/*/facade-implementations/inlineSearch/minisearch-wrapper",
        type: "wildcard"
      },
      {
        autoImportSource: `${importPrefix}/facade-implementations/progressReporter/progressBar`,
        sourcePattern:
          "@skylib/framework/*/facade-implementations/progressReporter/progressBar",
        type: "wildcard"
      },
      {
        autoImportSource: `${importPrefix}/facade-implementations/reactiveStorage/reflectStorage`,
        sourcePattern:
          "@skylib/framework/*/facade-implementations/reactiveStorage/reflectStorage",
        type: "wildcard"
      },
      {
        autoImportSource: `${importPrefix}/facade-implementations/showAlert/jsAlert`,
        sourcePattern:
          "@skylib/framework/*/facade-implementations/showAlert/jsAlert",
        type: "wildcard"
      },
      {
        autoImportSource: `${importPrefix}/facade-implementations/showConfirm/jsConfirm`,
        sourcePattern:
          "@skylib/framework/*/facade-implementations/showConfirm/jsConfirm",
        type: "wildcard"
      },
      {
        autoImportSource: `${importPrefix}/facade-implementations/testDelay/configurableTestDelay`,
        sourcePattern:
          "@skylib/framework/*/facade-implementations/testDelay/configurableTestDelay",
        type: "wildcard"
      },
      {
        autoImportSource: `${importPrefix}/facade-implementations/uniqueId/uuidWrapper`,
        sourcePattern:
          "@skylib/framework/*/facade-implementations/uniqueId/uuidWrapper",
        type: "wildcard"
      },
      {
        altLocalNames: ["shortcutsPlugin"],
        autoImportSource: `${importPrefix}/plugins/shortcuts`,
        sourcePattern: "@skylib/framework/*/plugins/shortcuts",
        type: "wildcard"
      },
      {
        altLocalNames: ["frameworkTestUtils"],
        autoImportSource: `${importPrefix}/testUtils`,
        sourcePattern: "@skylib/framework/*/testUtils",
        type: "wildcard"
      },
      {
        autoImportSource: `${importPrefix}/vue-decorators/Prop`,
        sourcePattern: "@skylib/framework/*/vue-decorators/Prop",
        type: "wildcard"
      },
      {
        altLocalNames: ["tooltipsPlugin"],
        autoImportSource: `${importPrefix}/vue-plugins/tooltips`,
        sourcePattern: "@skylib/framework/*/vue-plugins/tooltips",
        type: "wildcard"
      }
    ]
  };
};
