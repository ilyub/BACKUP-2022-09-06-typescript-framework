import type { database } from "@skylib/facades";
import type { Configuration } from "./Database";
import type { PouchDatabaseConfiguration } from "./PouchDBProxy";
import { PouchConflictError, PouchNotFoundError, PouchRetryError } from "./errors";
export declare class PouchDBWrapper implements database.Facade {
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
//# sourceMappingURL=PouchDBWrapper.d.ts.map