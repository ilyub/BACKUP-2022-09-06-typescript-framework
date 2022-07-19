import { PouchConflictError, PouchNotFoundError, PouchRetryError } from "./core";
import { Database } from "./Database";
export class PouchWrapper {
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
        return new Database(name, options, this.config, this.pouchConfig);
    }
}
Object.defineProperty(PouchWrapper, "PouchConflictError", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: PouchConflictError
});
Object.defineProperty(PouchWrapper, "PouchNotFoundError", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: PouchNotFoundError
});
Object.defineProperty(PouchWrapper, "PouchRetryError", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: PouchRetryError
});
//# sourceMappingURL=PouchWrapper.js.map