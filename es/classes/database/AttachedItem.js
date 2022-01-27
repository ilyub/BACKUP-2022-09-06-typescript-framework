import * as is from "@skylib/functions/es/guards";
import * as o from "@skylib/functions/es/object";
import { isItemDoc } from "./Item";
export const isAttachedItemDoc = is.factory(is.object.of, {
    _id: is.number,
    _rev: is.number,
    parentDoc: isItemDoc
}, {
    _deleted: is.true
});
export const isAttachedItemDocs = is.factory(is.array.of, isAttachedItemDoc);
export const isPutAttachedItemDoc = is.factory(is.object.of, {
    parentDoc: isItemDoc
}, {
    _deleted: is.true,
    _id: is.number,
    _rev: is.number
});
export const isPutAttachedItemDocs = is.factory(is.array.of, isPutAttachedItemDoc);
export class AttachedItem {
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
        Object.defineProperty(this, "_parent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "_parentDoc", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._deleted = (_a = source._deleted) !== null && _a !== void 0 ? _a : false;
        this._id = source._id;
        this._rev = source._rev;
        this._parentDoc = source.parentDoc;
    }
    /**
     * Returns parent item.
     */
    get parent() {
        var _a;
        this._parent = (_a = this._parent) !== null && _a !== void 0 ? _a : this.getParent();
        return this._parent;
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
            parentDoc: this._parentDoc
        });
    }
    /**
     * Initializes parent.
     */
    getParent() {
        throw new Error("Not implemented");
    }
}
//# sourceMappingURL=AttachedItem.js.map