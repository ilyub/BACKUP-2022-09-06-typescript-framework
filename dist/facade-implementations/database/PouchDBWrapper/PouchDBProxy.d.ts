/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
import type { StoredAttachedDocument } from "@skylib/facades/dist/database";
import type { DeepReadonly, numbers } from "@skylib/functions/dist/types/core";
export interface Changes {
    /**
     * Cancels changes.
     */
    readonly cancel: () => void;
}
export interface Content {
    readonly [key: string]: unknown;
    readonly attachedDocs?: readonly StoredAttachedDocument[];
    readonly lastAttachedDocs?: numbers;
}
export declare type PouchChange = DeepReadonly<PouchDB.Core.ChangesResponseChange<Content>>;
export interface PouchChangesHandler {
    /**
     * Changes handler.
     *
     * @param change - Change.
     */
    (change: PouchChange): void;
}
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
    db: PouchDatabase;
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
    bulkDocs(docs: readonly PouchPutDocument[]): Promise<Array<PouchError | PouchResponse>>;
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
//# sourceMappingURL=PouchDBProxy.d.ts.map