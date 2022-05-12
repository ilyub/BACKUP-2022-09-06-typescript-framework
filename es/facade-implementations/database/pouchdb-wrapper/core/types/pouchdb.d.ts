/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
import type { database } from "@skylib/facades";
import type { numbers } from "@skylib/functions";
export interface Content {
    readonly [key: string]: unknown;
    readonly attachedDocs?: database.BaseStoredAttachedDocuments;
    readonly lastAttachedDocs?: numbers;
}
export interface PouchChange extends PouchDB.Core.ChangesResponseChange<Content> {
}
export interface PouchChanges extends PouchDB.Core.Changes<Content> {
}
export interface PouchChangesHandler {
    /**
     * Changes handler.
     *
     * @param change - Change.
     */
    (change: PouchChange): void;
}
export interface PouchChangesOptions extends PouchDB.Core.ChangesOptions {
}
export interface PouchDatabase extends PouchDB.Database<Content> {
}
export declare type PouchDatabaseConfiguration = PouchDB.Configuration.DatabaseConfiguration;
export interface PouchError extends PouchDB.Core.Error {
}
export interface PouchGetMeta extends PouchDB.Core.GetMeta {
}
export interface PouchIdMeta extends PouchDB.Core.IdMeta {
}
export interface PouchPutDocument extends PouchDB.Core.PutDocument<Content> {
}
export declare type PouchPutDocuments = readonly PouchPutDocument[];
export interface PouchQueryOptions extends PouchDB.Query.Options<Content, Content> {
}
export interface PouchQueryResponse extends PouchDB.Query.Response<Content> {
}
export interface PouchResponse extends PouchDB.Core.Response {
}
//# sourceMappingURL=pouchdb.d.ts.map