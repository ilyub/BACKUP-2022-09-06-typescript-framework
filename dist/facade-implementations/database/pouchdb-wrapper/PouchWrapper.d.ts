import type { Configuration, PouchDatabaseConfiguration } from "./core";
import { PouchConflictError, PouchNotFoundError, PouchRetryError } from "./core";
import type { database } from "@skylib/facades";
export declare class PouchWrapper implements database.Facade {
    static readonly PouchConflictError: typeof PouchConflictError;
    static readonly PouchNotFoundError: typeof PouchNotFoundError;
    static readonly PouchRetryError: typeof PouchRetryError;
    /**
     * Creates class instance.
     *
     * @param config - Configuration.
     * @param pouchConfig - PouchDB configuration.
     */
    constructor(config?: Configuration, pouchConfig?: PouchDatabaseConfiguration);
    create(name: string, options?: database.DatabaseOptions): database.Database;
    protected readonly config: Configuration;
    protected readonly pouchConfig: PouchDatabaseConfiguration;
}
//# sourceMappingURL=PouchWrapper.d.ts.map