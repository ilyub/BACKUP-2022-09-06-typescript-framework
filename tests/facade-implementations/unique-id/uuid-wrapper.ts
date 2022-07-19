import { implementations } from "@";

const { uuidWrapper } = implementations.uniqueId;

test("uniqueId", () => {
  expect(uuidWrapper()).not.toBe(uuidWrapper());
});
