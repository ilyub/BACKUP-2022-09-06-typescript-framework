"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachedItem = exports.isAttachedItemDocs = exports.isAttachedItemDoc = exports.isPutAttachedItemDocs = exports.isPutAttachedItemDoc = void 0;
const tslib_1 = require("tslib");
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const o = tslib_1.__importStar(require("@skylib/functions/dist/object"));
const Item_1 = require("./Item");
exports.isPutAttachedItemDoc = is.object.of.factory({ parentDoc: Item_1.isItemDoc }, {
    _deleted: is.true,
    _id: is.number,
    _rev: is.number,
    createdAt: is.string,
    deletedAt: is.string,
    softDeleted: is.true,
    updatedAt: is.string
});
exports.isPutAttachedItemDocs = is.factory(is.array.of, exports.isPutAttachedItemDoc);
exports.isAttachedItemDoc = is.object.of.factory({
    _id: is.number,
    _rev: is.number,
    parentDoc: Item_1.isItemDoc
}, {
    _deleted: is.true,
    createdAt: is.string,
    deletedAt: is.string,
    softDeleted: is.true,
    updatedAt: is.string
});
exports.isAttachedItemDocs = is.factory(is.array.of, exports.isAttachedItemDoc);
class AttachedItem {
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
        this.createdAt = source.createdAt;
        this.deletedAt = source.deletedAt;
        this._parentDoc = source.parentDoc;
        this.softDeleted = (_b = source.softDeleted) !== null && _b !== void 0 ? _b : false;
        this.updatedAt = source.updatedAt;
    }
    /**
     * Parent ID + attached item ID.
     */
    get id() {
        return `${this._parentDoc._id}:${this._id}`;
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
            createdAt: this.createdAt,
            deletedAt: this.deletedAt,
            parentDoc: this._parentDoc,
            softDeleted: this.softDeleted ? true : undefined,
            updatedAt: this.updatedAt
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
//# sourceMappingURL=AttachedItem.js.map