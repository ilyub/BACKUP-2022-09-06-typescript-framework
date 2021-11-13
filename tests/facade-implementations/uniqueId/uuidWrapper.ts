import { uniqueId } from "@skylib/facades/dist/uniqueId";

it("uniqueId", () => {
  const id1 = uniqueId();

  const id2 = uniqueId();

  expect(typeof id1).toStrictEqual("string");
  expect(typeof id2).toStrictEqual("string");
  expect(id1).not.toStrictEqual(id2);
});
