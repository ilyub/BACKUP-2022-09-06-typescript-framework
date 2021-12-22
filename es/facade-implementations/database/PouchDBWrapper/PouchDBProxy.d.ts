/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
/// <reference types="pouchdb-adapter-cordova-sqlite" />
/// <reference types="pouchdb-adapter-fruitdown" />
/// <reference types="pouchdb-adapter-http" />
/// <reference types="pouchdb-adapter-idb" />
/// <reference types="pouchdb-adapter-leveldb" />
/// <reference types="pouchdb-adapter-localstorage" />
/// <reference types="pouchdb-adapter-memory" />
/// <reference types="pouchdb-adapter-websql" />
import type { StoredAttachedDocument } from "@skylib/facades/es/database";
import type { DeepReadonly } from "@skylib/functions/es/types/core";
export interface Changes {
    /**
     * Cancels changes.
     */
    readonly cancel: () => void;
}
export interface Content {
    readonly [key: string]: unknown;
    readonly attachedDocs?: readonly StoredAttachedDocument[];
    readonly lastAttachedDoc?: number;
}
export declare type PouchChange = DeepReadonly<PouchDB.Core.ChangesResponseChange<Content>>;
export declare type PouchChangesHandler = (change: PouchChange) => void;
export declare type PouchChangesOptions = DeepReadonly<PouchDB.Core.ChangesOptions>;
export declare type PouchDatabaseConfiguration = DeepReadonly<PouchDB.Configuration.DatabaseConfiguration>;
export declare type PouchGetMeta = DeepReadonly<PouchDB.Core.GetMeta>;
export declare type PouchIdMeta = Readonly<PouchDB.Core.IdMeta>;
export declare type PouchDatabase = DeepReadonly<PouchDB.Database<Content>>;
export declare type PouchError = Readonly<PouchDB.Core.Error>;
export declare type PouchResponse = Readonly<PouchDB.Core.Response>;
export declare type PouchPutDocument = DeepReadonly<PouchDB.Core.PutDocument<Content>>;
export declare type PouchQueryOptions = DeepReadonly<PouchDB.Query.Options<Content, Content>>;
export declare type PouchQueryResponse = DeepReadonly<PouchDB.Query.Response<Content>>;
export declare const handlers: Readonly<{
    error(error: unknown): void;
}>;
export declare class PouchDBProxy {
    /**
     * Creates class instance.
     *
     * @param name - Database name.
     * @param options - Database options.
     */
    constructor(name: string, options: PouchDatabaseConfiguration);
    /**
     * Creates or updates multiple documents.
     *
     * @param docs - Documents.
     * @returns Responses.
     */
    bulkDocs(docs: readonly PouchPutDocument[]): Promise<Array<PouchResponse | PouchError>>;
    /**
     * Subscribes to changes.
     *
     * @param changesHandler - Changes handler.
     * @param options - Options.
     * @returns Subscription ID.
     */
    changes(changesHandler: PouchChangesHandler, options: PouchChangesOptions): Promise<Changes>;
    /**
     * Destroys database.
     */
    destroy(): Promise<void>;
    /**
     * Fetches document.
     *
     * @param id - ID.
     * @returns Document.
     */
    get(id: string): Promise<Content & PouchIdMeta & PouchGetMeta>;
    /**
     * Returns original PouchDB database.
     *
     * @returns Original PouchDB database.
     */
    getDb(): Promise<PouchDatabase>;
    /**
     * Posts document.
     *
     * @param doc - Document.
     * @returns Response.
     */
    post(doc: PouchPutDocument): Promise<PouchResponse>;
    /**
     * Puts document.
     *
     * @param doc - Document.
     * @returns Response.
     */
    put(doc: PouchPutDocument): Promise<PouchResponse>;
    /**
     * Queries database.
     *
     * @param mapReduce - The name of a view in an existing design document.
     * @param options - Options.
     * @returns Query response.
     */
    query(mapReduce: string, options: PouchQueryOptions): Promise<PouchQueryResponse>;
    protected static pouchDBConstructor: Promise<PouchDB.Static> | undefined;
    protected db: PouchDatabase | undefined;
    protected name: string;
    protected options: PouchDatabaseConfiguration;
    /**
     * Returns PouchDB constructor.
     *
     * @returns PouchDB constructor.
     */
    protected getPouchDBConstructor(): Promise<PouchDB.Static>;
}
//# sourceMappingURL=PouchDBProxy.d.ts.map