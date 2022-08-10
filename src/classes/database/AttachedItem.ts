import type { stringU, types } from "@skylib/functions";
import type { Item } from "./Item";
import type { database } from "@skylib/facades";
import { o } from "@skylib/functions";

export abstract class AttachedItem<T extends Item = Item> {
  public readonly _deleted: boolean;

  public readonly _id: number;

  public readonly _rev: number;

  public readonly createdAt: stringU;

  public readonly deletedAt: stringU;

  public readonly softDeleted: boolean;

  public readonly updatedAt: stringU;

  /**
   * Unique combined ID.
   *
   * @returns Combined ID.
   */
  public get id(): string {
    return `${this._parentDoc._id}:${this._id}`;
  }

  /**
   * Parent item.
   *
   * @returns Parent.
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
    return o.removeUndefinedKeys<Source>({
      _deleted: this._deleted ? true : undefined,
      _id: this._id,
      _rev: this._rev,
      createdAt: this.createdAt,
      deletedAt: this.deletedAt,
      parentDoc: this._parentDoc,
      softDeleted: this.softDeleted ? true : undefined,
      updatedAt: this.updatedAt
    });

    type Source =
      types.object.style.Undefined<AttachedItem.ExistingAttachedItemDoc>;
  }

  // eslint-disable-next-line @skylib/typescript/prefer-readonly-property -- Ok
  protected _parent: T | undefined;

  protected readonly _parentDoc: database.BaseExistingDocument;

  /**
   * Initializes parent.
   */
  protected abstract getParent(): T;
}

export namespace AttachedItem {
  /**
   * @deprecated
   */
  export interface AttachedItemProps extends Content {}

  export type AttachedItems = readonly AttachedItems[];

  export interface BulkAttachedItemDoc
    extends database.BaseBulkAttachedDocument,
      Content {}

  export type BulkAttachedItemDocs = readonly BulkAttachedItemDoc[];

  export interface Content {
    readonly createdAt?: string;
    readonly deletedAt?: string;
    // eslint-disable-next-line @skylib/typescript/no-true-type -- Ok
    readonly softDeleted?: true;
    readonly updatedAt?: string;
  }

  export interface ExistingAttachedItemDoc
    extends database.BaseExistingAttachedDocument,
      Content {}

  export type ExistingAttachedItemDocs = readonly ExistingAttachedItemDoc[];

  /**
   * @deprecated
   */
  export interface OwnProps extends Content {}

  export interface PutAttachedItemDoc
    extends database.BasePutAttachedDocument,
      Content {}

  export type PutAttachedItemDocs = readonly PutAttachedItemDoc[];
}
