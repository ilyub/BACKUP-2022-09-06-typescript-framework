"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PouchDBProxy = exports.handlers = void 0;
const tslib_1 = require("tslib");
const PouchDBProxy_1 = require("../PouchDBProxy");
const pouchdb_1 = tslib_1.__importDefault(require("pouchdb"));
var PouchDBProxy_2 = require("../PouchDBProxy");
Object.defineProperty(exports, "handlers", { enumerable: true, get: function () { return PouchDBProxy_2.handlers; } });
class PouchDBProxy extends PouchDBProxy_1.PouchDBProxy {
    /**
     * Creates class instance.
     *
     * @param name - Database name.
     * @param options - Database options.
     */
    constructor(name, options) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires -- ???
        pouchdb_1.default.plugin(require("pouchdb-adapter-memory"));
        super(name, Object.assign(Object.assign({}, options), { adapter: "memory" }));
    }
}
exports.PouchDBProxy = PouchDBProxy;
//# sourceMappingURL=PouchDBProxy.js.map