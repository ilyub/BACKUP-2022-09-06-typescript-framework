module.exports = {
  rules: {
    "@skylib/framework/consistent-import": [
      "warn",
      {
        sources: [
          {
            altLocalNames: ["frameworkTestUtils"],
            sourcePattern: "@skylib/framework/{dist,es}/test-utils",
            type: "wildcard"
          }
        ]
      }
    ]
  }
};
