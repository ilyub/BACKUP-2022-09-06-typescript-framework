import { createImplementation, Engine as BaseEngine } from "./api";
import { fn, o } from "@skylib/functions";
import MiniSearch from "minisearch";
export const minisearchWrapper = createImplementation(fn.run(() => {
    return class Engine extends BaseEngine {
        search(query) {
            const ids = new Set(this.index.search(query).map(result => result.id));
            return this.items.filter(item => ids.has(item[this.idField]));
        }
        buildIndex(idField, fields, items) {
            const result = new MiniSearch({ fields: o.unfreeze(fields), idField });
            result.addAll(o.unfreeze(items));
            return result;
        }
    };
}));
//# sourceMappingURL=minisearch-wrapper.js.map