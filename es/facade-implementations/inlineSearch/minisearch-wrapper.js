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
        this.index = new MiniSearch({ fields: a.clone(fields), idField });
        this.index.addAll(a.clone(items));
    }
    search(query) {
        const ids = new Set(this.index.search(query).map(result => result.id));
        return this.items.filter(item => ids.has(item[this.idField]));
    }
}
//# sourceMappingURL=minisearch-wrapper.js.map