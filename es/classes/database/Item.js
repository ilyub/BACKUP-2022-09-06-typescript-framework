import { isStoredAttachedDocuments } from "@skylib/facades/es/database";
import { uniqueId } from "@skylib/facades/es/uniqueId";
import * as is from "@skylib/functions/es/guards";
import * as o from "@skylib/functions/es/object";
export const isItemDoc = is.factory(is.object.of, {}, {
    _deleted: is.true,
    _id: is.string,
    _rev: is.string,
    attachedDocs: isStoredAttachedDocuments,
    lastAttachedDoc: is.number
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
        this._id = (_b = source._id) !== null && _b !== void 0 ? _b : uniqueId();
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
export const isItem = is.factory(is.instance, Item);
export const isItems = is.factory(is.array.of, isItem);
//# sourceMappingURL=Item.js.map