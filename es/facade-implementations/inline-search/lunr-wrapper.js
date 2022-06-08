import { Engine as BaseEngine, createImplementation } from "./core";
import lunr from "lunr";
export const lunrWrapper = createImplementation(class Engine extends BaseEngine {
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
const buildIndex = (idField, fields, items) => lunr((builder) => {
    builder.ref(idField);
    for (const field of fields)
        builder.field(field);
    for (const item of items)
        builder.add(item);
});
//# sourceMappingURL=lunr-wrapper.js.map