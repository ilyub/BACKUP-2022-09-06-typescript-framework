"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAttachedItems = exports.isAttachedItem = exports.AttachedItem = exports.isAttachedItemDocs = exports.isAttachedItemDoc = void 0;
const tslib_1 = require("tslib");
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const o = (0, tslib_1.__importStar)(require("@skylib/functions/dist/object"));
const Item_1 = require("./Item");
exports.isAttachedItemDoc = is.factory(is.object.of, {
    parentDoc: Item_1.isItemDoc
}, {
    _deleted: is.true,
    _id: is.number,
    _rev: is.number
});
exports.isAttachedItemDocs = is.factory(is.array.of, exports.isAttachedItemDoc);
class AttachedItem {
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
exports.AttachedItem = AttachedItem;
exports.isAttachedItem = is.factory(is.instance, AttachedItem);
exports.isAttachedItems = is.factory(is.array.of, exports.isAttachedItem);
//# sourceMappingURL=AttachedItem.js.map