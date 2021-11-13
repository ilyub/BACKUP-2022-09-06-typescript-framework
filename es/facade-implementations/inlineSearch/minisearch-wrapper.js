import MiniSearch from "minisearch";
import * as a from "@skylib/functions/es/array";
export const implementation = {
    create(idField, fields, items) {
        return new Engine(idField, fields, items);
    }
};
export class Engine {
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
        this.minisearch = new MiniSearch({ fields: a.clone(fields), idField });
        this.minisearch.addAll(a.clone(items));
    }
    search(query) {
        return this.minisearch.search(query).map(result => result.id);
    }
}
//# sourceMappingURL=minisearch-wrapper.js.map