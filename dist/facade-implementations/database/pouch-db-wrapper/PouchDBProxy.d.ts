/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
import type { database } from "@skylib/facades";
import type { numbers } from "@skylib/functions";
export declare const handlers: Readonly<{
    error(error: unknown): void;
}>;
export declare class PouchDBProxy {
    readonly db: PouchDatabase;
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
    bulkDocs(docs: PouchPutDocuments): Promise<Array<PouchError | PouchResponse>>;
    /**
     * Subscribes to changes.
     *
     * @param changesHandler - Changes handler.
     * @param options - Options.
     * @returns Subscription ID.
     */
    changes(changesHandler: PouchChangesHandler, options: PouchChangesOptions): Changes;
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
    get(id: string): Promise<Content & PouchGetMeta & PouchIdMeta>;
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
}
export interface Changes {
    /**
     * Cancels changes.
     */
    readonly cancel: () => void;
}
export interface Content {
    readonly [key: string]: unknown;
    readonly attachedDocs?: database.BaseStoredAttachedDocuments;
    readonly lastAttachedDocs?: numbers;
}
export declare type PouchChange = PouchDB.Core.ChangesResponseChange<Content>;
export interface PouchChangesHandler {
    /**
     * Changes handler.
     *
     * @param change - Change.
     */
    (change: PouchChange): void;
}
export declare type PouchChangesOptions = PouchDB.Core.ChangesOptions;
export declare type PouchDatabase = PouchDB.Database<Content>;
export declare type PouchDatabaseConfiguration = PouchDB.Configuration.DatabaseConfiguration;
export declare type PouchError = PouchDB.Core.Error;
export declare type PouchGetMeta = PouchDB.Core.GetMeta;
export declare type PouchIdMeta = PouchDB.Core.IdMeta;
export declare type PouchPutDocument = PouchDB.Core.PutDocument<Content>;
export declare type PouchPutDocuments = readonly PouchPutDocument[];
export declare type PouchQueryOptions = PouchDB.Query.Options<Content, Content>;
export declare type PouchQueryResponse = PouchDB.Query.Response<Content>;
export declare type PouchResponse = PouchDB.Core.Response;
//# sourceMappingURL=PouchDBProxy.d.ts.map