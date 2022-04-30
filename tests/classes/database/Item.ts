/* eslint-disable @skylib/consistent-filename -- Ok */

import { classes } from "@";
import { uniqueId } from "@skylib/facades";

test.each<classes.database.Item.ExistingItemDoc>([
  { _id: uniqueId(), _rev: uniqueId() },
  {
    _deleted: true,
    _id: uniqueId(),
    _rev: uniqueId(),
    softDeleted: true
  }
])("item", doc => {
  const item = new classes.database.Item(doc);

  expect(item.doc()).toStrictEqual(doc);
  expect(item._id).toStrictEqual(doc._id);
  expect(item._rev).toStrictEqual(doc._rev);
});
