import { createImplementation, Engine as BaseEngine } from "./api";
import { fn } from "@skylib/functions";
import lunr from "lunr";
export const lunrWrapper = createImplementation(fn.run(() => {
    return class Engine extends BaseEngine {
        search(query) {
            const ids = new Set(this.index.search(query).map(result => result.ref));
            return this.items.filter(item => ids.has(item[this.idField]));
        }
        buildIndex(idField, fields, items) {
            return lunr((builder) => {
                builder.ref(idField);
                for (const field of fields)
                    builder.field(field);
                for (const item of items)
                    builder.add(item);
            });
        }
    };
}));
//# sourceMappingURL=lunr-wrapper.js.map