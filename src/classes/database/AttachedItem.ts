import * as is from "@skylib/functions/dist/guards";
import * as o from "@skylib/functions/dist/object";
import type { numberU } from "@skylib/functions/dist/types/core";

import type { Item, ItemDoc } from "./Item";
import { isItemDoc } from "./Item";

export interface AttachedItemDoc {
  readonly _deleted?: true;
  readonly _id?: number;
  readonly _rev?: number;
  readonly parentDoc: ItemDoc;
}

export type AttachedItemDocs = readonly AttachedItemDoc[];

export type AttachedItems = readonly AttachedItems[];

export const isAttachedItemDoc: is.Guard<AttachedItemDoc> = is.factory(
  is.object.of,
  {
    parentDoc: isItemDoc
  },
  {
    _deleted: is.true,
    _id: is.number,
    _rev: is.number
  }
);

export const isAttachedItemDocs = is.factory(is.array.of, isAttachedItemDoc);

export class AttachedItem<T extends Item = Item> {
  public readonly _deleted: boolean;

  public readonly _id: numberU;

  public readonly _rev: numberU;

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
    this._parentDoc = source.parentDoc;
  }

  /**
   * Returns database document.
   *
   * @returns Database document.
   */
  public doc(): AttachedItemDoc {
    return o.removeUndefinedKeys<AttachedItemDoc>({
      _deleted: this._deleted ? true : undefined,
      _id: this._id,
      _rev: this._rev,
      parentDoc: this._parentDoc
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

export const isAttachedItem = is.factory(is.instance, AttachedItem);

export const isAttachedItems = is.factory(is.array.of, isAttachedItem);
