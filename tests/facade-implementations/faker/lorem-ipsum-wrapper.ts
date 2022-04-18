import type { faker } from "@skylib/facades";
import { implementations } from "@";

const loremIpsumWrapper = implementations.faker.loremIpsumWrapper;

interface DateTestData {
  readonly from: string | readonly [number, faker.Unit];
  readonly to: string | readonly [number, faker.Unit];
  readonly unit: faker.Unit;
}

test("boolean", () => {
  expect(loremIpsumWrapper.boolean()).toBeOneOf([true, false]);
});

test("configure, getConfiguration", () => {
  expect(loremIpsumWrapper.getConfiguration().minSentences).toBe(3);
  loremIpsumWrapper.configure({ minSentences: 2 });
  expect(loremIpsumWrapper.getConfiguration().minSentences).toBe(2);
});

test.each<DateTestData>([
  {
    from: [0, "days"],
    to: [100, "days"],
    unit: "day"
  },
  {
    from: [0, "days"],
    to: [100, "days"],
    unit: "days"
  },
  {
    from: [0, "days"],
    to: [100, "days"],
    unit: "hour"
  },
  {
    from: "2000-01-01",
    to: "2001-01-01",
    unit: "hours"
  },
  {
    from: "2000-01-01",
    to: "2001-01-01",
    unit: "minute"
  },
  {
    from: "2000-01-01",
    to: "2001-01-01",
    unit: "minutes"
  }
])("date", ({ from, to, unit }) => {
  const expected = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/u;

  expect(loremIpsumWrapper.date(from, to)).toMatch(expected);
  expect(loremIpsumWrapper.date(from, to, 1, unit)).toMatch(expected);
});

test("number", () => {
  expect(loremIpsumWrapper.number(0, 1000)).toBeWithin(0, 1000);
});

test("paragraph", () => {
  expect(loremIpsumWrapper.paragraph()).toEndWith(".");
  expect(loremIpsumWrapper.paragraph(2, 3, 2, 3)).toEndWith(".");
});

test("phrase", () => {
  expect(loremIpsumWrapper.phrase()).not.toEndWith(".");
  expect(loremIpsumWrapper.phrase(2, 3)).not.toEndWith(".");
});

test("sentence", () => {
  expect(loremIpsumWrapper.sentence()).toEndWith(".");
  expect(loremIpsumWrapper.sentence(2, 3)).toEndWith(".");
});

test("word", () => {
  expect(loremIpsumWrapper.word()).not.toEndWith(".");
});
