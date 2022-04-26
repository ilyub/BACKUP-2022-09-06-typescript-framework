import { implementations } from "@";
import { lang } from "@skylib/facades";

test("dictionary.configure, Dictionary.getConfiguration", () => {
  expect(
    implementations.lang.dictionary.Dictionary.getConfiguration().localeName
  ).toBe("en-US");
  implementations.lang.dictionary.Dictionary.configure({ localeName: "ru-RU" });
  expect(
    implementations.lang.dictionary.Dictionary.getConfiguration().localeName
  ).toBe("ru-RU");
});

test("dictionary.context", () => {
  implementations.lang.dictionary.Dictionary.configure({ localeName: "ru-RU" });
  expect(lang.day).toBe("день");
  expect(lang.context("InXDays").day).toBe("дня");
  expect(lang.context("InXDays").day).toBe("дня");
  expect(lang.context("InXDays").context("InXDays").day).toBe("дня");
  expect(lang.context("InXDays").context("InXDays").day).toBe("дня");
});

test("dictionary.create", () => {
  const expected = {
    configurable: true,
    enumerable: true,
    value: 1,
    writable: true
  };

  expect(Object.getOwnPropertyDescriptor(lang, "count")).toStrictEqual(
    expected
  );
});

test("dictionary.get", () => {
  implementations.lang.dictionary.Dictionary.configure({ localeName: "ru-RU" });
  expect(lang.get("Day")).toBe("День");
  expect(lang.get("day")).toBe("день");
  expect(lang.get("DAY")).toBe("ДЕНЬ");
  expect(lang.get("MustBeValidString")).toBe("Введите корректную строку");
  expect(lang.get("mustBeValidString")).toBe("введите корректную строку");
  expect(lang.get("MUSTBEVALIDSTRING")).toBe("ВВЕДИТЕ КОРРЕКТНУЮ СТРОКУ");
  expect(lang.get("mustbevalidstring")).toBe("введите корректную строку");
  expect(() => lang.get("unknown")).toThrow(new Error("Unknown word: unknown"));
});

test("dictionary.has", () => {
  expect(lang.has("Day")).toBeTrue();
  expect(lang.has("day")).toBeTrue();
  expect(lang.has("DAY")).toBeTrue();
  expect(lang.has("MustBeValidString")).toBeTrue();
  expect(lang.has("mustBeValidString")).toBeTrue();
  expect(lang.has("MUSTBEVALIDSTRING")).toBeTrue();
  expect(lang.has("mustbevalidstring")).toBeTrue();
  expect(lang.has("unknown")).toBeFalse();
});

test("dictionary.plural", () => {
  implementations.lang.dictionary.Dictionary.configure({ localeName: "ru-RU" });
  subtest(1, "1 день");
  subtest(2, "2 дня");
  subtest(3, "3 дня");
  subtest(4, "4 дня");
  subtest(5, "5 дней");

  function subtest(count: number, expected: string): void {
    expect(`${count} ${lang.plural(count).day}`).toStrictEqual(expected);
  }
});

test("dictionary.with", () => {
  expect(lang.with("field", "string").MustBeValidField).toBe(
    "Must be valid string"
  );
  implementations.lang.dictionary.Dictionary.configure({ localeName: "ru-RU" });
  expect(lang.with("field", "string").with("min", 10).FieldIsTooShort).toBe(
    "Строка должна содержать не менее 10 символов"
  );
  expect(
    lang.with("field", "Confirm").with("field2", "Password").MustBeSameAs
  ).toBe("Подтверждение пароля должно совпадать с паролем");
  expect(lang.with("field", "string").MustBeValidField).toBe(
    "Введите корректную строку"
  );
});

test("pluralReduce", () => {
  const pluralReduce = implementations.lang.dictionary.pluralReduce;

  expect(pluralReduce(0)).toBe(2);
  expect(pluralReduce(1)).toBe(1);
  expect(pluralReduce(2)).toBe(2);
  expect(pluralReduce(3)).toBe(2);
});

test("pluralReduce.ru", () => {
  const pluralReduce = implementations.lang.dictionary.pluralReduce;

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
