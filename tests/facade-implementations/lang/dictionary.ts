import { lang } from "@skylib/facades/dist/lang";

import { Dictionary } from "@/facade-implementations/lang/dictionary";

it("configure, getConfiguration", () => {
  expect(Dictionary.getConfiguration().localeName).toStrictEqual("en-US");
  Dictionary.configure({ localeName: "ru-RU" });
  expect(Dictionary.getConfiguration().localeName).toStrictEqual("ru-RU");
});

it("context", () => {
  Dictionary.configure({ localeName: "ru-RU" });
  expect(lang.day).toStrictEqual("день");
  expect(lang.context("InXDays").day).toStrictEqual("дня");
  expect(lang.context("InXDays").day).toStrictEqual("дня");
  expect(lang.context("InXDays").context("InXDays").day).toStrictEqual("дня");
  expect(lang.context("InXDays").context("InXDays").day).toStrictEqual("дня");
});

it("create", () => {
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

it("get", () => {
  Dictionary.configure({ localeName: "ru-RU" });
  expect(lang.get("Day")).toStrictEqual("День");
  expect(lang.get("day")).toStrictEqual("день");
  expect(lang.get("DAY")).toStrictEqual("ДЕНЬ");
  expect(lang.get("MustBeValidString")).toStrictEqual(
    "Введите корректную строку"
  );
  expect(lang.get("mustBeValidString")).toStrictEqual(
    "введите корректную строку"
  );
  expect(lang.get("MUSTBEVALIDSTRING")).toStrictEqual(
    "ВВЕДИТЕ КОРРЕКТНУЮ СТРОКУ"
  );
  expect(lang.get("mustbevalidstring")).toStrictEqual(
    "введите корректную строку"
  );
  expect(() => lang.get("unknown")).toThrow(new Error("Unknown word: unknown"));
});

it("has", () => {
  expect(lang.has("Day")).toBeTrue();
  expect(lang.has("day")).toBeTrue();
  expect(lang.has("DAY")).toBeTrue();
  expect(lang.has("MustBeValidString")).toBeTrue();
  expect(lang.has("mustBeValidString")).toBeTrue();
  expect(lang.has("MUSTBEVALIDSTRING")).toBeTrue();
  expect(lang.has("mustbevalidstring")).toBeTrue();
  expect(lang.has("unknown")).toBeFalse();
});

it("plural", () => {
  Dictionary.configure({ localeName: "ru-RU" });
  subtest(1, "1 день");
  subtest(2, "2 дня");
  subtest(3, "3 дня");
  subtest(4, "4 дня");
  subtest(5, "5 дней");

  function subtest(count: number, expected: string): void {
    expect(`${count} ${lang.plural(count).day}`).toStrictEqual(expected);
  }
});

it("with", () => {
  expect(lang.with("field", "string").MustBeValidField).toStrictEqual(
    "Must be valid string"
  );
  Dictionary.configure({ localeName: "ru-RU" });
  expect(
    lang.with("field", "string").with("min", 10).FieldIsTooShort
  ).toStrictEqual("Строка должна содержать не менее 10 символов");
  expect(
    lang.with("field", "Confirm").with("field2", "Password").MustBeSameAs
  ).toStrictEqual("Подтверждение пароля должно совпадать с паролем");
  expect(lang.with("field", "string").MustBeValidField).toStrictEqual(
    "Введите корректную строку"
  );
});
