"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PouchDBWrapper = void 0;
const Database_1 = require("./Database");
class PouchDBWrapper {
    /**
     * Creates class instance.
     *
     * @param config - Configuration.
     * @param pouchConfig - PouchDB configuration.
     */
    constructor(config = {}, pouchConfig = {}) {
        /*
        |*****************************************************************************
        |* Protected
        |*****************************************************************************
        |*/
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pouchConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.config = config;
        this.pouchConfig = pouchConfig;
    }
    create(name, options = {}) {
        return new Database_1.Database(name, options, this.config, this.pouchConfig);
    }
}
exports.PouchDBWrapper = PouchDBWrapper;
//# sourceMappingURL=index.js.map