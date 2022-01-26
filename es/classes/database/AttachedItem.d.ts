import * as is from "@skylib/functions/es/guards";
import type { numberU } from "@skylib/functions/es/types/core";
import type { Item, ItemDoc } from "./Item";
export interface AttachedItemDoc {
    readonly _deleted?: true;
    readonly _id?: number;
    readonly _rev?: number;
    readonly parentDoc: ItemDoc;
}
export declare type AttachedItemDocs = readonly AttachedItemDoc[];
export declare type AttachedItems = readonly AttachedItems[];
export declare const isAttachedItemDoc: is.Guard<AttachedItemDoc>;
export declare const isAttachedItemDocs: is.Guard<readonly AttachedItemDoc[]>;
export declare class AttachedItem<T extends Item = Item> {
    readonly _deleted: boolean;
    readonly _id: numberU;
    readonly _rev: numberU;
    /**
     * Returns parent item.
     */
    get parent(): T;
    /**
     * Creates class instance.
     *
     * @param source - Source.
     */
    constructor(source: AttachedItemDoc);
    /**
     * Returns database document.
     *
     * @returns Database document.
     */
    doc(): AttachedItemDoc;
    protected _parent: T | undefined;
    protected _parentDoc: ItemDoc;
    /**
     * Initializes parent.
     */
    protected getParent(): T;
}
export declare const isAttachedItem: is.Guard<AttachedItem<Item>>;
export declare const isAttachedItems: is.Guard<readonly AttachedItem<Item>[]>;
//# sourceMappingURL=AttachedItem.d.ts.map