"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PouchWrapper = void 0;
const Database_1 = require("./Database");
const core_1 = require("./core");
class PouchWrapper {
    /**
     * Creates class instance.
     *
     * @param config - Configuration.
     * @param pouchConfig - PouchDB configuration.
     */
    constructor(config = {}, pouchConfig = {}) {
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
exports.PouchWrapper = PouchWrapper;
Object.defineProperty(PouchWrapper, "PouchConflictError", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: core_1.PouchConflictError
});
Object.defineProperty(PouchWrapper, "PouchNotFoundError", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: core_1.PouchNotFoundError
});
Object.defineProperty(PouchWrapper, "PouchRetryError", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: core_1.PouchRetryError
});
//# sourceMappingURL=PouchWrapper.js.map