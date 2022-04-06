import type { BaseExistingAttachedDocument, BasePutAttachedDocument, ExistingDocument } from "@skylib/facades/dist/database";
import type { stringU } from "@skylib/functions/dist/types/core";
import type { Item } from "./Item";
export declare type AttachedItems = readonly AttachedItems[];
export interface BaseAttachedItemDoc {
    readonly createdAt?: string;
    readonly deletedAt?: string;
    readonly softDeleted?: true;
    readonly updatedAt?: string;
}
export interface ExistingAttachedItemDoc extends BaseExistingAttachedDocument, BaseAttachedItemDoc {
}
export declare type ExistingAttachedItemDocs = readonly ExistingAttachedItemDoc[];
export interface PutAttachedItemDoc extends BasePutAttachedDocument, BaseAttachedItemDoc {
}
export declare type PutAttachedItemDocs = readonly ExistingAttachedItemDoc[];
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
    constructor(source: ExistingAttachedItemDoc);
    /**
     * Returns database document.
     *
     * @returns Database document.
     */
    doc(): ExistingAttachedItemDoc;
    protected _parent: T | undefined;
    protected _parentDoc: ExistingDocument;
    /**
     * Initializes parent.
     */
    protected getParent(): T;
}
//# sourceMappingURL=AttachedItem.d.ts.map