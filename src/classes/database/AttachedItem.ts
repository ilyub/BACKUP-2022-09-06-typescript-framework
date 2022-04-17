import type { database } from "@skylib/facades";
import { o } from "@skylib/functions";
import type { stringU, UndefinedStyle } from "@skylib/functions";
import type { Item } from "./Item";

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
  public constructor(source: AttachedItem.ExistingAttachedItemDoc) {
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
  public doc(): AttachedItem.ExistingAttachedItemDoc {
    return o.removeUndefinedKeys<
      UndefinedStyle<AttachedItem.ExistingAttachedItemDoc>
    >({
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

  // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
  protected _parent: T | undefined = undefined;

  protected readonly _parentDoc: database.BaseExistingDocument;

  /**
   * Initializes parent.
   */
  protected getParent(): T {
    throw new Error("Not implemented");
  }
}

export namespace AttachedItem {
  export type AttachedItems = readonly AttachedItems[];

  export interface BaseAttachedItemDoc {
    readonly createdAt?: string;
    readonly deletedAt?: string;
    readonly softDeleted?: true;
    readonly updatedAt?: string;
  }

  export interface BulkAttachedItemDoc
    extends database.BaseBulkAttachedDocument,
      BaseAttachedItemDoc {}

  export type BulkAttachedItemDocs = readonly BulkAttachedItemDoc[];

  export interface ExistingAttachedItemDoc
    extends database.BaseExistingAttachedDocument,
      BaseAttachedItemDoc {}

  export type ExistingAttachedItemDocs = readonly ExistingAttachedItemDoc[];

  export interface PutAttachedItemDoc
    extends database.BasePutAttachedDocument,
      BaseAttachedItemDoc {}

  export type PutAttachedItemDocs = readonly PutAttachedItemDoc[];
}
