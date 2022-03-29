module.exports = {
  consistentImport: [
    {
      localName: "MiniSearch",
      sourcePattern: "minisearch",
      type: "default"
    }
  ],
  extends: [
    require("@skylib/functions/src/configs/eslintrc.options")(
      "@skylib/functions/dist/"
    ),
    require("./src/configs/eslintrc.options")("@/")
  ]
};
