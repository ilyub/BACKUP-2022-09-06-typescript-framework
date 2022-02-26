"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = exports.isItemDocs = exports.isItemDoc = exports.isPutItemDocs = exports.isPutItemDoc = void 0;
const tslib_1 = require("tslib");
const database_1 = require("@skylib/facades/dist/database");
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const o = (0, tslib_1.__importStar)(require("@skylib/functions/dist/object"));
exports.isPutItemDoc = is.factory(is.object.of, {}, {
    _deleted: is.true,
    _id: is.string,
    _rev: is.string,
    attachedDocs: database_1.isStoredAttachedDocuments,
    createdAt: is.string,
    deletedAt: is.string,
    lastAttachedDocs: is.numbers,
    softDeleted: is.true,
    updatedAt: is.string
});
exports.isPutItemDocs = is.factory(is.array.of, exports.isPutItemDoc);
exports.isItemDoc = is.factory(is.object.of, {
    _id: is.string,
    _rev: is.string
}, {
    _deleted: is.true,
    attachedDocs: database_1.isStoredAttachedDocuments,
    createdAt: is.string,
    deletedAt: is.string,
    lastAttachedDocs: is.numbers,
    softDeleted: is.true,
    updatedAt: is.string
});
exports.isItemDocs = is.factory(is.array.of, exports.isItemDoc);
class Item {
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
        Object.defineProperty(this, "attachedDocs", {
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
exports.Item = Item;
//# sourceMappingURL=Item.js.map