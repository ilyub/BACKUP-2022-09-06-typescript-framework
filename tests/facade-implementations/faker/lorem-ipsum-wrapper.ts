import { implementations } from "@";
import { fn, typedef } from "@skylib/functions";
import type { faker } from "@skylib/facades";

const loremIpsum = implementations.faker.loremIpsumWrapper;

test("boolean", () => {
  expect(loremIpsum.boolean()).toBeOneOf([true, false]);
  expect(loremIpsum.boolean(1, 0)).toBeTrue();
  expect(loremIpsum.boolean(0, 1)).toBeFalse();
});

test("configure, getConfiguration", () => {
  expect(loremIpsum.getConfiguration().minSentences).toBe(3);
  loremIpsum.configure({ minSentences: 2 });
  expect(loremIpsum.getConfiguration().minSentences).toBe(2);
});

test.each(
  fn.run(() => {
    return typedef<Cases>([
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
    ]);

    interface Case {
      readonly from: faker.TimeInterval | string;
      readonly to: faker.TimeInterval | string;
      readonly unit: faker.TimeUnit;
    }

    type Cases = readonly Case[];
  })
)("date", ({ from, to, unit }) => {
  const expected = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/u;

  expect(loremIpsum.date(from, to)).toMatch(expected);
  expect(loremIpsum.date(from, to, 1, unit)).toMatch(expected);
});

test("number", () => {
  expect(loremIpsum.number(0, 1000)).toBeWithin(0, 1000);
  expect(loremIpsum.number(0, 1000, 10) % 10).toBe(0);
});

test("oneOf", () => {
  const arr = [true, 1, "abc"];

  expect(loremIpsum.oneOf(arr)).toBeOneOf(arr);
});

test("paragraph", () => {
  expect(loremIpsum.paragraph()).toEndWith(".");
  expect(loremIpsum.paragraph(2, 2, 3, 3).split(".")).toHaveLength(3);
  expect(loremIpsum.paragraph(2, 2, 3, 3).split(" ")).toHaveLength(6);
  expect(loremIpsum.paragraph(3, 3, 4, 4).split(".")).toHaveLength(4);
  expect(loremIpsum.paragraph(3, 3, 4, 4).split(" ")).toHaveLength(12);
});

test("phrase", () => {
  expect(loremIpsum.phrase()).not.toEndWith(".");
  expect(loremIpsum.phrase(2, 2).split(".")).toHaveLength(1);
  expect(loremIpsum.phrase(2, 2).split(" ")).toHaveLength(2);
  expect(loremIpsum.phrase(3, 3).split(".")).toHaveLength(1);
  expect(loremIpsum.phrase(3, 3).split(" ")).toHaveLength(3);
});

test("sentence", () => {
  expect(loremIpsum.sentence()).toEndWith(".");
  expect(loremIpsum.sentence(2, 2).split(".")).toHaveLength(2);
  expect(loremIpsum.sentence(2, 2).split(" ")).toHaveLength(2);
  expect(loremIpsum.sentence(3, 3).split(".")).toHaveLength(2);
  expect(loremIpsum.sentence(3, 3).split(" ")).toHaveLength(3);
});

test("word", () => {
  expect(loremIpsum.word()).not.toEndWith(".");
  expect(loremIpsum.word().split(".")).toHaveLength(1);
  expect(loremIpsum.word().split(" ")).toHaveLength(1);
});
