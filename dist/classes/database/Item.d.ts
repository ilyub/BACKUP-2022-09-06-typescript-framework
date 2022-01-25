import type { StoredAttachedDocuments } from "@skylib/facades/dist/database";
import * as is from "@skylib/functions/dist/guards";
import type { numberU, stringU } from "@skylib/functions/dist/types/core";
export interface ItemDoc {
    readonly _deleted?: true;
    readonly _id?: string;
    readonly _rev?: string;
    readonly attachedDocs?: StoredAttachedDocuments;
    readonly lastAttachedDoc?: number;
}
export declare type ItemDocs = readonly ItemDoc[];
export declare type Items = readonly Items[];
export declare const isItemDoc: is.Guard<ItemDoc>;
export declare const isItemDocs: is.Guard<readonly ItemDoc[]>;
export declare class Item {
    readonly _deleted: boolean;
    readonly _id: string;
    readonly _rev: stringU;
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
    protected readonly lastAttachedDoc: numberU;
}
export declare const isItem: is.Guard<Item>;
export declare const isItems: is.Guard<readonly Item[]>;
//# sourceMappingURL=Item.d.ts.map