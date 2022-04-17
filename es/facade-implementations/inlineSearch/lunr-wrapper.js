import { fn } from "@skylib/functions";
import lunr from "lunr";
import { createImplementation, Engine as BaseEngine } from "./api";
export const implementation = createImplementation(fn.run(() => class Engine extends BaseEngine {
    search(query) {
        const refs = new Set(this.index.search(query).map(result => result.ref));
        return this.items.filter(item => refs.has(item[this.idField]));
    }
    buildIndex(idField, fields, items) {
        return lunr(configFunction);
        function configFunction(builder) {
            builder.ref(idField);
            for (const field of fields)
                builder.field(field);
            for (const item of items)
                builder.add(item);
        }
    }
}));
//# sourceMappingURL=lunr-wrapper.js.map