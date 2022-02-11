import { isStoredAttachedDocuments } from "@skylib/facades/es/database";
import * as is from "@skylib/functions/es/guards";
import * as o from "@skylib/functions/es/object";
export const isPutItemDoc = is.factory(is.object.of, {}, {
    _deleted: is.true,
    _id: is.string,
    _rev: is.string,
    attachedDocs: isStoredAttachedDocuments,
    createdAt: is.string,
    deletedAt: is.string,
    lastAttachedDocs: is.numbers,
    softDeleted: is.true,
    updatedAt: is.string
});
export const isPutItemDocs = is.factory(is.array.of, isPutItemDoc);
export const isItemDoc = is.factory(is.object.of, {
    _id: is.string,
    _rev: is.string
}, {
    _deleted: is.true,
    attachedDocs: isStoredAttachedDocuments,
    createdAt: is.string,
    deletedAt: is.string,
    lastAttachedDocs: is.numbers,
    softDeleted: is.true,
    updatedAt: is.string
});
export const isItemDocs = is.factory(is.array.of, isItemDoc);
export class Item {
    /**
     * Creates class instance.
     *
     * @param source - Source.
     */
    constructor(source) {
        var _a, _b;
        Object.defineProperty(this, "_deleted", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_rev", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "attachedDocs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "createdAt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "deletedAt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lastAttachedDocs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "softDeleted", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "updatedAt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._deleted = (_a = source._deleted) !== null && _a !== void 0 ? _a : false;
        this._id = source._id;
        this._rev = source._rev;
        this.attachedDocs = source.attachedDocs;
        this.createdAt = source.createdAt;
        this.deletedAt = source.deletedAt;
        this.lastAttachedDocs = source.lastAttachedDocs;
        this.softDeleted = (_b = source.softDeleted) !== null && _b !== void 0 ? _b : false;
        this.updatedAt = source.updatedAt;
    }
    /**
     * Returns database document.
     *
     * @returns Database document.
     */
    doc() {
        return o.removeUndefinedKeys({
            _deleted: this._deleted ? true : undefined,
            _id: this._id,
            _rev: this._rev,
            attachedDocs: this.attachedDocs,
            createdAt: this.createdAt,
            deletedAt: this.deletedAt,
            lastAttachedDocs: this.lastAttachedDocs,
            softDeleted: this.softDeleted ? true : undefined,
            updatedAt: this.updatedAt
        });
    }
}
//# sourceMappingURL=Item.js.map