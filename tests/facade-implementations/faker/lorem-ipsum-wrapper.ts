import { loremIpsumWrapper } from "@/facade-implementations/faker/lorem-ipsum-wrapper";

test("configure, getConfiguration", () => {
  expect(loremIpsumWrapper.getConfiguration().minSentences).toBe(3);
  loremIpsumWrapper.configure({ minSentences: 2 });
  expect(loremIpsumWrapper.getConfiguration().minSentences).toBe(2);
});

test("loremIpsumWrapper.paragraph", () => {
  expect(loremIpsumWrapper.paragraph()).toEndWith(".");
  expect(loremIpsumWrapper.paragraph(2, 3, 2, 3)).toEndWith(".");
});

test("loremIpsumWrapper.phrase", () => {
  expect(loremIpsumWrapper.phrase()).not.toEndWith(".");
  expect(loremIpsumWrapper.phrase(2, 3)).not.toEndWith(".");
});

test("loremIpsumWrapper.sentence", () => {
  expect(loremIpsumWrapper.sentence()).toEndWith(".");
  expect(loremIpsumWrapper.sentence(2, 3)).toEndWith(".");
});

test("loremIpsumWrapper.word", () => {
  expect(loremIpsumWrapper.word()).not.toEndWith(".");
});
