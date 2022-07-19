import type { Content, PouchChanges, PouchChangesHandler, PouchChangesOptions, PouchDatabase, PouchDatabaseConfiguration, PouchError, PouchGetMeta, PouchIdMeta, PouchPutDocument, PouchPutDocuments, PouchQueryOptions, PouchQueryResponse, PouchResponse } from "./core";
export declare class PouchProxy {
    /**
     * Creates class instance.
     *
     * @param name - Database name.
     * @param config - Database configuration.
     */
    constructor(name: string, config: PouchDatabaseConfiguration);
    /**
     * Creates, updates or deletes multiple documents.
     *
     * @param docs - Documents.
     * @returns Responses.
     */
    bulkDocs(docs: PouchPutDocuments): Promise<ReadonlyArray<PouchError | PouchResponse>>;
    /**
     * Subscribes to changes.
     *
     * @param changesHandler - Changes handler.
     * @param options - Options.
     * @returns Subscription ID.
     */
    changes(changesHandler: PouchChangesHandler, options: PouchChangesOptions): PouchChanges;
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
     * Returns original PouchDB database.
     *
     * @returns Original PouchDB database.
     */
    getRawDb(): PouchDatabase;
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
     * @returns Response.
     */
    query(mapReduce: string, options: PouchQueryOptions): Promise<PouchQueryResponse>;
    protected readonly db: PouchDatabase;
}
//# sourceMappingURL=PouchProxy.d.ts.map