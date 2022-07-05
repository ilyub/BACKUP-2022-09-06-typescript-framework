module.exports = {
  rules: {
    "@skylib/consistent-import/framework": [
      "warn",
      {
        sources: [
          {
            _id: "test-utils",
            altLocalNames: ["frameworkTestUtils"],
            source: "@skylib/framework/src/test-utils",
            sourcePattern: "@skylib/framework/{dist,es}/test-utils",
            type: "wildcard"
          }
        ]
      }
    ]
  }
};
