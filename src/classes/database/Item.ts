import type {
  BaseExistingDocument,
  BasePutDocument,
  BaseStoredAttachedDocuments
} from "@skylib/facades/dist/database";
import * as o from "@skylib/functions/dist/object";
import type { numbers, stringU } from "@skylib/functions/dist/types/core";
import type { UndefinedStyle } from "@skylib/functions/dist/types/object";

export class Item {
  public readonly _deleted: boolean;

  public readonly _id: string;

  public readonly _rev: string;

  public readonly createdAt: stringU;

  public readonly deletedAt: stringU;

  public readonly softDeleted: boolean;

  public readonly updatedAt: stringU;

  /**
   * Creates class instance.
   *
   * @param source - Source.
   */
  public constructor(source: ExistingItemDoc) {
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
  public doc(): ExistingItemDoc {
    return o.removeUndefinedKeys<UndefinedStyle<ExistingItemDoc>>({
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

  protected readonly attachedDocs: BaseStoredAttachedDocuments | undefined;

  protected readonly lastAttachedDocs: numbers | undefined;
}

export interface BaseItemDoc {
  readonly createdAt?: string;
  readonly deletedAt?: string;
  readonly softDeleted?: true;
  readonly updatedAt?: string;
}

export interface ExistingItemDoc extends BaseExistingDocument, BaseItemDoc {}

export type ExistingItemDocs = readonly ExistingItemDoc[];

export type Items = readonly Items[];

export interface PutItemDoc extends BasePutDocument, BaseItemDoc {}

export type PutItemDocs = readonly PutItemDoc[];
