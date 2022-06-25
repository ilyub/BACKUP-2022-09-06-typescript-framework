import type { database } from "@skylib/facades";
import type { numbers, stringU } from "@skylib/functions";
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
    constructor(source: Item.ExistingItemDoc);
    /**
     * Returns database document.
     *
     * @returns Database document.
     */
    doc(): Item.ExistingItemDoc;
    protected readonly attachedDocs: database.BaseStoredAttachedDocuments | undefined;
    protected readonly lastAttachedDocs: numbers | undefined;
}
export declare namespace Item {
    interface Content {
        readonly createdAt?: string;
        readonly deletedAt?: string;
        readonly softDeleted?: true;
        readonly updatedAt?: string;
    }
    interface ExistingItemDoc extends database.BaseExistingDocument, Content {
    }
    type ExistingItemDocs = readonly ExistingItemDoc[];
    /**
     * @deprecated
     */
    interface ItemProps extends Content {
    }
    type Items = readonly Items[];
    /**
     * @deprecated
     */
    interface OwnProps extends Content {
    }
    interface PutItemDoc extends database.BasePutDocument, Content {
    }
    type PutItemDocs = readonly PutItemDoc[];
}
//# sourceMappingURL=Item.d.ts.map