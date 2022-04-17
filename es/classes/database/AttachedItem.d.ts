import type { database } from "@skylib/facades";
import type { stringU } from "@skylib/functions";
import type { Item } from "./Item";
export declare class AttachedItem<T extends Item = Item> {
    readonly _deleted: boolean;
    readonly _id: number;
    readonly _rev: number;
    readonly createdAt: stringU;
    readonly deletedAt: stringU;
    readonly softDeleted: boolean;
    readonly updatedAt: stringU;
    /**
     * Parent ID + attached item ID.
     */
    get id(): string;
    /**
     * Returns parent item.
     */
    get parent(): T;
    /**
     * Creates class instance.
     *
     * @param source - Source.
     */
    constructor(source: AttachedItem.ExistingAttachedItemDoc);
    /**
     * Returns database document.
     *
     * @returns Database document.
     */
    doc(): AttachedItem.ExistingAttachedItemDoc;
    protected _parent: T | undefined;
    protected readonly _parentDoc: database.BaseExistingDocument;
    /**
     * Initializes parent.
     */
    protected getParent(): T;
}
export declare namespace AttachedItem {
    type AttachedItems = readonly AttachedItems[];
    interface BaseAttachedItemDoc {
        readonly createdAt?: string;
        readonly deletedAt?: string;
        readonly softDeleted?: true;
        readonly updatedAt?: string;
    }
    interface BulkAttachedItemDoc extends database.BaseBulkAttachedDocument, BaseAttachedItemDoc {
    }
    type BulkAttachedItemDocs = readonly BulkAttachedItemDoc[];
    interface ExistingAttachedItemDoc extends database.BaseExistingAttachedDocument, BaseAttachedItemDoc {
    }
    type ExistingAttachedItemDocs = readonly ExistingAttachedItemDoc[];
    interface PutAttachedItemDoc extends database.BasePutAttachedDocument, BaseAttachedItemDoc {
    }
    type PutAttachedItemDocs = readonly PutAttachedItemDoc[];
}
//# sourceMappingURL=AttachedItem.d.ts.map