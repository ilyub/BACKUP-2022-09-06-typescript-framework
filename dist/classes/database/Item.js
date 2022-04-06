"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const tslib_1 = require("tslib");
const o = tslib_1.__importStar(require("@skylib/functions/dist/object"));
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