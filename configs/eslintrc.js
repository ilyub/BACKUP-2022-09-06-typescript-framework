module.exports = {
  rules: {
    "@skylib/framework/consistent-import": [
      "warn",
      {
        sources: [
          {
            _id: "test-utils",
            altLocalNames: ["frameworkTestUtils"],
            source: "@skylib/framework/{dist,es}/test-utils",
            type: "wildcard"
          }
        ]
      }
    ]
  }
};
