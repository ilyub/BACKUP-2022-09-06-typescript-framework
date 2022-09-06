import type { numbers, stringU, types } from "@skylib/functions";
import type { database } from "@skylib/facades";
import { o } from "@skylib/functions";

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
  public constructor(source: Item.ExistingItemDoc) {
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
  public doc(): Item.ExistingItemDoc {
    return o.removeUndefinedKeys<Source>({
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

    type Source = types.object.style.Undefined<Item.ExistingItemDoc>;
  }

  protected readonly attachedDocs:
    | database.BaseStoredAttachedDocuments
    | undefined;

  protected readonly lastAttachedDocs: numbers | undefined;
}

export namespace Item {
  export interface Content {
    readonly createdAt?: string;
    readonly deletedAt?: string;
    // eslint-disable-next-line @skylib/typescript/no-boolean-literal-type -- Ok
    readonly softDeleted?: true;
    readonly updatedAt?: string;
  }

  export interface ExistingItemDoc
    extends database.BaseExistingDocument,
      Content {}

  export type ExistingItemDocs = readonly ExistingItemDoc[];

  /**
   * @deprecated
   */
  export interface ItemProps extends Content {}

  export type Items = readonly Items[];

  /**
   * @deprecated
   */
  export interface OwnProps extends Content {}

  export interface PutItemDoc extends database.BasePutDocument, Content {}

  export type PutItemDocs = readonly PutItemDoc[];
}
