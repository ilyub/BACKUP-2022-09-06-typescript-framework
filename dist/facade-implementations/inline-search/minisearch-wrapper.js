"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minisearchWrapper = void 0;
const tslib_1 = require("tslib");
const core_1 = require("./core");
const functions_1 = require("@skylib/functions");
const minisearch_1 = tslib_1.__importDefault(require("minisearch"));
exports.minisearchWrapper = (0, core_1.createImplementation)(class Engine extends core_1.Engine {
    /**
     * Creates class instance.
     *
     * @param idField - ID field.
     * @param fields - Searchable fields.
     * @param items - Items.
     */
    constructor(idField, fields, items) {
        super(idField, fields, items, buildIndex);
    }
    search(query) {
        const ids = new functions_1.ReadonlySet(this.index.search(query).map(result => result.id));
        return this.items.filter(item => ids.has(item[this.idField]));
    }
});
const buildIndex = (idField, fields, items) => {
    const result = new minisearch_1.default({ fields: functions_1.a.clone(fields), idField });
    result.addAll(functions_1.a.clone(items));
    return result;
};
//# sourceMappingURL=minisearch-wrapper.js.map