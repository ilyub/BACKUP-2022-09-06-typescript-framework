/* eslint-disable @skylib/consistent-filename -- Ok */

import { classes } from "@";
import { uniqueId } from "@skylib/facades";

test.each<classes.database.AttachedItem.ExistingAttachedItemDoc>([
  {
    _id: 0,
    _rev: 1,
    parentDoc: { _id: uniqueId(), _rev: uniqueId() }
  },
  {
    _deleted: true,
    _id: 0,
    _rev: 1,
    parentDoc: { _id: uniqueId(), _rev: uniqueId() },
    softDeleted: true
  }
])("attachedItem", doc => {
  class AttachedItem extends classes.database.AttachedItem {
    protected getParent(): classes.database.Item {
      return new classes.database.Item(this._parentDoc);
    }
  }

  const item = new AttachedItem(doc);

  expect(item.doc()).toStrictEqual(doc);
  expect(item._id).toStrictEqual(doc._id);
  expect(item._rev).toStrictEqual(doc._rev);
  // eslint-disable-next-line no-restricted-syntax -- Wait for @skylib/config update
  expect(item.id).toBe(`${doc.parentDoc._id}:${doc._id}`);
  expect(item.parent.doc()).toStrictEqual(doc.parentDoc);
  expect(item.parent.doc()).toStrictEqual(doc.parentDoc);
});
