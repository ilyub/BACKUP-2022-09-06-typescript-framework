import * as is from "@skylib/functions/es/guards";
import type { stringU } from "@skylib/functions/es/types/core";
import type { Item, ItemDoc } from "./Item";
export interface PutAttachedItemDoc {
    readonly _deleted?: true;
    readonly _id?: number;
    readonly _rev?: number;
    readonly createdAt?: string;
    readonly deletedAt?: string;
    readonly parentDoc: ItemDoc;
    readonly softDeleted?: true;
    readonly updatedAt?: string;
}
export declare type PutAttachedItemDocs = readonly AttachedItemDoc[];
export interface AttachedItemDoc extends PutAttachedItemDoc {
    readonly _id: number;
    readonly _rev: number;
}
export declare type AttachedItemDocs = readonly AttachedItemDoc[];
export declare type AttachedItems = readonly AttachedItems[];
export declare const isPutAttachedItemDoc: is.Guard<PutAttachedItemDoc>;
export declare const isPutAttachedItemDocs: is.Guard<readonly PutAttachedItemDoc[]>;
export declare const isAttachedItemDoc: is.Guard<AttachedItemDoc>;
export declare const isAttachedItemDocs: is.Guard<readonly AttachedItemDoc[]>;
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
//# sourceMappingURL=AttachedItem.d.ts.map