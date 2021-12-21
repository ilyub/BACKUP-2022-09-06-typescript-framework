"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engine = exports.implementation = void 0;
const tslib_1 = require("tslib");
const minisearch_1 = (0, tslib_1.__importDefault)(require("minisearch"));
const a = (0, tslib_1.__importStar)(require("@skylib/functions/dist/array"));
exports.implementation = {
    create(idField, fields, items) {
        return new Engine(idField, fields, items);
    }
};
class Engine {
    /**
     * Creates class instance.
     *
     * @param idField - ID field.
     * @param fields - Searchable fields.
     * @param items - Items.
     */
    constructor(idField, fields, items) {
        /*
        |*****************************************************************************
        |* Protected
        |*****************************************************************************
        |*/
        Object.defineProperty(this, "idField", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "index", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "items", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.idField = idField;
        this.items = items;
        this.index = new minisearch_1.default({ fields: a.clone(fields), idField });
        this.index.addAll(a.clone(items));
    }
    search(query) {
        const ids = new Set(this.index.search(query).map(result => result.id));
        return this.items.filter(item => ids.has(item[this.idField]));
    }
}
exports.Engine = Engine;
//# sourceMappingURL=minisearch-wrapper.js.map