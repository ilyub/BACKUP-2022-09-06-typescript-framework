import type { StoredAttachedDocuments } from "@skylib/facades/dist/database";
import { isStoredAttachedDocuments } from "@skylib/facades/dist/database";
import { uniqueId } from "@skylib/facades/dist/uniqueId";
import * as is from "@skylib/functions/dist/guards";
import * as o from "@skylib/functions/dist/object";
import type { numberU, stringU } from "@skylib/functions/dist/types/core";

export interface ItemDoc {
  readonly _deleted?: true;
  readonly _id?: string;
  readonly _rev?: string;
  readonly attachedDocs?: StoredAttachedDocuments;
  readonly lastAttachedDoc?: number;
}

export type ItemDocs = readonly ItemDoc[];

export type Items = readonly Items[];

export const isItemDoc: is.Guard<ItemDoc> = is.factory(
  is.object.of,
  {},
  {
    _deleted: is.true,
    _id: is.string,
    _rev: is.string,
    attachedDocs: isStoredAttachedDocuments,
    lastAttachedDoc: is.number
  }
);

export const isItemDocs = is.factory(is.array.of, isItemDoc);

export class Item {
  public readonly _deleted: boolean;

  public readonly _id: string;

  public readonly _rev: stringU;

  /**
   * Creates class instance.
   *
   * @param source - Source.
   */
  public constructor(source: ItemDoc) {
    this._deleted = source._deleted ?? false;
    this._id = source._id ?? uniqueId();
    this._rev = source._rev;
    this.attachedDocs = source.attachedDocs;
    this.lastAttachedDoc = source.lastAttachedDoc;
  }

  /**
   * Returns database document.
   *
   * @returns Database document.
   */
  public doc(): ItemDoc {
    return o.removeUndefinedKeys<ItemDoc>({
      _deleted: this._deleted ? true : undefined,
      _id: this._id,
      _rev: this._rev,
      attachedDocs: this.attachedDocs,
      lastAttachedDoc: this.lastAttachedDoc
    });
  }

  /*
  |*******************************************************************************
  |* Protected
  |*******************************************************************************
  |*/

  protected readonly attachedDocs: StoredAttachedDocuments | undefined;

  protected readonly lastAttachedDoc: numberU;
}

export const isItem = is.factory(is.instance, Item);

export const isItems = is.factory(is.array.of, isItem);
