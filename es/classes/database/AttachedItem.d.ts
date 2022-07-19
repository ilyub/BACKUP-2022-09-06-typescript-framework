import type { stringU } from "@skylib/functions";
import type { Item } from "./Item";
import type { database } from "@skylib/facades";
export declare abstract class AttachedItem<T extends Item = Item> {
    readonly _deleted: boolean;
    readonly _id: number;
    readonly _rev: number;
    readonly createdAt: stringU;
    readonly deletedAt: stringU;
    readonly softDeleted: boolean;
    readonly updatedAt: stringU;
    /**
     * Unique combined ID.
     */
    get id(): string;
    /**
     * Parent item.
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
    protected abstract getParent(): T;
}
export declare namespace AttachedItem {
    /**
     * @deprecated
     */
    interface AttachedItemProps extends Content {
    }
    type AttachedItems = readonly AttachedItems[];
    interface BulkAttachedItemDoc extends database.BaseBulkAttachedDocument, Content {
    }
    type BulkAttachedItemDocs = readonly BulkAttachedItemDoc[];
    interface Content {
        readonly createdAt?: string;
        readonly deletedAt?: string;
        readonly softDeleted?: true;
        readonly updatedAt?: string;
    }
    interface ExistingAttachedItemDoc extends database.BaseExistingAttachedDocument, Content {
    }
    type ExistingAttachedItemDocs = readonly ExistingAttachedItemDoc[];
    /**
     * @deprecated
     */
    interface OwnProps extends Content {
    }
    interface PutAttachedItemDoc extends database.BasePutAttachedDocument, Content {
    }
    type PutAttachedItemDocs = readonly PutAttachedItemDoc[];
}
//# sourceMappingURL=AttachedItem.d.ts.map