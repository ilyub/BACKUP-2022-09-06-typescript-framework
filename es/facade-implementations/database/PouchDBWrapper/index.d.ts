import type { Database as DatabaseInterface, DatabaseOptions, Facade } from "@skylib/facades/es/database";
import type { Configuration } from "./Database";
import type { PouchDatabaseConfiguration } from "./PouchDBProxy";
export declare class PouchDBWrapper implements Facade {
    /**
     * Creates class instance.
     *
     * @param config - Configuration.
     * @param pouchConfig - PouchDB configuration.
     */
    constructor(config?: Configuration, pouchConfig?: PouchDatabaseConfiguration);
    create(name: string, options?: DatabaseOptions): DatabaseInterface;
    protected config: Configuration;
    protected pouchConfig: PouchDatabaseConfiguration;
}
//# sourceMappingURL=index.d.ts.map