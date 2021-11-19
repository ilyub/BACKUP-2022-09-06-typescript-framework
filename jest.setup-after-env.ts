import * as functionsTestUtils from "@skylib/functions/dist/testUtils";
import type { ReadonlyPartialRecord } from "@skylib/functions/dist/types/core";
import type { LocaleName } from "@skylib/functions/dist/types/locales";

import { Definitions } from "./src/facade-implementations/lang/dictionary";
import * as testUtils from "./src/testUtils";

declare global {
  namespace facades {
    namespace lang {
      interface Context {
        readonly InXDays: true;
      }

      interface Word {
        readonly Confirm: true;
        readonly Correct: true;
        readonly Day: true;
        readonly FieldIsTooShort: true;
        readonly In: true;
        readonly Must: true;
        readonly MustBeSameAs: true;
        readonly MustBeValidField: true;
        readonly MustBeValidString: true;
        readonly Password: true;
        readonly String: true;
      }
    }
  }
}

const definitions: ReadonlyPartialRecord<LocaleName, Definitions> = {
  "en-US": new Definitions({
    pluralReduce(count): number {
      count = Math.abs(count);

      return count === 1 ? 1 : 2;
    },
    wordForms: {},
    words: {
      Confirm: "Password confirm",
      Correct: "Correct",
      Day: {
        1: "Day",
        2: "Days"
      },
      FieldIsTooShort: "<Field> must have at least @min characters",
      In: "In",
      Must: "Must",
      MustBeSameAs: "Must be same as <field2>",
      MustBeValidField: "Must be valid <field>",
      MustBeValidString: "Must be valid string",
      Password: "Password",
      SampleWord: "-",
      String: "String"
    }
  }),
  "ru-RU": new Definitions({
    pluralReduce(count): number {
      count = Math.abs(count);

      if (count >= 10 && count <= 19) return 5;

      if (count % 10 === 1) return 1;

      if (count % 10 === 2) return 2;

      if (count % 10 === 3) return 2;

      if (count % 10 === 4) return 2;

      return 5;
    },
    wordForms: {
      "кем-чем": ["кем-чем-им", "кем-чем-ей", "кем-чем-им-ср"],
      "кого-чего": ["кого-чего-его", "кого-чего-ее", "кого-чего-его-ср"],
      "кого-что": ["кого-что-его", "кого-что-ее", "кого-что-его-ср"],
      "ком-чем": ["ком-чем-нем", "ком-чем-ней", "ком-чем-нем-ср"],
      "кому-чему": ["кому-чему-ему", "кому-чему-ей", "кому-чему-ему-ср"],
      "кто-что": ["кто-что-он", "кто-что-она", "кто-что-оно"]
    },
    words: {
      Confirm: {
        "кто-что-оно": "Подтверждение пароля"
      },
      Correct: [
        "кого-что-его",
        {
          "кого-что-его": "Корректный",
          "кого-что-его-ср": "Корректное",
          "кого-что-ее": "Корректную"
        }
      ],
      Day: [
        "кто-что-он",
        {
          "кого-чего-его": {
            1: "Дня",
            2: "Дней",
            5: "Дней"
          },
          "кто-что-он": {
            1: "День",
            2: "Дня",
            5: "Дней"
          }
        },
        {
          InXDays: "кого-чего-его"
        }
      ],
      FieldIsTooShort:
        "<Field:кто-что> {must} содержать не менее @min символов",
      In: "В течение",
      Must: [
        "кто-что-он",
        {
          "кто-что-он": "Должен",
          "кто-что-она": "Должна",
          "кто-что-оно": "Должно"
        }
      ],
      MustBeSameAs: "<Field:кто-что> {must} совпадать с <field2.кем-чем>",
      MustBeValidField: "Введите {correct} <field:кого-что>",
      MustBeValidString: "Введите {correct.кого-что-ее} строку",
      Password: [
        "кто-что-он",
        {
          "кем-чем-им": "Паролем",
          "кто-что-он": "Пароль"
        }
      ],
      SampleWord: "-",
      String: [
        "кто-что-она",
        {
          "кого-что-ее": {
            1: "Строку",
            2: "Строки",
            5: "Строк"
          },
          "кто-что-она": {
            1: "Строка",
            2: "Строки",
            5: "Строк"
          }
        }
      ]
    }
  })
};

functionsTestUtils.jestSetup();
testUtils.jestSetup();
testUtils.jestSetup.dictionary("en-US", definitions);
beforeEach(functionsTestUtils.jestReset);
beforeEach(testUtils.jestReset);
beforeEach(() => {
  testUtils.jestReset.dictionary("en-US", definitions);
});

if (JEST_ENV === "jsdom") {
  functionsTestUtils.jestSetup.dom();
  testUtils.jestSetup.dom();
  beforeEach(functionsTestUtils.jestReset.dom);
  beforeEach(testUtils.jestReset.dom);
}
