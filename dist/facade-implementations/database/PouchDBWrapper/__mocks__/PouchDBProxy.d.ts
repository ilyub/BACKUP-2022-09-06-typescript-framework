/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-adapter-cordova-sqlite" />
/// <reference types="pouchdb-adapter-fruitdown" />
/// <reference types="pouchdb-adapter-http" />
/// <reference types="pouchdb-adapter-idb" />
/// <reference types="pouchdb-adapter-leveldb" />
/// <reference types="pouchdb-adapter-localstorage" />
/// <reference types="pouchdb-adapter-memory" />
/// <reference types="pouchdb-adapter-websql" />
/// <reference types="pouchdb-replication" />
import type { PouchDatabaseConfiguration } from "../PouchDBProxy";
import { PouchDBProxy as BasePouchDBProxy } from "../PouchDBProxy";
export { handlers } from "../PouchDBProxy";
export declare class PouchDBProxy extends BasePouchDBProxy {
    /**
     * Creates class instance.
     *
     * @param name - Database name.
     * @param options - Database options.
     */
    constructor(name: string, options: PouchDatabaseConfiguration);
    protected getPouchDBConstructor(): Promise<PouchDB.Static>;
}
//# sourceMappingURL=PouchDBProxy.d.ts.map