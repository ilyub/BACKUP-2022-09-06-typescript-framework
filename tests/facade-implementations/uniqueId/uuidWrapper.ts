import { uniqueId } from "@skylib/facades";

test("uniqueId", () => {
  const id1 = uniqueId();

  const id2 = uniqueId();

  expect(typeof id1).toBe("string");
  expect(typeof id2).toBe("string");
  expect(id1).not.toStrictEqual(id2);
});
