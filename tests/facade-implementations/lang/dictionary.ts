/* eslint jest/max-expects: [warn, { max: 5 }] -- Ok */

import type { LocaleName } from "@skylib/functions";
import { implementations } from "@";
import type { lang } from "@skylib/facades";
import { typedef } from "@skylib/functions";

const { Definitions, Dictionary, configure, getConfiguration, pluralReduce } =
  implementations.lang.dictionary;

const dictionary = Dictionary.create({
  "en-US": new Definitions({
    pluralReduce,
    wordForms: {},
    words: {
      Confirm: "Password confirm",
      Correct: "Correct",
      Day: { 1: "Day", 2: "Days" },
      FieldIsTooShort: "<Field> must have at least @min characters",
      In: "In",
      Must: "Must",
      MustBeSameAs: "Must be same as <field2>",
      MustBeValidField: "Must be valid <field>",
      MustBeValidString: "Must be valid String",
      Password: "Password",
      String: "String"
    }
  }),
  "ru-RU": new Definitions({
    pluralReduce: pluralReduce.ru,
    wordForms: {
      "кем-чем": ["кем-чем-им", "кем-чем-ей", "кем-чем-им-ср"],
      "кого-чего": ["кого-чего-его", "кого-чего-ее", "кого-чего-его-ср"],
      "кого-что": ["кого-что-его", "кого-что-ее", "кого-что-его-ср"],
      "ком-чем": ["ком-чем-нем", "ком-чем-ней", "ком-чем-нем-ср"],
      "кому-чему": ["кому-чему-ему", "кому-чему-ей", "кому-чему-ему-ср"],
      "кто-что": ["кто-что-он", "кто-что-она", "кто-что-оно"]
    },
    words: {
      Confirm: { "кто-что-оно": "Подтверждение пароля" },
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
          "кого-чего-его": { 1: "Дня", 2: "Дней", 5: "Дней" },
          "кто-что-он": { 1: "День", 2: "Дня", 5: "Дней" }
        },
        { InXDays: "кого-чего-его" }
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
      MustBeValidString: "Введите {correct.кого-что-ее} Строку",
      Password: [
        "кто-что-он",
        { "кем-чем-им": "Паролем", "кто-что-он": "Пароль" }
      ],
      String: [
        "кто-что-она",
        {
          "кого-что-ее": { 1: "Строку", 2: "Строки", 5: "Строк" },
          "кто-что-она": { 1: "Строка", 2: "Строки", 5: "Строк" }
        }
      ]
    }
  })
});

test("Dictionary.context", () => {
  configure({ localeName: "ru-RU" });
  expect(dictionary.day).toBe("день");
  expect(dictionary.context("InXDays").day).toBe("дня");
  expect(dictionary.context("InXDays").day).toBe("дня");
  expect(dictionary.context("InXDays").context("InXDays").day).toBe("дня");
  expect(dictionary.context("InXDays").context("InXDays").day).toBe("дня");
});

test.each([
  {
    expectedEn: "Must be valid String",
    expectedRu: "Введите корректную Строку",
    key: typedef<lang.Key>("MustBeValidString")
  },
  {
    expectedEn: "must be valid String",
    expectedRu: "введите корректную Строку",
    key: typedef<lang.Key>("mustBeValidString")
  },
  {
    expectedEn: "MUST BE VALID STRING",
    expectedRu: "ВВЕДИТЕ КОРРЕКТНУЮ СТРОКУ",
    key: typedef<lang.Key>("MUSTBEVALIDSTRING")
  },
  {
    expectedEn: "must be valid string",
    expectedRu: "введите корректную строку",
    key: typedef<lang.Key>("mustbevalidstring")
  },
  {
    expectedEn: "Unknown",
    expectedRu: "Unknown",
    key: typedef<lang.Key>("plain:Unknown")
  }
])("Dictionary.get", ({ expectedEn, expectedRu, key }) => {
  expect(dictionary.get(key)).toBe(expectedEn);
  configure({ localeName: "ru-RU" });
  expect(dictionary.get(key)).toBe(expectedRu);
});

test.each([
  { expectedEn: "Day", expectedRu: "День", key: "Day" },
  { expectedEn: "Unknown", expectedRu: "Unknown", key: "plain:Unknown" },
  { expectedEn: "Unknown", expectedRu: "Unknown", key: "Unknown" }
])("Dictionary.getIfExists", ({ expectedEn, expectedRu, key }) => {
  expect(dictionary.getIfExists(key)).toBe(expectedEn);
  configure({ localeName: "ru-RU" });
  expect(dictionary.getIfExists(key)).toBe(expectedRu);
});

test.each([
  { expected: true, key: "MustBeValidString" },
  { expected: true, key: "mustBeValidString" },
  { expected: true, key: "MUSTBEVALIDSTRING" },
  { expected: true, key: "mustbevalidstring" },
  { expected: true, key: "plain:Unknown" },
  { expected: false, key: "Unknown" }
])("Dictionary.has", ({ expected, key }) => {
  expect(dictionary.has(key)).toBe(expected);
  configure({ localeName: "ru-RU" });
  expect(dictionary.has(key)).toBe(expected);
});

test.each(["str1", "str2"])("Dictionary.plain", str => {
  expect(dictionary.plain(str)).toStartWith(`plain:${str}`);
});

test.each([
  { count: 1, expectedEn: "1 day", expectedRu: "1 день" },
  { count: 2, expectedEn: "2 days", expectedRu: "2 дня" },
  { count: 3, expectedEn: "3 days", expectedRu: "3 дня" },
  { count: 4, expectedEn: "4 days", expectedRu: "4 дня" },
  { count: 5, expectedEn: "5 days", expectedRu: "5 дней" }
])("Dictionary.plural", ({ count, expectedEn, expectedRu }) => {
  expect(`${count} ${dictionary.plural(count).day}`).toBe(expectedEn);
  configure({ localeName: "ru-RU" });
  expect(`${count} ${dictionary.plural(count).day}`).toBe(expectedRu);
});

test.each(["string", "String"])("Dictionary.with: FieldIsTooShort", field => {
  const sub = dictionary.with("field", field).with("min", 10);

  const expectedEn = "String must have at least 10 characters";

  const expectedRu = "Строка должна содержать не менее 10 символов";

  expect(sub.FieldIsTooShort).toBe(expectedEn);
  configure({ localeName: "ru-RU" });
  expect(sub.FieldIsTooShort).toBe(expectedRu);
});

test.each([
  { field: "confirm", field2: "password" },
  { field: "Confirm", field2: "Password" }
])("Dictionary.with: MustBeSameAs", ({ field, field2 }) => {
  const sub = dictionary.with("field", field).with("field2", field2);

  const expectedEn = "Must be same as password";

  const expectedRu = "Подтверждение пароля должно совпадать с паролем";

  expect(sub.MustBeSameAs).toBe(expectedEn);
  configure({ localeName: "ru-RU" });
  expect(sub.MustBeSameAs).toBe(expectedRu);
});

test.each(["string", "String"])("Dictionary.with: MustBeValidField", field => {
  const sub = dictionary.with("field", field);

  const expectedEn = "Must be valid string";

  const expectedRu = "Введите корректную строку";

  expect(sub.MustBeValidField).toBe(expectedEn);
  configure({ localeName: "ru-RU" });
  expect(sub.MustBeValidField).toBe(expectedRu);
});

test.each([
  { config: {}, expected: "en-US" },
  { config: { localeName: typedef<LocaleName>("ru-RU") }, expected: "ru-RU" }
])("configure, getConfiguration", ({ config, expected }) => {
  configure(config);
  expect(getConfiguration().localeName).toBe(expected);
});

test.each([
  { count: 0, expected: 2 },
  { count: 1, expected: 1 },
  { count: 2, expected: 2 },
  { count: 3, expected: 2 }
])("pluralReduce", ({ count, expected }) => {
  expect(pluralReduce(count)).toBe(expected);
});

test.each([
  { count: 0, expected: 5 },
  { count: 1, expected: 1 },
  { count: 2, expected: 2 },
  { count: 3, expected: 2 },
  { count: 4, expected: 2 },
  { count: 5, expected: 5 },
  { count: 10, expected: 5 },
  { count: 20, expected: 5 },
  { count: 21, expected: 1 },
  { count: 22, expected: 2 },
  { count: 23, expected: 2 },
  { count: 24, expected: 2 },
  { count: 25, expected: 5 }
])("pluralReduce.ru", ({ count, expected }) => {
  expect(pluralReduce.ru(count)).toBe(expected);
});
