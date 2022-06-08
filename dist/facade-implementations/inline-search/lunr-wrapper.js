"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lunrWrapper = void 0;
const tslib_1 = require("tslib");
const core_1 = require("./core");
const lunr_1 = tslib_1.__importDefault(require("lunr"));
exports.lunrWrapper = (0, core_1.createImplementation)(class Engine extends core_1.Engine {
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
        const ids = new Set(this.index.search(query).map(result => result.ref));
        return this.items.filter(item => ids.has(item[this.idField]));
    }
});
const buildIndex = (idField, fields, items) => (0, lunr_1.default)((builder) => {
    builder.ref(idField);
    for (const field of fields)
        builder.field(field);
    for (const item of items)
        builder.add(item);
});
//# sourceMappingURL=lunr-wrapper.js.map