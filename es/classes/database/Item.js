import { isStoredAttachedDocuments } from "@skylib/facades/es/database";
import * as is from "@skylib/functions/es/guards";
import * as o from "@skylib/functions/es/object";
export const isItemDoc = is.factory(is.object.of, {
    _id: is.string,
    _rev: is.string
}, {
    _deleted: is.true,
    attachedDocs: isStoredAttachedDocuments,
    lastAttachedDoc: is.number
});
export const isItemDocs = is.factory(is.array.of, isItemDoc);
export const isPutItemDoc = is.factory(is.object.of, {}, {
    _deleted: is.true,
    _id: is.string,
    _rev: is.string,
    attachedDocs: isStoredAttachedDocuments,
    lastAttachedDoc: is.number
});
export const isPutItemDocs = is.factory(is.array.of, isPutItemDoc);
export class Item {
    /**
     * Creates class instance.
     *
     * @param source - Source.
     */
    constructor(source) {
        var _a;
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
        /*
        |*******************************************************************************
        |* Protected
        |*******************************************************************************
        |*/
        Object.defineProperty(this, "attachedDocs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lastAttachedDoc", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._deleted = (_a = source._deleted) !== null && _a !== void 0 ? _a : false;
        this._id = source._id;
        this._rev = source._rev;
        this.attachedDocs = source.attachedDocs;
        this.lastAttachedDoc = source.lastAttachedDoc;
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
            lastAttachedDoc: this.lastAttachedDoc
        });
    }
}
//# sourceMappingURL=Item.js.map