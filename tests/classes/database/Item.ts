import * as classes from "@/classes";

test.each<classes.database.Item.ExistingItemDoc>([
  { _id: "test-id", _rev: "test-rev" },
  {
    _deleted: true,
    _id: "test-id",
    _rev: "test-rev",
    softDeleted: true
  }
])("item", doc => {
  const item = new classes.database.Item(doc);

  expect(item.doc()).toStrictEqual(doc);
});
