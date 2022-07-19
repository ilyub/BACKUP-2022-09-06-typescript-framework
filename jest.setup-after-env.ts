import * as functionsTestUtils from "@skylib/functions/dist/test-utils";
import * as testUtils from "./src/test-utils";
import { evaluate } from "@skylib/functions";
import { implementations } from "./src";

const definitions = evaluate(
  (): implementations.lang.dictionary.DefinitionsByLocale => {
    const { dictionary } = implementations.lang;

    const enUs = new dictionary.Definitions({
      pluralReduce: dictionary.pluralReduce,
      wordForms: {},
      words: {
        Confirm: "Confirm",
        Correct: "Correct",
        Day: "Day",
        FieldIsTooShort: "Field is too short",
        In: "In",
        Must: "Must",
        MustBeSameAs: "Must be same as",
        MustBeValidField: "Must be valid field",
        MustBeValidString: "Must be valid string",
        Password: "Password",
        String: "String"
      }
    });

    return { "en-US": enUs, "ru-RU": enUs };
  }
);

functionsTestUtils.jestSetup();
testUtils.jestSetup();
testUtils.jestSetup.dictionary("en-US", definitions);
beforeEach(functionsTestUtils.jestReset);
beforeEach(testUtils.jestReset);
beforeEach(() => {
  testUtils.jestReset.dictionary("en-US", definitions);
});
