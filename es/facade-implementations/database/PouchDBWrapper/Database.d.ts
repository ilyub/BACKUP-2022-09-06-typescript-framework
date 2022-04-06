import type { AttachedChangesHandler, AttachedSubscriptionId, BulkAttachedDocuments, ChangesHandler, Conditions, Database as DatabaseInterface, DatabaseOptions, ExistingAttachedDocument, ExistingAttachedDocuments, ExistingDocument, ExistingDocuments, PutAttachedDocument, PutAttachedDocuments, PutAttachedResponse, PutAttachedResponses, PutDocument, PutDocuments, PutResponse, PutResponses, QueryOptions, ReactiveConfig, ReactiveConfigAttached, ReactiveResponse, ReactiveResponseLoaded, ResetCallback, SubscriptionId } from "@skylib/facades/es/database";
import type { unknowns, Writable } from "@skylib/functions/es/types/core";
import type { Changes, PouchDatabase, PouchDatabaseConfiguration } from "./PouchDBProxy";
import { PouchDBProxy } from "./PouchDBProxy";
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
    readonly docs: unknowns;
    readonly mapReduce: MapReduce;
    readonly unsettledCount: number;
}
export interface ReactiveRequest<T> {
    /**
     * Reactive request.
     *
     * @param conditions - Conditions.
     * @param options - Options.
     * @returns Promise.
     */
    (conditions?: Conditions, options?: QueryOptions): Promise<T>;
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
    (conditions?: Conditions, parentConditions?: Conditions, options?: QueryOptions): Promise<T>;
}
export interface ReactiveHandler<T> {
    /**
     * Reactive handler.
     *
     * @param doc - Document.
     * @param mutableResult - Mutable result.
     */
    (doc: ExistingDocument, mutableResult: Writable<ReactiveResponseLoaded<T>>): void;
}
export interface ReactiveHandlerAttached<T> {
    /**
     * Reactive handler.
     *
     * @param doc - Document.
     * @param mutableResult - Mutable result.
     */
    (doc: ExistingAttachedDocument, mutableResult: Writable<ReactiveResponseLoaded<T>>): void;
}
export declare const handlers: Readonly<{
    error(error: unknown): void;
}>;
/**
 * Wraps error.
 *
 * @param e - Error.
 * @returns Wrapped error.
 */
export declare function wrapError<T>(e: T): () => T;
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
    bulkDocsAttached(docs: BulkAttachedDocuments): Promise<PutAttachedResponses>;
    count(conditions?: Conditions): Promise<number>;
    countAttached(conditions?: Conditions, parentConditions?: Conditions): Promise<number>;
    exists(id: string): Promise<boolean>;
    existsAttached(id: number, parentId: string): Promise<boolean>;
    get(id: string): Promise<ExistingDocument>;
    getAttached(id: number, parentId: string): Promise<ExistingAttachedDocument>;
    getIfExists(id: string): Promise<ExistingDocument | undefined>;
    getIfExistsAttached(id: number, parentId: string): Promise<ExistingAttachedDocument | undefined>;
    /**
     * Returns original PouchDB database.
     *
     * @returns Original PouchDB database.
     */
    getRawDb(): Promise<PouchDatabase>;
    put(doc: PutDocument): Promise<PutResponse>;
    putAttached(parentId: string, doc: PutAttachedDocument): Promise<PutAttachedResponse>;
    putAttachedBulk(parentId: string, docs: PutAttachedDocuments): Promise<PutAttachedResponses>;
    putIfNotExists(doc: PutDocument): Promise<PutResponse | undefined>;
    putIfNotExistsAttached(parentId: string, doc: PutAttachedDocument): Promise<PutAttachedResponse | undefined>;
    query(conditions?: Conditions, options?: QueryOptions): Promise<ExistingDocuments>;
    queryAttached(conditions?: Conditions, parentConditions?: Conditions, options?: QueryOptions): Promise<ExistingAttachedDocuments>;
    reactiveCount(config: ReactiveConfig): ReactiveResponse<number>;
    reactiveCountAttached(config: ReactiveConfigAttached): ReactiveResponse<number>;
    reactiveExists(id: string): ReactiveResponse<boolean>;
    reactiveExistsAttached(id: number, parentId: string): ReactiveResponse<boolean>;
    reactiveGet(id: string): ReactiveResponse<ExistingDocument>;
    reactiveGetAttached(id: number, parentId: string): ReactiveResponse<ExistingAttachedDocument>;
    reactiveGetIfExists(id: string): ReactiveResponse<ExistingDocument | undefined>;
    reactiveGetIfExistsAttached(id: number, parentId: string): ReactiveResponse<ExistingAttachedDocument | undefined>;
    reactiveQuery(config: ReactiveConfig): ReactiveResponse<ExistingDocuments>;
    reactiveQueryAttached(config: ReactiveConfigAttached): ReactiveResponse<ExistingAttachedDocuments>;
    reactiveUnsettled(config: ReactiveConfig): ReactiveResponse<number>;
    reactiveUnsettledAttached(config: ReactiveConfigAttached): ReactiveResponse<number>;
    reset(callback?: ResetCallback): Promise<void>;
    subscribe(handler: ChangesHandler): SubscriptionId;
    subscribeAttached(handler: AttachedChangesHandler): AttachedSubscriptionId;
    unsettled(conditions?: Conditions, options?: QueryOptions): Promise<number>;
    unsettledAttached(conditions?: Conditions, parentConditions?: Conditions, options?: QueryOptions): Promise<number>;
    unsubscribe(id: SubscriptionId): void;
    unsubscribeAttached(id: AttachedSubscriptionId): void;
    protected changes: Changes | undefined;
    protected changesHandlersAttachedPool: Map<`attached-subscription-id-${string}`, AttachedChangesHandler>;
    protected changesHandlersPool: Map<`subscription-id-${string}`, ChangesHandler>;
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
     * Reactive factory.
     *
     * @param request - Request.
     * @param handler - Handler.
     * @returns Reactive response.
     */
    protected reactiveFactoryGet<T>(request: Promise<T>, handler: ReactiveHandler<T>): ReactiveResponse<T>;
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param handler - Handler.
     * @param result - Reactive result.
     * @returns Reactive response.
     */
    protected reactiveFactoryGetAsync<T>(request: Promise<T>, handler: ReactiveHandler<T>, result: Writable<ReactiveResponse<T>>): Promise<ReactiveResponseLoaded<T>>;
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param handler - Handler.
     * @returns Reactive response.
     */
    protected reactiveFactoryGetAttached<T>(request: Promise<T>, handler: ReactiveHandlerAttached<T>): ReactiveResponse<T>;
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param handler - Handler.
     * @param result - Reactive result.
     * @returns Reactive response.
     */
    protected reactiveFactoryGetAttachedAsync<T>(request: Promise<T>, handler: ReactiveHandlerAttached<T>, result: Writable<ReactiveResponse<T>>): Promise<ReactiveResponseLoaded<T>>;
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param config - Configuration.
     * @returns Reactive response.
     */
    protected reactiveFactoryQuery<T>(request: ReactiveRequest<T>, config: ReactiveConfig): ReactiveResponse<T>;
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param config - Configuration.
     * @param result - Reactive result.
     * @returns Reactive response.
     */
    protected reactiveFactoryQueryAsync<T>(request: ReactiveRequest<T>, config: ReactiveConfig, result: Writable<ReactiveResponse<T>>): Promise<ReactiveResponseLoaded<T>>;
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param config - Configuration.
     * @returns Reactive response.
     */
    protected reactiveFactoryQueryAttached<T>(request: ReactiveRequestAttached<T>, config: ReactiveConfigAttached): ReactiveResponse<T>;
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param config - Configuration.
     * @param result - Reactive result.
     * @returns Reactive response.
     */
    protected reactiveFactoryQueryAttachedAsync<T>(request: ReactiveRequestAttached<T>, config: ReactiveConfigAttached, result: Writable<ReactiveResponse<T>>): Promise<ReactiveResponseLoaded<T>>;
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
    protected reactiveHandlerGet(id: string): ReactiveHandler<ExistingDocument>;
    /**
     * Reactive handler factory.
     *
     * @param id - ID.
     * @param parentId - Parent ID.
     * @returns Reactive handler.
     */
    protected reactiveHandlerGetAttached(id: number, parentId: string): ReactiveHandlerAttached<ExistingAttachedDocument>;
    /**
     * Reactive handler factory.
     *
     * @param id - ID.
     * @param parentId - Parent ID.
     * @returns Reactive handler.
     */
    protected reactiveHandlerGetAttachedIfExists(id: number, parentId: string): ReactiveHandlerAttached<ExistingAttachedDocument | undefined>;
    /**
     * Reactive handler factory.
     *
     * @param id - ID.
     * @returns Reactive handler.
     */
    protected reactiveHandlerGetIfExists(id: string): ReactiveHandler<ExistingDocument | undefined>;
    /**
     * Refreshes subscriptions.
     */
    protected refreshSubscription(): void;
}
//# sourceMappingURL=Database.d.ts.map