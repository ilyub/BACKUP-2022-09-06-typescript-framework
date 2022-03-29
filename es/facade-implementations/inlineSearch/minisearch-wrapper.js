import MiniSearch from "minisearch";
import * as a from "@skylib/functions/es/array";
import { createImplementation, Engine as BaseEngine } from "./api/template";
export class Engine extends BaseEngine {
    search(query) {
        const ids = new Set(this.index.search(query).map(result => result.id));
        return this.items.filter(item => ids.has(item[this.idField]));
    }
    /*
    |*****************************************************************************
    |* Protected
    |*****************************************************************************
    |*/
    buildIndex(idField, fields, items) {
        const result = new MiniSearch({ fields: a.clone(fields), idField });
        result.addAll(a.clone(items));
        return result;
    }
}
export const implementation = createImplementation(Engine);
//# sourceMappingURL=minisearch-wrapper.js.map