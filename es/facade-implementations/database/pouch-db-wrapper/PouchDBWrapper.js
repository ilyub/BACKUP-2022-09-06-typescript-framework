import { Database } from "./Database";
import { PouchConflictError, PouchNotFoundError, PouchRetryError } from "./errors";
export class PouchDBWrapper {
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
Object.defineProperty(PouchDBWrapper, "PouchConflictError", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: PouchConflictError
});
Object.defineProperty(PouchDBWrapper, "PouchNotFoundError", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: PouchNotFoundError
});
Object.defineProperty(PouchDBWrapper, "PouchRetryError", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: PouchRetryError
});
//# sourceMappingURL=PouchDBWrapper.js.map