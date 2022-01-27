import type { ItemDoc } from "@/classes/database/Item";
import { Item } from "@/classes/database/Item";

it.each<ItemDoc>([
  {
    _id: "test-id",
    _rev: "test-rev"
  },
  {
    _deleted: true,
    _id: "test-id",
    _rev: "test-rev",
    softDeleted: true
  }
])("Item", doc => {
  const item = new Item(doc);

  expect(item.doc()).toStrictEqual(doc);
});
