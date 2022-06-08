import { Engine as BaseEngine, createImplementation } from "./core";
import { a } from "@skylib/functions";
import MiniSearch from "minisearch";
export const minisearchWrapper = createImplementation(class Engine extends BaseEngine {
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
        const ids = new Set(this.index.search(query).map(result => result.id));
        return this.items.filter(item => ids.has(item[this.idField]));
    }
});
const buildIndex = (idField, fields, items) => {
    const result = new MiniSearch({ fields: a.clone(fields), idField });
    result.addAll(a.clone(items));
    return result;
};
//# sourceMappingURL=minisearch-wrapper.js.map