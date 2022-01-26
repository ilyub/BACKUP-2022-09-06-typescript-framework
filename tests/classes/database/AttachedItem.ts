import type { AttachedItemDoc } from "@/classes/database/AttachedItem";
import { AttachedItem } from "@/classes/database/AttachedItem";
import { Item } from "@/classes/database/Item";

it.each<AttachedItemDoc>([
  {
    parentDoc: {
      _id: "test-id"
    }
  },
  {
    _deleted: true,
    parentDoc: {
      _id: "test-id"
    }
  }
])("AttachedItem", doc => {
  const item = new AttachedItem(doc);

  expect(item.doc()).toStrictEqual(doc);
});

it("AttachedItem.getParent", () => {
  const item = new AttachedItem({ parentDoc: { _id: "test-id" } });

  expect(() => item.parent).toThrow(new Error("Not implemented"));
});

it("AttachedItem.parent", () => {
  class TestAttachedItem extends AttachedItem {
    protected override getParent(): Item {
      return new Item(this._parentDoc);
    }
  }

  const item = new TestAttachedItem({ parentDoc: { _id: "test-id" } });

  expect(item.parent.doc()).toStrictEqual({ _id: "test-id" });
  expect(item.parent.doc()).toStrictEqual({ _id: "test-id" });
});
