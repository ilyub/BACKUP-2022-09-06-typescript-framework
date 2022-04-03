import type { StoredAttachedDocuments } from "@skylib/facades/dist/database";
import * as is from "@skylib/functions/dist/guards";
import type { numbers, stringU } from "@skylib/functions/dist/types/core";
export interface PutItemDoc {
    readonly _deleted?: true;
    readonly _id?: string;
    readonly _rev?: string;
    readonly attachedDocs?: StoredAttachedDocuments;
    readonly createdAt?: string;
    readonly deletedAt?: string;
    readonly lastAttachedDocs?: numbers;
    readonly softDeleted?: true;
    readonly updatedAt?: string;
}
export declare type PutItemDocs = readonly ItemDoc[];
export interface ItemDoc extends PutItemDoc {
    readonly _id: string;
    readonly _rev: string;
}
export declare type ItemDocs = readonly ItemDoc[];
export declare type Items = readonly Items[];
export declare const isPutItemDoc: is.Guard;
export declare const isPutItemDocs: is.Guard<readonly unknown[]>;
export declare const isItemDoc: is.Guard<ItemDoc>;
export declare const isItemDocs: is.Guard<readonly ItemDoc[]>;
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
    constructor(source: ItemDoc);
    /**
     * Returns database document.
     *
     * @returns Database document.
     */
    doc(): ItemDoc;
    protected readonly attachedDocs: StoredAttachedDocuments | undefined;
    protected readonly lastAttachedDocs: numbers | undefined;
}
//# sourceMappingURL=Item.d.ts.map