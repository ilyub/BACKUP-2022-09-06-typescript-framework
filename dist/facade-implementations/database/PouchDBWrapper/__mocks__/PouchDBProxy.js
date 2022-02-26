"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PouchDBProxy = exports.handlers = void 0;
const PouchDBProxy_1 = require("../PouchDBProxy");
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
        super(name, Object.assign(Object.assign({}, options), { adapter: "memory" }));
    }
    /*
    |*****************************************************************************
    |* Protected
    |*****************************************************************************
    |*/
    async getPouchDBConstructor() {
        const pouchDBConstructor = await super.getPouchDBConstructor();
        const pouchdbAdapterMemory = await Promise.resolve().then(() => __importStar(require(
        /* webpackChunkName: "pouchdb-adapter-memory" */
        "pouchdb-adapter-memory")));
        pouchDBConstructor.plugin(pouchdbAdapterMemory.default);
        return pouchDBConstructor;
    }
}
exports.PouchDBProxy = PouchDBProxy;
//# sourceMappingURL=PouchDBProxy.js.map