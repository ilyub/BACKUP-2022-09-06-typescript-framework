import pouchdb from "pouchdb";
import { PouchDBProxy as BasePouchDBProxy } from "../PouchDBProxy";
export { handlers } from "../PouchDBProxy";
export class PouchDBProxy extends BasePouchDBProxy {
    /**
     * Creates class instance.
     *
     * @param name - Database name.
     * @param options - Database options.
     */
    constructor(name, options) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
        pouchdb.plugin(require("pouchdb-adapter-memory"));
        super(name, Object.assign(Object.assign({}, options), { adapter: "memory" }));
    }
}
//# sourceMappingURL=PouchDBProxy.js.map