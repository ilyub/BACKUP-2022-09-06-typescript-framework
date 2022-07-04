import { implementations } from "@";

const { uuidWrapper } = implementations.uniqueId;

test("uniqueId", () => {
  const id1 = uuidWrapper();

  const id2 = uuidWrapper();

  expect(typeof id1).toBe("string");
  expect(typeof id2).toBe("string");
  expect(id1).not.toBe(id2);
});
