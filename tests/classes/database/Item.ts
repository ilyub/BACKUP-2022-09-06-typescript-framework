import type { ItemDoc } from "@/classes/database/Item";
import { Item } from "@/classes/database/Item";

it.each<ItemDoc>([
  {},
  {
    _deleted: true,
    _id: "test-id"
  }
])("Item", doc => {
  const item = new Item(doc);

  expect(item.doc()).toStrictEqual({ _id: item._id, ...doc });
});
