import type {
  BaseBulkAttachedDocument,
  BaseExistingAttachedDocument,
  BaseExistingDocument,
  BasePutAttachedDocument
} from "@skylib/facades/dist/database";
import * as o from "@skylib/functions/dist/object";
import type { stringU } from "@skylib/functions/dist/types/core";
import type { UndefinedStyle } from "@skylib/functions/dist/types/object";
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
  public constructor(source: ExistingAttachedItemDoc) {
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
  public doc(): ExistingAttachedItemDoc {
    return o.removeUndefinedKeys<UndefinedStyle<ExistingAttachedItemDoc>>({
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

  protected readonly _parentDoc: BaseExistingDocument;

  /**
   * Initializes parent.
   */
  protected getParent(): T {
    throw new Error("Not implemented");
  }
}

export type AttachedItems = readonly AttachedItems[];

export interface BaseAttachedItemDoc {
  readonly createdAt?: string;
  readonly deletedAt?: string;
  readonly softDeleted?: true;
  readonly updatedAt?: string;
}

export interface BulkAttachedItemDoc
  extends BaseBulkAttachedDocument,
    BaseAttachedItemDoc {}

export type BulkAttachedItemDocs = readonly BulkAttachedItemDoc[];

export interface ExistingAttachedItemDoc
  extends BaseExistingAttachedDocument,
    BaseAttachedItemDoc {}

export type ExistingAttachedItemDocs = readonly ExistingAttachedItemDoc[];

export interface PutAttachedItemDoc
  extends BasePutAttachedDocument,
    BaseAttachedItemDoc {}

export type PutAttachedItemDocs = readonly PutAttachedItemDoc[];
