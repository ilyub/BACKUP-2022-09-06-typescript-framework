import type { BaseExistingDocument, BasePutDocument, StoredAttachedDocuments } from "@skylib/facades/es/database";
import type { numbers, stringU } from "@skylib/functions/es/types/core";
export interface BaseItemDoc {
    readonly createdAt?: string;
    readonly deletedAt?: string;
    readonly softDeleted?: true;
    readonly updatedAt?: string;
}
export interface PutItemDoc extends BasePutDocument, BaseItemDoc {
}
export declare type PutItemDocs = readonly PutItemDoc[];
export interface ExistingItemDoc extends BaseExistingDocument, BaseItemDoc {
}
export declare type ExistingItemDocs = readonly ExistingItemDoc[];
export declare type Items = readonly Items[];
export declare class Item {
    readonly _deleted: boolean;
    readonly _id: string;
    readonly _rev: string;
    readonly createdAt: stringU;
    readonly deletedAt: stringU;
    readonly softDeleted: boolean;
    readonly updatedAt: stringU;
    /**
     * Creates class instance.
     *
     * @param source - Source.
     */
    constructor(source: ExistingItemDoc);
    /**
     * Returns database document.
     *
     * @returns Database document.
     */
    doc(): ExistingItemDoc;
    protected readonly attachedDocs: StoredAttachedDocuments | undefined;
    protected readonly lastAttachedDocs: numbers | undefined;
}
//# sourceMappingURL=Item.d.ts.map