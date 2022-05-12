"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PouchProxy = void 0;
const tslib_1 = require("tslib");
const PouchProxy_1 = require("../PouchProxy");
const pouchdb_1 = tslib_1.__importDefault(require("pouchdb"));
class PouchProxy extends PouchProxy_1.PouchProxy {
    /**
     * Creates class instance.
     *
     * @param name - Database name.
     * @param config - Database configuration.
     */
    constructor(name, config) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires -- Ok
        pouchdb_1.default.plugin(require("pouchdb-adapter-memory"));
        super(name, Object.assign(Object.assign({}, config), { adapter: "memory" }));
    }
}
exports.PouchProxy = PouchProxy;
//# sourceMappingURL=PouchProxy.js.map