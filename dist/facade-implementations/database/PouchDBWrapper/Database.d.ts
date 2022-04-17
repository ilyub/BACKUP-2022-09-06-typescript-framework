import { database } from "@skylib/facades";
import type { unknowns, Writable } from "@skylib/functions";
import type { Changes, PouchDatabase, PouchDatabaseConfiguration } from "./PouchDBProxy";
import { PouchDBProxy } from "./PouchDBProxy";
export declare const handlers: Readonly<{
    error(error: unknown): void;
}>;
export declare class Database implements database.Database {
    /**
     * Creates class instance.
     *
     * @param name - Database name.
     * @param options - Database options.
     * @param config - Configuration.
     * @param pouchConfig - PouchDB configuration.
     */
    constructor(name: string, options?: database.DatabaseOptions, config?: Configuration, pouchConfig?: PouchDatabaseConfiguration);
    bulkDocs(docs: database.PutDocuments): Promise<database.PutResponses>;
    bulkDocsAttached(docs: database.BulkAttachedDocuments): Promise<database.PutAttachedResponses>;
    count(conditions?: database.Conditions): Promise<number>;
    countAttached(conditions?: database.Conditions, parentConditions?: database.Conditions): Promise<number>;
    exists(id: string): Promise<boolean>;
    existsAttached(id: number, parentId: string): Promise<boolean>;
    get(id: string): Promise<database.ExistingDocument>;
    getAttached(id: number, parentId: string): Promise<database.ExistingAttachedDocument>;
    getIfExists(id: string): Promise<database.ExistingDocument | undefined>;
    getIfExistsAttached(id: number, parentId: string): Promise<database.ExistingAttachedDocument | undefined>;
    /**
     * Returns original PouchDB database.
     *
     * @returns Original PouchDB database.
     */
    getRawDb(): Promise<PouchDatabase>;
    put(doc: database.PutDocument): Promise<database.PutResponse>;
    putAttached(parentId: string, doc: database.PutAttachedDocument): Promise<database.PutAttachedResponse>;
    putAttachedBulk(parentId: string, docs: database.PutAttachedDocuments): Promise<database.PutAttachedResponses>;
    putIfNotExists(doc: database.PutDocument): Promise<database.PutResponse | undefined>;
    putIfNotExistsAttached(parentId: string, doc: database.PutAttachedDocument): Promise<database.PutAttachedResponse | undefined>;
    query(conditions?: database.Conditions, options?: database.QueryOptions): Promise<database.ExistingDocuments>;
    queryAttached(conditions?: database.Conditions, parentConditions?: database.Conditions, options?: database.QueryOptions): Promise<database.ExistingAttachedDocuments>;
    reactiveCount(config: database.ReactiveConfig): database.ReactiveResponse<number>;
    reactiveCountAttached(config: database.ReactiveConfigAttached): database.ReactiveResponse<number>;
    reactiveExists(id: string): database.ReactiveResponse<boolean>;
    reactiveExistsAttached(id: number, parentId: string): database.ReactiveResponse<boolean>;
    reactiveGet(id: string): database.ReactiveResponse<database.ExistingDocument>;
    reactiveGetAttached(id: number, parentId: string): database.ReactiveResponse<database.ExistingAttachedDocument>;
    reactiveGetIfExists(id: string): database.ReactiveResponse<database.ExistingDocument | undefined>;
    reactiveGetIfExistsAttached(id: number, parentId: string): database.ReactiveResponse<database.ExistingAttachedDocument | undefined>;
    reactiveQuery(config: database.ReactiveConfig): database.ReactiveResponse<database.ExistingDocuments>;
    reactiveQueryAttached(config: database.ReactiveConfigAttached): database.ReactiveResponse<database.ExistingAttachedDocuments>;
    reactiveUnsettled(config: database.ReactiveConfig): database.ReactiveResponse<number>;
    reactiveUnsettledAttached(config: database.ReactiveConfigAttached): database.ReactiveResponse<number>;
    reset(callback?: database.ResetCallback): Promise<void>;
    subscribe(handler: database.ChangesHandler): database.SubscriptionId;
    subscribeAttached(handler: database.AttachedChangesHandler): database.AttachedSubscriptionId;
    unsettled(conditions?: database.Conditions, options?: database.QueryOptions): Promise<number>;
    unsettledAttached(conditions?: database.Conditions, parentConditions?: database.Conditions, options?: database.QueryOptions): Promise<number>;
    unsubscribe(id: database.SubscriptionId): void;
    unsubscribeAttached(id: database.AttachedSubscriptionId): void;
    protected changes: Changes | undefined;
    protected readonly changesHandlersAttachedPool: Map<`attached-subscription-id-${string}`, database.AttachedChangesHandler>;
    protected readonly changesHandlersPool: Map<`subscription-id-${string}`, database.ChangesHandler>;
    protected readonly config: Required<Configuration>;
    protected db: PouchDBProxy | undefined;
    protected readonly name: string;
    protected readonly options: Required<database.DatabaseOptions>;
    protected readonly pouchConfig: PouchDatabaseConfiguration;
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
    protected mapReduce(options: database.QueryOptions, rawQueryOptions: RawQueryOptions): MapReduce;
    /**
     * Creates map/reduce.
     *
     * @param options - Options.
     * @param rawQueryOptions - Raw query options.
     * @returns Map/reduce.
     */
    protected mapReduceAttached(options: database.QueryOptions, rawQueryOptions: RawQueryOptionsAttached): MapReduce;
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
    protected rawQuery(options: database.QueryOptions, rawQueryOptions: RawQueryOptions | RawQueryOptionsAttached): Promise<RawQueryResponse>;
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param handler - Handler.
     * @returns Reactive response.
     */
    protected reactiveFactoryGet<T>(request: Promise<T>, handler: ReactiveHandler<T>): database.ReactiveResponse<T>;
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param handler - Handler.
     * @param result - Reactive result.
     * @returns Reactive response.
     */
    protected reactiveFactoryGetAsync<T>(request: Promise<T>, handler: ReactiveHandler<T>, result: Writable<database.ReactiveResponse<T>>): Promise<database.ReactiveResponseLoaded<T>>;
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param handler - Handler.
     * @returns Reactive response.
     */
    protected reactiveFactoryGetAttached<T>(request: Promise<T>, handler: ReactiveHandlerAttached<T>): database.ReactiveResponse<T>;
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param handler - Handler.
     * @param result - Reactive result.
     * @returns Reactive response.
     */
    protected reactiveFactoryGetAttachedAsync<T>(request: Promise<T>, handler: ReactiveHandlerAttached<T>, result: Writable<database.ReactiveResponse<T>>): Promise<database.ReactiveResponseLoaded<T>>;
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param config - Configuration.
     * @returns Reactive response.
     */
    protected reactiveFactoryQuery<T>(request: ReactiveRequest<T>, config: database.ReactiveConfig): database.ReactiveResponse<T>;
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param config - Configuration.
     * @param result - Reactive result.
     * @returns Reactive response.
     */
    protected reactiveFactoryQueryAsync<T>(request: ReactiveRequest<T>, config: database.ReactiveConfig, result: Writable<database.ReactiveResponse<T>>): Promise<database.ReactiveResponseLoaded<T>>;
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param config - Configuration.
     * @returns Reactive response.
     */
    protected reactiveFactoryQueryAttached<T>(request: ReactiveRequestAttached<T>, config: database.ReactiveConfigAttached): database.ReactiveResponse<T>;
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param config - Configuration.
     * @param result - Reactive result.
     * @returns Reactive response.
     */
    protected reactiveFactoryQueryAttachedAsync<T>(request: ReactiveRequestAttached<T>, config: database.ReactiveConfigAttached, result: Writable<database.ReactiveResponse<T>>): Promise<database.ReactiveResponseLoaded<T>>;
    /**
     * Reactive handler factory.
     *
     * @param id - ID.
     * @returns Reactive handler.
     */
    protected reactiveHandlerExists(id: string): ReactiveHandler<boolean>;
    /**
     * Reactive handler factory.
     *
     * @param id - ID.
     * @param parentId - Parent ID.
     * @returns Reactive handler.
     */
    protected reactiveHandlerExistsAttached(id: number, parentId: string): ReactiveHandlerAttached<boolean>;
    /**
     * Reactive handler factory.
     *
     * @param id - ID.
     * @returns Reactive handler.
     */
    protected reactiveHandlerGet(id: string): ReactiveHandler<database.ExistingDocument>;
    /**
     * Reactive handler factory.
     *
     * @param id - ID.
     * @param parentId - Parent ID.
     * @returns Reactive handler.
     */
    protected reactiveHandlerGetAttached(id: number, parentId: string): ReactiveHandlerAttached<database.ExistingAttachedDocument>;
    /**
     * Reactive handler factory.
     *
     * @param id - ID.
     * @param parentId - Parent ID.
     * @returns Reactive handler.
     */
    protected reactiveHandlerGetAttachedIfExists(id: number, parentId: string): ReactiveHandlerAttached<database.ExistingAttachedDocument | undefined>;
    /**
     * Reactive handler factory.
     *
     * @param id - ID.
     * @returns Reactive handler.
     */
    protected reactiveHandlerGetIfExists(id: string): ReactiveHandler<database.ExistingDocument | undefined>;
    /**
     * Refreshes subscriptions.
     */
    protected refreshSubscription(): void;
}
export interface Configuration {
    readonly reindexThreshold?: number;
}
export interface Filter {
    /**
     * Filter function.
     *
     * @param doc - Document.
     * @returns Result.
     */
    (doc: unknown): boolean;
}
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
    readonly conditions: database.Conditions;
    readonly count?: true;
    readonly docs?: true;
    readonly unsettledCount?: true;
}
export interface RawQueryOptionsAttached extends RawQueryOptions {
    readonly parentConditions: database.Conditions;
}
export interface RawQueryResponse {
    readonly count: number;
    readonly docs: unknowns;
    readonly mapReduce: MapReduce;
    readonly unsettledCount: number;
}
export interface ReactiveHandler<T> {
    /**
     * Reactive handler.
     *
     * @param doc - Document.
     * @param mutableResult - Mutable result.
     */
    (doc: database.ExistingDocument, mutableResult: Writable<database.ReactiveResponseLoaded<T>>): void;
}
export interface ReactiveHandlerAttached<T> {
    /**
     * Reactive handler.
     *
     * @param doc - Document.
     * @param mutableResult - Mutable result.
     */
    (doc: database.ExistingAttachedDocument, mutableResult: Writable<database.ReactiveResponseLoaded<T>>): void;
}
export interface ReactiveRequest<T> {
    /**
     * Reactive request.
     *
     * @param conditions - Conditions.
     * @param options - Options.
     * @returns Promise.
     */
    (conditions?: database.Conditions, options?: database.QueryOptions): Promise<T>;
}
export interface ReactiveRequestAttached<T> {
    /**
     * Reactive request.
     *
     * @param conditions - Conditions.
     * @param parentConditions - Parent conditions.
     * @param options - Options.
     * @returns Promise.
     */
    (conditions?: database.Conditions, parentConditions?: database.Conditions, options?: database.QueryOptions): Promise<T>;
}
/**
 * Wraps error.
 *
 * @param e - Error.
 * @returns Wrapped error.
 */
export declare function wrapError<T>(e: T): () => T;
//# sourceMappingURL=Database.d.ts.map