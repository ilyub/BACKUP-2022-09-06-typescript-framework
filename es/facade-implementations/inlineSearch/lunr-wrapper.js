import lunr from "lunr";
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
        this.index = lunr(configFunction);
        function configFunction(builder) {
            builder.ref(idField);
            for (const field of fields)
                builder.field(field);
            for (const item of items)
                builder.add(item);
        }
    }
    search(query) {
        const refs = new Set(this.index.search(query).map(result => result.ref));
        return this.items.filter(item => refs.has(item[this.idField]));
    }
}
//# sourceMappingURL=lunr-wrapper.js.map