import { implementations } from "@";

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
});

test("Dictionary.context", () => {
  configure({ localeName: "ru-RU" });
  expect(dictionary.day).toBe("день");
  expect(dictionary.context("InXDays").day).toBe("дня");
  expect(dictionary.context("InXDays").day).toBe("дня");
  expect(dictionary.context("InXDays").context("InXDays").day).toBe("дня");
  expect(dictionary.context("InXDays").context("InXDays").day).toBe("дня");
});

test("Dictionary.get", () => {
  expect(dictionary.get("MustBeValidString")).toBe("Must be valid String");
  expect(dictionary.get("mustBeValidString")).toBe("must be valid String");
  expect(dictionary.get("MUSTBEVALIDSTRING")).toBe("MUST BE VALID STRING");
  expect(dictionary.get("mustbevalidstring")).toBe("must be valid string");
  configure({ localeName: "ru-RU" });
  expect(dictionary.get("MustBeValidString")).toBe("Введите корректную Строку");
  expect(dictionary.get("mustBeValidString")).toBe("введите корректную Строку");
  expect(dictionary.get("MUSTBEVALIDSTRING")).toBe("ВВЕДИТЕ КОРРЕКТНУЮ СТРОКУ");
  expect(dictionary.get("mustbevalidstring")).toBe("введите корректную строку");
});

test("Dictionary.getIfExists", () => {
  expect(dictionary.getIfExists("Day")).toBe("Day");
  configure({ localeName: "ru-RU" });
  expect(dictionary.getIfExists("Day")).toBe("День");
  expect(dictionary.getIfExists("Unknown")).toBe("Unknown");
});

test("Dictionary.has", () => {
  expect(dictionary.has("MustBeValidString")).toBeTrue();
  expect(dictionary.has("mustBeValidString")).toBeTrue();
  expect(dictionary.has("MUSTBEVALIDSTRING")).toBeTrue();
  expect(dictionary.has("mustbevalidstring")).toBeTrue();
  configure({ localeName: "ru-RU" });
  expect(dictionary.has("MustBeValidString")).toBeTrue();
  expect(dictionary.has("mustBeValidString")).toBeTrue();
  expect(dictionary.has("MUSTBEVALIDSTRING")).toBeTrue();
  expect(dictionary.has("mustbevalidstring")).toBeTrue();
  expect(dictionary.has("unknown")).toBeFalse();
});

test.each([
  {
    count: 1,
    en: "1 day",
    ru: "1 день"
  },
  {
    count: 2,
    en: "2 days",
    ru: "2 дня"
  },
  {
    count: 3,
    en: "3 days",
    ru: "3 дня"
  },
  {
    count: 4,
    en: "4 days",
    ru: "4 дня"
  },
  {
    count: 5,
    en: "5 days",
    ru: "5 дней"
  }
])("Dictionary.plural", ({ count, en, ru }) => {
  expect(`${count} ${dictionary.plural(count).day}`).toStrictEqual(en);
  configure({ localeName: "ru-RU" });
  expect(`${count} ${dictionary.plural(count).day}`).toStrictEqual(ru);
});

test.each(["string", "String"])("Dictionary.with: FieldIsTooShort", field => {
  const en = "String must have at least 10 characters";

  const ru = "Строка должна содержать не менее 10 символов";

  const sub = dictionary.with("field", field).with("min", 10);

  expect(sub.FieldIsTooShort).toStrictEqual(en);
  configure({ localeName: "ru-RU" });
  expect(sub.FieldIsTooShort).toStrictEqual(ru);
});

test.each([
  { field: "confirm", field2: "password" },
  { field: "Confirm", field2: "Password" }
])("Dictionary.with: MustBeSameAs", ({ field, field2 }) => {
  const en = "Must be same as password";

  const ru = "Подтверждение пароля должно совпадать с паролем";

  const sub = dictionary.with("field", field).with("field2", field2);

  expect(sub.MustBeSameAs).toStrictEqual(en);
  configure({ localeName: "ru-RU" });
  expect(sub.MustBeSameAs).toStrictEqual(ru);
});

test.each(["string", "String"])("Dictionary.with: MustBeValidField", field => {
  const en = "Must be valid string";

  const ru = "Введите корректную строку";

  const sub = dictionary.with("field", field);

  expect(sub.MustBeValidField).toStrictEqual(en);
  configure({ localeName: "ru-RU" });
  expect(sub.MustBeValidField).toStrictEqual(ru);
});

test("configure, getConfiguration", () => {
  expect(getConfiguration().localeName).toBe("en-US");
  configure({ localeName: "ru-RU" });
  expect(getConfiguration().localeName).toBe("ru-RU");
});

test("pluralReduce", () => {
  expect(pluralReduce(0)).toBe(2);
  expect(pluralReduce(1)).toBe(1);
  expect(pluralReduce(2)).toBe(2);
  expect(pluralReduce(3)).toBe(2);
});

test("pluralReduce.ru", () => {
  expect(pluralReduce.ru(0)).toBe(5);
  expect(pluralReduce.ru(1)).toBe(1);
  expect(pluralReduce.ru(2)).toBe(2);
  expect(pluralReduce.ru(3)).toBe(2);
  expect(pluralReduce.ru(4)).toBe(2);
  expect(pluralReduce.ru(5)).toBe(5);
  expect(pluralReduce.ru(10)).toBe(5);
  expect(pluralReduce.ru(20)).toBe(5);
  expect(pluralReduce.ru(21)).toBe(1);
  expect(pluralReduce.ru(22)).toBe(2);
  expect(pluralReduce.ru(23)).toBe(2);
  expect(pluralReduce.ru(24)).toBe(2);
  expect(pluralReduce.ru(25)).toBe(5);
});
