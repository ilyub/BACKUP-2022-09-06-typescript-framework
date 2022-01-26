import type { StoredAttachedDocuments } from "@skylib/facades/dist/database";
import { isStoredAttachedDocuments } from "@skylib/facades/dist/database";
import * as is from "@skylib/functions/dist/guards";
import * as o from "@skylib/functions/dist/object";
import type { numberU } from "@skylib/functions/dist/types/core";

export interface ItemDoc extends PutItemDoc {
  readonly _id: string;
  readonly _rev: string;
}

export type ItemDocs = readonly ItemDoc[];

export type Items = readonly Items[];

export interface PutItemDoc {
  readonly _deleted?: true;
  readonly _id?: string;
  readonly _rev?: string;
  readonly attachedDocs?: StoredAttachedDocuments;
  readonly lastAttachedDoc?: number;
}

export const isItemDoc: is.Guard<ItemDoc> = is.factory(
  is.object.of,
  {
    _id: is.string,
    _rev: is.string
  },
  {
    _deleted: is.true,
    attachedDocs: isStoredAttachedDocuments,
    lastAttachedDoc: is.number
  }
);

export const isItemDocs = is.factory(is.array.of, isItemDoc);

export class Item {
  public readonly _deleted: boolean;

  public readonly _id: string;

  public readonly _rev: string;

  /**
   * Creates class instance.
   *
   * @param source - Source.
   */
  public constructor(source: ItemDoc) {
    this._deleted = source._deleted ?? false;
    this._id = source._id;
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
