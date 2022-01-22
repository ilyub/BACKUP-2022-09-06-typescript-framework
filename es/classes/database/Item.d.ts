import type { StoredAttachedDocuments } from "@skylib/facades/es/database";
import * as is from "@skylib/functions/es/guards";
import type { numberU, stringU } from "@skylib/functions/es/types/core";
export interface ItemDoc {
    readonly _deleted?: true;
    readonly _id?: string;
    readonly _rev?: string;
    readonly attachedDocs?: StoredAttachedDocuments;
    readonly lastAttachedDoc?: number;
}
export declare type ItemDocs = readonly ItemDoc[];
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
//# sourceMappingURL=Item.d.ts.map