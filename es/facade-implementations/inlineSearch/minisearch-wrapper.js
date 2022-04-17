import { a, fn } from "@skylib/functions";
import MiniSearch from "minisearch";
import { createImplementation, Engine as BaseEngine } from "./api";
export const implementation = createImplementation(fn.run(() => class Engine extends BaseEngine {
    search(query) {
        const ids = new Set(this.index.search(query).map(result => result.id));
        return this.items.filter(item => ids.has(item[this.idField]));
    }
    buildIndex(idField, fields, items) {
        const result = new MiniSearch({ fields: a.clone(fields), idField });
        result.addAll(a.clone(items));
        return result;
    }
}));
//# sourceMappingURL=minisearch-wrapper.js.map