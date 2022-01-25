"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isItems = exports.isItem = exports.Item = exports.isItemDocs = exports.isItemDoc = void 0;
const tslib_1 = require("tslib");
const database_1 = require("@skylib/facades/dist/database");
const uniqueId_1 = require("@skylib/facades/dist/uniqueId");
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const o = (0, tslib_1.__importStar)(require("@skylib/functions/dist/object"));
exports.isItemDoc = is.factory(is.object.of, {}, {
    _deleted: is.true,
    _id: is.string,
    _rev: is.string,
    attachedDocs: database_1.isStoredAttachedDocuments,
    lastAttachedDoc: is.number
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
        this._id = (_b = source._id) !== null && _b !== void 0 ? _b : (0, uniqueId_1.uniqueId)();
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
exports.Item = Item;
exports.isItem = is.factory(is.instance, Item);
exports.isItems = is.factory(is.array.of, exports.isItem);
//# sourceMappingURL=Item.js.map