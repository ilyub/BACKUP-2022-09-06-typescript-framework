import * as is from "@skylib/functions/dist/guards";
import * as o from "@skylib/functions/dist/object";
import type { stringU } from "@skylib/functions/dist/types/core";
import type { UndefinedStyle } from "@skylib/functions/dist/types/object";

import type { Item, ItemDoc } from "./Item";
import { isItemDoc } from "./Item";

export interface PutAttachedItemDoc {
  readonly _deleted?: true;
  readonly _id?: number;
  readonly _rev?: number;
  readonly createdAt?: string;
  readonly deletedAt?: string;
  readonly parentDoc: ItemDoc;
  readonly softDeleted?: true;
  readonly updatedAt?: string;
}

export type PutAttachedItemDocs = readonly AttachedItemDoc[];

export interface AttachedItemDoc extends PutAttachedItemDoc {
  readonly _id: number;
  readonly _rev: number;
}

export type AttachedItemDocs = readonly AttachedItemDoc[];

export type AttachedItems = readonly AttachedItems[];

export const isPutAttachedItemDoc = is.object.factory<PutAttachedItemDoc>(
  { parentDoc: isItemDoc },
  {
    _deleted: is.true,
    _id: is.number,
    _rev: is.number,
    createdAt: is.string,
    deletedAt: is.string,
    softDeleted: is.true,
    updatedAt: is.string
  }
);

export const isPutAttachedItemDocs = is.factory(
  is.array.of,
  isPutAttachedItemDoc
);

export const isAttachedItemDoc = is.object.factory<AttachedItemDoc>(
  {
    _id: is.number,
    _rev: is.number,
    parentDoc: isItemDoc
  },
  {
    _deleted: is.true,
    createdAt: is.string,
    deletedAt: is.string,
    softDeleted: is.true,
    updatedAt: is.string
  }
);

export const isAttachedItemDocs = is.factory(is.array.of, isAttachedItemDoc);

export class AttachedItem<T extends Item = Item> {
  public readonly _deleted: boolean;

  public readonly _id: number;

  public readonly _rev: number;

  public readonly createdAt: stringU;

  public readonly deletedAt: stringU;

  public readonly softDeleted: boolean;

  public readonly updatedAt: stringU;

  /**
   * Parent ID + attached item ID.
   */
  public get id(): string {
    return `${this._parentDoc._id}:${this._id}`;
  }

  /**
   * Returns parent item.
   */
  public get parent(): T {
    this._parent = this._parent ?? this.getParent();

    return this._parent;
  }

  /**
   * Creates class instance.
   *
   * @param source - Source.
   */
  public constructor(source: AttachedItemDoc) {
    this._deleted = source._deleted ?? false;
    this._id = source._id;
    this._rev = source._rev;
    this.createdAt = source.createdAt;
    this.deletedAt = source.deletedAt;
    this._parentDoc = source.parentDoc;
    this.softDeleted = source.softDeleted ?? false;
    this.updatedAt = source.updatedAt;
  }

  /**
   * Returns database document.
   *
   * @returns Database document.
   */
  public doc(): AttachedItemDoc {
    return o.removeUndefinedKeys<UndefinedStyle<AttachedItemDoc>>({
      _deleted: this._deleted ? true : undefined,
      _id: this._id,
      _rev: this._rev,
      createdAt: this.createdAt,
      deletedAt: this.deletedAt,
      parentDoc: this._parentDoc,
      softDeleted: this.softDeleted ? true : undefined,
      updatedAt: this.updatedAt
    });
  }

  /*
  |*******************************************************************************
  |* Protected
  |*******************************************************************************
  |*/

  protected _parent: T | undefined = undefined;

  protected _parentDoc: ItemDoc;

  /**
   * Initializes parent.
   */
  protected getParent(): T {
    throw new Error("Not implemented");
  }
}
