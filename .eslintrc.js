module.exports = {
  extends: [require.resolve("@skylib/config/src/eslintrc")],
  rules: {
    // eslint-disable-next-line no-warning-comments -- Wait for @skylib/config update
    // fixme
    "@skylib/consistent-group-empty-lines": [
      "warn",
      {
        rules: [
          { selector: "ArrayExpression > .elements" },
          { selector: "CallExpression > .arguments" },
          { selector: "FunctionDeclaration > .params" },
          { selector: "FunctionExpression > .params" },
          { selector: "ImportDeclaration" },
          { selector: "ObjectExpression > .properties" },
          { selector: "TSDeclareFunction > .params" },
          { selector: "TSFunctionType > .params" },
          { selector: "TSInterfaceBody > .body" },
          {
            averageLinesGte: 3,
            everyLinesGte: 2,
            selector:
              ":matches(BlockStatement, Program, SwitchCase, TSModuleBlock) > ExpressionStatement",
            someHasDocComment: true,
            someLinesGte: 6
          }
        ]
      }
    ]
  }
};
