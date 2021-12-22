import type { AttachedChangesHandler, ChangesHandler, Conditions, Database as DatabaseInterface, DatabaseOptions, ExistingAttachedDocument, ExistingAttachedDocuments, ExistingDocument, ExistingDocuments, PutAttachedDocument, PutAttachedResponse, PutDocument, PutDocuments, PutResponse, PutResponses, QueryOptions, ResetCallback } from "@skylib/facades/es/database";
import type { Changes, PouchDatabase, PouchDatabaseConfiguration } from "./PouchDBProxy";
import { PouchDBProxy } from "./PouchDBProxy";
export interface Configuration {
    readonly reindexThreshold?: number;
}
export declare type Filter = (doc: unknown) => boolean;
export interface MapReduce {
    readonly groupLevel: number;
    readonly id: string;
    readonly mapReduce: {
        readonly map: string;
        readonly reduce: string;
    };
    readonly output: Filter;
    readonly settle: Filter;
}
export interface RawQueryOptions {
    readonly conditions: Conditions;
    readonly count?: true;
    readonly docs?: true;
    readonly unsettledCount?: true;
}
export interface RawQueryOptionsAttached extends RawQueryOptions {
    readonly parentConditions: Conditions;
}
export interface RawQueryResponse {
    readonly count: number;
    readonly docs: readonly unknown[];
    readonly mapReduce: MapReduce;
    readonly unsettledCount: number;
}
export declare class Database implements DatabaseInterface {
    /**
     * Creates class instance.
     *
     * @param name - Database name.
     * @param options - Database options.
     * @param config - Configuration.
     * @param pouchConfig - PouchDB configuration.
     */
    constructor(name: string, options?: DatabaseOptions, config?: Configuration, pouchConfig?: PouchDatabaseConfiguration);
    bulkDocs(docs: PutDocuments): Promise<PutResponses>;
    count(conditions: Conditions): Promise<number>;
    countAttached(conditions: Conditions, parentConditions?: Conditions): Promise<number>;
    exists(id: string): Promise<boolean>;
    existsAttached(id: number, parentId: string): Promise<boolean>;
    get(id: string): Promise<ExistingDocument>;
    getAttached(id: number, parentId: string): Promise<ExistingAttachedDocument>;
    getAttachedIfExists(id: number, parentId: string): Promise<ExistingAttachedDocument | undefined>;
    getIfExists(id: string): Promise<ExistingDocument | undefined>;
    /**
     * Returns original PouchDB database.
     *
     * @returns Original PouchDB database.
     */
    getRawDb(): Promise<PouchDatabase>;
    put(doc: PutDocument): Promise<PutResponse>;
    putAttached(parentId: string, doc: PutAttachedDocument): Promise<PutAttachedResponse>;
    putAttachedIfNotExists(parentId: string, doc: PutAttachedDocument): Promise<PutAttachedResponse | undefined>;
    putIfNotExists(doc: PutDocument): Promise<PutResponse | undefined>;
    query(conditions: Conditions, options?: QueryOptions): Promise<ExistingDocuments>;
    queryAttached(conditions: Conditions, parentConditions?: Conditions, options?: QueryOptions): Promise<ExistingAttachedDocuments>;
    reset(callback?: ResetCallback): Promise<void>;
    subscribe(handler: ChangesHandler): Promise<Symbol>;
    subscribeAttached(handler: AttachedChangesHandler): Promise<Symbol>;
    unsettled(conditions: Conditions, options?: QueryOptions): Promise<number>;
    unsettledAttached(conditions: Conditions, parentConditions?: Conditions, options?: QueryOptions): Promise<number>;
    unsubscribe(id: Symbol): Promise<void>;
    unsubscribeAttached(id: Symbol): Promise<void>;
    protected changes: Changes | undefined;
    protected changesHandlersAttachedPool: Map<Symbol, AttachedChangesHandler>;
    protected changesHandlersPool: Map<Symbol, ChangesHandler>;
    protected config: Required<Configuration>;
    protected db: PouchDBProxy | undefined;
    protected name: string;
    protected options: Required<DatabaseOptions>;
    protected pouchConfig: PouchDatabaseConfiguration;
    /**
     * Returns PouchDBProxy instance.
     *
     * @returns PouchDBProxy instance.
     */
    protected getDb(): Promise<PouchDBProxy>;
    /**
     * Creates map/reduce.
     *
     * @param options - Options.
     * @param rawQueryOptions - Raw query options.
     * @returns Map/reduce.
     */
    protected mapReduce(options: QueryOptions, rawQueryOptions: RawQueryOptions): MapReduce;
    /**
     * Creates map/reduce.
     *
     * @param options - Options.
     * @param rawQueryOptions - Raw query options.
     * @returns Map/reduce.
     */
    protected mapReduceAttached(options: QueryOptions, rawQueryOptions: RawQueryOptionsAttached): MapReduce;
    /**
     * Runs migrations.
     */
    protected migrate(): Promise<void>;
    /**
     * Performs database query.
     *
     * @param options - Options.
     * @param rawQueryOptions - Raw query options.
     * @returns Documents.
     */
    protected rawQuery(options: QueryOptions, rawQueryOptions: RawQueryOptions | RawQueryOptionsAttached): Promise<RawQueryResponse>;
    /**
     * Refreshes subscriptions.
     */
    protected refreshSubscription(): Promise<void>;
}
//# sourceMappingURL=Database.d.ts.map