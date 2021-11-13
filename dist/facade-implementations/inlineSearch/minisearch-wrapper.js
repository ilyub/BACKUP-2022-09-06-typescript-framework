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
        Object.defineProperty(this, "minisearch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.minisearch = new minisearch_1.default({ fields: a.clone(fields), idField });
        this.minisearch.addAll(a.clone(items));
    }
    search(query) {
        return this.minisearch.search(query).map(result => result.id);
    }
}
exports.Engine = Engine;
//# sourceMappingURL=minisearch-wrapper.js.map