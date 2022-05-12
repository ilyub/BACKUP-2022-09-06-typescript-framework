import { PouchProxy } from "./PouchProxy";
import { database } from "@skylib/facades";
import type { ReactiveHandler, RawQueryOptions, RawQueryOptionsAttached, RawQueryResponse, Configuration, ReactiveHandlerAttached, ReactiveRequest, ReactiveRequestAttached, PouchChanges, PouchDatabase, PouchDatabaseConfiguration, MapReduce } from "./core";
import type { Writable } from "@skylib/functions";
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
    protected changes: PouchChanges | undefined;
    protected readonly changesHandlers: Map<`subscription-id-${string}`, database.ChangesHandler>;
    protected readonly changesHandlersAttached: Map<`attached-subscription-id-${string}`, database.AttachedChangesHandler>;
    protected readonly config: Required<Configuration>;
    protected db: PouchProxy | undefined;
    protected readonly name: string;
    protected readonly options: Required<database.DatabaseOptions>;
    protected readonly pouchConfig: PouchDatabaseConfiguration;
    /**
     * Puts attached documents.
     *
     * @param parentId - Parent ID.
     * @param docs - Attached documents.
     * @returns Responses.
     */
    protected _putAttachedBulk(parentId: string, docs: database.PutAttachedDocuments): Promise<database.PutAttachedResponses | undefined>;
    /**
     * Queries database.
     *
     * @param mapReduce - Map/reduce function.
     * @param options - Options.
     * @param queryOptions - Query options.
     * @returns Documents.
     */
    protected _rawQuery(mapReduce: MapReduce, options: database.QueryOptions, queryOptions: RawQueryOptions | RawQueryOptionsAttached): Promise<RawQueryResponse>;
    /**
     * Rebuilds index.
     *
     * @param mapReduce - Map/reduce function.
     */
    protected _rebuildIndex(mapReduce: MapReduce): Promise<boolean>;
    /**
     * Creates design document.
     *
     * @param mapReduce - Map/reduce function.
     */
    protected createDesignDocument(mapReduce: MapReduce): Promise<void>;
    /**
     * Creates reactive storage.
     *
     * @returns Reactive storage.
     */
    protected createReactiveStorage<T>(): database.ReactiveResponse<T>;
    /**
     * Returns PouchProxy instance.
     *
     * @returns PouchProxy instance.
     */
    protected getDb(): Promise<PouchProxy>;
    /**
     * Applies migrations.
     */
    protected migrate(): Promise<void>;
    /**
     * Queries database.
     *
     * @param options - Options.
     * @param queryOptions - Query options.
     * @returns Documents.
     */
    protected rawQuery(options: database.QueryOptions, queryOptions: RawQueryOptions | RawQueryOptionsAttached): Promise<RawQueryResponse>;
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
     * @param mutableResult - Reactive result.
     * @returns Reactive response.
     */
    protected reactiveFactoryGetAsync<T>(request: Promise<T>, handler: ReactiveHandler<T>, mutableResult: Writable<database.ReactiveResponse<T>>): Promise<database.ReactiveResponseLoaded<T>>;
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
     * @param mutableResult - Reactive result.
     * @returns Reactive response.
     */
    protected reactiveFactoryGetAttachedAsync<T>(request: Promise<T>, handler: ReactiveHandlerAttached<T>, mutableResult: Writable<database.ReactiveResponse<T>>): Promise<database.ReactiveResponseLoaded<T>>;
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
     * @param mutableResult - Reactive result.
     * @returns Reactive response.
     */
    protected reactiveFactoryQueryAsync<T>(request: ReactiveRequest<T>, config: database.ReactiveConfig, mutableResult: Writable<database.ReactiveResponse<T>>): Promise<database.ReactiveResponseLoaded<T>>;
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
     * @param mutableResult - Reactive result.
     * @returns Reactive response.
     */
    protected reactiveFactoryQueryAttachedAsync<T>(request: ReactiveRequestAttached<T>, config: database.ReactiveConfigAttached, mutableResult: Writable<database.ReactiveResponse<T>>): Promise<database.ReactiveResponseLoaded<T>>;
    /**
     * Rebuilds index.
     *
     * @param mapReduce - Map/reduce function.
     */
    protected rebuildIndex(mapReduce: MapReduce): Promise<void>;
    /**
     * Refreshes subscriptions.
     */
    protected refreshSubscription(): void;
}
//# sourceMappingURL=Database.d.ts.map