import type { StoredAttachedDocuments } from "@skylib/facades/dist/database";
import { isStoredAttachedDocuments } from "@skylib/facades/dist/database";
import * as is from "@skylib/functions/dist/guards";
import * as o from "@skylib/functions/dist/object";
import type { numbers, stringU } from "@skylib/functions/dist/types/core";

export interface PutItemDoc {
  readonly _deleted?: true;
  readonly _id?: string;
  readonly _rev?: string;
  readonly attachedDocs?: StoredAttachedDocuments;
  readonly createdAt?: string;
  readonly deletedAt?: string;
  readonly lastAttachedDocs?: numbers;
  readonly softDeleted?: true;
  readonly updatedAt?: string;
}

export type PutItemDocs = readonly ItemDoc[];

export interface ItemDoc extends PutItemDoc {
  readonly _id: string;
  readonly _rev: string;
}

export type ItemDocs = readonly ItemDoc[];

export type Items = readonly Items[];

export const isPutItemDoc: is.Guard<PutItemDoc> = is.factory(
  is.object.of,
  {},
  {
    _deleted: is.true,
    _id: is.string,
    _rev: is.string,
    attachedDocs: isStoredAttachedDocuments,
    createdAt: is.string,
    deletedAt: is.string,
    lastAttachedDocs: is.numbers,
    softDeleted: is.true,
    updatedAt: is.string
  }
);

export const isPutItemDocs = is.factory(is.array.of, isPutItemDoc);

export const isItemDoc: is.Guard<ItemDoc> = is.factory(
  is.object.of,
  {
    _id: is.string,
    _rev: is.string
  },
  {
    _deleted: is.true,
    attachedDocs: isStoredAttachedDocuments,
    createdAt: is.string,
    deletedAt: is.string,
    lastAttachedDocs: is.numbers,
    softDeleted: is.true,
    updatedAt: is.string
  }
);

export const isItemDocs = is.factory(is.array.of, isItemDoc);

export class Item {
  public readonly _deleted: boolean;

  public readonly _id: string;

  public readonly _rev: string;

  public readonly attachedDocs: StoredAttachedDocuments | undefined;

  public readonly createdAt: stringU;

  public readonly deletedAt: stringU;

  public readonly lastAttachedDocs: numbers | undefined;

  public readonly softDeleted: boolean;

  public readonly updatedAt: stringU;

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
    this.createdAt = source.createdAt;
    this.deletedAt = source.deletedAt;
    this.lastAttachedDocs = source.lastAttachedDocs;
    this.softDeleted = source.softDeleted ?? false;
    this.updatedAt = source.updatedAt;
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
      createdAt: this.createdAt,
      deletedAt: this.deletedAt,
      lastAttachedDocs: this.lastAttachedDocs,
      softDeleted: this.softDeleted ? true : undefined,
      updatedAt: this.updatedAt
    });
  }
}
