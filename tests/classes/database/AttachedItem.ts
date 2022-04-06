import type { ExistingAttachedItemDoc } from "@/classes/database/AttachedItem";
import { AttachedItem } from "@/classes/database/AttachedItem";
import { Item } from "@/classes/database/Item";

test.each<ExistingAttachedItemDoc>([
  {
    _id: 0,
    _rev: 1,
    parentDoc: { _id: "test-id", _rev: "test-rev" }
  },
  {
    _deleted: true,
    _id: 0,
    _rev: 1,
    parentDoc: { _id: "test-id", _rev: "test-rev" },
    softDeleted: true
  }
])("attachedItem", doc => {
  {
    const item = new AttachedItem(doc);

    expect(item.doc()).toStrictEqual(doc);
    expect(() => item.parent).toThrow(new Error("Not implemented"));
  }

  {
    class TestAttachedItem extends AttachedItem {
      protected override getParent(): Item {
        return new Item(this._parentDoc);
      }
    }

    const item = new TestAttachedItem(doc);

    expect(item.id).toBe("test-id:0");
    expect(item.parent.doc()).toStrictEqual(doc.parentDoc);
    expect(item.parent.doc()).toStrictEqual(doc.parentDoc);
  }
});
