import { PouchProxy } from "./PouchProxy";
import {
  PouchConflictError,
  PouchNotFoundError,
  PouchRetryError,
  extractAttachedDoc,
  extractDoc,
  getMapReduce,
  getMapReduceAttached,
  isDocsResponse,
  isExistingAttachedDocument,
  isExistingDocument,
  validatePutDocument
} from "./core";
import { database, handlePromise, reactiveStorage } from "@skylib/facades";
import {
  Accumulator,
  ErrorArg,
  a,
  assert,
  evaluate,
  fn,
  is,
  num,
  o,
  programFlow
} from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import { collate } from "pouchdb-collate";
import type {
  Configuration,
  MapReduce,
  PouchChanges,
  PouchDatabase,
  PouchDatabaseConfiguration,
  RawQueryOptions,
  RawQueryOptionsAttached,
  RawQueryResponse,
  ReactiveHandler,
  ReactiveHandlerAttached,
  ReactiveRequest,
  ReactiveRequestAttached
} from "./core";
import type { Writable, numberU, numbers, unknowns } from "@skylib/functions";

export class Database implements database.Database {
  /**
   * Creates class instance.
   *
   * @param name - Database name.
   * @param options - Database options.
   * @param config - Configuration.
   * @param pouchConfig - PouchDB configuration.
   */
  public constructor(
    name: string,
    options: database.DatabaseOptions = {},
    config: Configuration = {},
    pouchConfig: PouchDatabaseConfiguration = {}
  ) {
    const defaultOptions = {
      caseSensitiveSorting: false,
      migrations: [],
      retries: 0
    };

    const defaultConfig = { reindexThreshold: 1 };

    this.name = name;
    this.options = { ...defaultOptions, ...options };
    this.config = { ...defaultConfig, ...config };
    this.pouchConfig = pouchConfig;
  }

  public async bulkDocs(
    docs: database.PutDocuments
  ): Promise<database.PutResponses> {
    for (const doc of docs) validatePutDocument(doc);

    docs = docs.map(doc => o.omit(doc, "lastAttachedDocs"));

    const db = await this.getDb();

    const responses = await db.bulkDocs(docs);

    return responses
      .map(response =>
        "ok" in response && response.ok
          ? _.pick(response, ["id", "rev"])
          : undefined
      )
      .filter(is.not.empty);
  }

  public async bulkDocsAttached(
    docs: database.BulkAttachedDocuments
  ): Promise<database.PutAttachedResponses> {
    const groups = new Accumulator<string, database.BulkAttachedDocument>();

    for (const doc of docs) groups.push(doc.parentDoc._id, doc);

    const responses = await Promise.all(
      a
        .fromIterable(groups)
        .map(
          async ([parentId, group]) =>
            await this.putAttachedBulk(parentId, group)
        )
    );

    return responses.flat();
  }

  public async count(conditions: database.Conditions = {}): Promise<number> {
    const response = await this.rawQuery({}, { conditions, count: true });

    return response.count;
  }

  public async countAttached(
    conditions: database.Conditions = {},
    parentConditions: database.Conditions = {}
  ): Promise<number> {
    const response = await this.rawQuery(
      {},
      {
        conditions,
        count: true,
        parentConditions
      }
    );

    return response.count;
  }

  public async exists(id: string): Promise<boolean> {
    const doc = await this.getIfExists(id);

    return is.not.empty(doc);
  }

  public async existsAttached(id: number, parentId: string): Promise<boolean> {
    const doc = await this.getIfExistsAttached(id, parentId);

    return is.not.empty(doc);
  }

  public async get(id: string): Promise<database.ExistingDocument> {
    const db = await this.getDb();

    const doc = await db.get(id);

    return extractDoc(doc);
  }

  public async getAttached(
    id: number,
    parentId: string
  ): Promise<database.ExistingAttachedDocument> {
    const db = await this.getDb();

    const doc = await db.get(parentId);

    const attachedDoc = extractAttachedDoc(doc, id);

    assert.not.empty(
      attachedDoc,
      () => new PouchNotFoundError("Missing attached document")
    );

    return attachedDoc;
  }

  public async getIfExists(
    id: string
  ): Promise<database.ExistingDocument | undefined> {
    try {
      return await this.get(id);
    } catch (error) {
      assert.instance(error, PouchNotFoundError, ErrorArg.wrapError(error));

      return undefined;
    }
  }

  public async getIfExistsAttached(
    id: number,
    parentId: string
  ): Promise<database.ExistingAttachedDocument | undefined> {
    try {
      return await this.getAttached(id, parentId);
    } catch (error) {
      assert.instance(error, PouchNotFoundError, ErrorArg.wrapError(error));

      return undefined;
    }
  }

  /**
   * Returns original PouchDB database.
   *
   * @returns Original PouchDB database.
   */
  public async getRawDb(): Promise<PouchDatabase> {
    const db = await this.getDb();

    return db.getRawDb();
  }

  public async put(doc: database.PutDocument): Promise<database.PutResponse> {
    validatePutDocument(doc);

    const db = await this.getDb();

    if (doc.attachedDocs && doc.attachedDocs.length === 0) {
      assert.not.empty(doc._id);
      assert.not.empty(doc._rev);

      const storedDoc = await db.get(doc._id);

      assert.not.empty(storedDoc.attachedDocs);
      doc = { ...doc, attachedDocs: storedDoc.attachedDocs };
    }

    const response = await db.post(o.omit(doc, "lastAttachedDocs"));

    assert.toBeTrue(response.ok);

    return _.pick(response, ["id", "rev"]);
  }

  public async putAttached(
    parentId: string,
    doc: database.PutAttachedDocument
  ): Promise<database.PutAttachedResponse> {
    return a.first(await this.putAttachedBulk(parentId, [doc]));
  }

  public async putAttachedBulk(
    parentId: string,
    docs: database.PutAttachedDocuments
  ): Promise<database.PutAttachedResponses> {
    for (let i = 0; i < 1 + this.options.retries; i++) {
      // eslint-disable-next-line no-await-in-loop -- Ok
      const result = await this._putAttachedBulk(parentId, docs);

      if (result) return result;
    }

    throw new PouchRetryError(`Failed after ${this.options.retries} retries`);
  }

  public async putIfNotExists(
    doc: database.PutDocument
  ): Promise<database.PutResponse | undefined> {
    try {
      return await this.put(doc);
    } catch (error) {
      assert.instance(error, PouchConflictError, ErrorArg.wrapError(error));

      return undefined;
    }
  }

  public async putIfNotExistsAttached(
    parentId: string,
    doc: database.PutAttachedDocument
  ): Promise<database.PutAttachedResponse | undefined> {
    try {
      return await this.putAttached(parentId, doc);
    } catch (error) {
      assert.instance(error, PouchConflictError, ErrorArg.wrapError(error));

      return undefined;
    }
  }

  public async query(
    conditions: database.Conditions = {},
    options: database.QueryOptions = {}
  ): Promise<database.ExistingDocuments> {
    const response = await this.rawQuery(options, { conditions, docs: true });

    assert.array.of(response.docs, isExistingDocument);

    return response.docs;
  }

  public async queryAttached(
    conditions: database.Conditions = {},
    parentConditions: database.Conditions = {},
    options: database.QueryOptions = {}
  ): Promise<database.ExistingAttachedDocuments> {
    const response = await this.rawQuery(options, {
      conditions,
      docs: true,
      parentConditions
    });

    assert.array.of(response.docs, isExistingAttachedDocument);

    return response.docs;
  }

  public reactiveCount(
    config: database.ReactiveConfig
  ): database.ReactiveResponse<number> {
    return this.reactiveFactoryQuery(this.count.bind(this), config);
  }

  public reactiveCountAttached(
    config: database.ReactiveConfigAttached
  ): database.ReactiveResponse<number> {
    return this.reactiveFactoryQueryAttached(
      this.countAttached.bind(this),
      config
    );
  }

  public reactiveExists(id: string): database.ReactiveResponse<boolean> {
    return this.reactiveFactoryGet(this.exists(id), (doc, result): void => {
      if (doc._id === id) result.value = !doc._deleted;
    });
  }

  public reactiveExistsAttached(
    id: number,
    parentId: string
  ): database.ReactiveResponse<boolean> {
    return this.reactiveFactoryGetAttached(
      this.existsAttached(id, parentId),
      (doc, result): void => {
        if (doc._id === id && doc.parentDoc._id === parentId)
          result.value = !doc._deleted;
      }
    );
  }

  public reactiveGet(
    id: string
  ): database.ReactiveResponse<database.ExistingDocument> {
    return this.reactiveFactoryGet(this.get(id), (doc, result): void => {
      if (doc._id === id)
        if (doc._deleted) throw new PouchNotFoundError("Missing document");
        else result.value = doc;
    });
  }

  public reactiveGetAttached(
    id: number,
    parentId: string
  ): database.ReactiveResponse<database.ExistingAttachedDocument> {
    return this.reactiveFactoryGetAttached(
      this.getAttached(id, parentId),
      (doc, result): void => {
        if (doc._id === id && doc.parentDoc._id === parentId)
          if (doc._deleted)
            throw new PouchNotFoundError("Missing attached document");
          else result.value = doc;
      }
    );
  }

  public reactiveGetIfExists(
    id: string
  ): database.ReactiveResponse<database.ExistingDocument | undefined> {
    return this.reactiveFactoryGet(
      this.getIfExists(id),
      (doc, result): void => {
        if (doc._id === id) result.value = doc._deleted ? undefined : doc;
      }
    );
  }

  public reactiveGetIfExistsAttached(
    id: number,
    parentId: string
  ): database.ReactiveResponse<database.ExistingAttachedDocument | undefined> {
    return this.reactiveFactoryGetAttached(
      this.getIfExistsAttached(id, parentId),
      (doc, result): void => {
        if (doc._id === id && doc.parentDoc._id === parentId)
          result.value = doc._deleted ? undefined : doc;
      }
    );
  }

  public reactiveQuery(
    config: database.ReactiveConfig
  ): database.ReactiveResponse<database.ExistingDocuments> {
    return this.reactiveFactoryQuery(this.query.bind(this), config);
  }

  public reactiveQueryAttached(
    config: database.ReactiveConfigAttached
  ): database.ReactiveResponse<database.ExistingAttachedDocuments> {
    return this.reactiveFactoryQueryAttached(
      this.queryAttached.bind(this),
      config
    );
  }

  public reactiveUnsettled(
    config: database.ReactiveConfig
  ): database.ReactiveResponse<number> {
    return this.reactiveFactoryQuery(this.unsettled.bind(this), config);
  }

  public reactiveUnsettledAttached(
    config: database.ReactiveConfigAttached
  ): database.ReactiveResponse<number> {
    return this.reactiveFactoryQueryAttached(
      this.unsettledAttached.bind(this),
      config
    );
  }

  public async reset(callback?: database.ResetCallback): Promise<void> {
    const db = await this.getDb();

    await db.destroy();
    this.db = undefined;
    this.refreshSubscription();
    await callback?.call(this);
    await this.getDb();
  }

  public subscribe(handler: database.ChangesHandler): database.SubscriptionId {
    const id = database.uniqueSubscriptionId();

    this.changesHandlers.set(id, handler);
    this.refreshSubscription();

    return id;
  }

  public subscribeAttached(
    handler: database.AttachedChangesHandler
  ): database.AttachedSubscriptionId {
    const id = database.uniqueAttachedSubscriptionId();

    this.changesHandlersAttached.set(id, handler);
    this.refreshSubscription();

    return id;
  }

  public async unsettled(
    conditions: database.Conditions = {},
    options: database.QueryOptions = {}
  ): Promise<number> {
    const response = await this.rawQuery(options, {
      conditions,
      unsettledCount: true
    });

    return response.unsettledCount;
  }

  public async unsettledAttached(
    conditions: database.Conditions = {},
    parentConditions: database.Conditions = {},
    options: database.QueryOptions = {}
  ): Promise<number> {
    const response = await this.rawQuery(options, {
      conditions,
      parentConditions,
      unsettledCount: true
    });

    return response.unsettledCount;
  }

  public unsubscribe(id: database.SubscriptionId): void {
    assert.toBeTrue(this.changesHandlers.has(id));
    this.changesHandlers.delete(id);
    this.refreshSubscription();
  }

  public unsubscribeAttached(id: database.AttachedSubscriptionId): void {
    assert.toBeTrue(this.changesHandlersAttached.has(id));
    this.changesHandlersAttached.delete(id);
    this.refreshSubscription();
  }

  // eslint-disable-next-line @skylib/no-restricted-syntax -- Ok
  protected changes: PouchChanges | undefined;

  protected readonly changesHandlers = new Map<
    database.SubscriptionId,
    database.ChangesHandler
  >();

  protected readonly changesHandlersAttached = new Map<
    database.AttachedSubscriptionId,
    database.AttachedChangesHandler
  >();

  protected readonly config: Required<Configuration>;

  /**
   * Creates reactive storage.
   *
   * @returns Reactive storage.
   */
  protected readonly createReactiveStorage = <
    T
  >(): database.ReactiveResponse<T> =>
    reactiveStorage({
      loaded: false,
      loading: true,
      refresh: fn.noop,
      unsubscribe: fn.noop
    });

  // eslint-disable-next-line @skylib/no-restricted-syntax -- Ok
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
  protected async _putAttachedBulk(
    parentId: string,
    docs: database.PutAttachedDocuments
  ): Promise<database.PutAttachedResponses | undefined> {
    const db = await this.getDb();

    const parentDoc = await db.get(parentId);

    const attachedDocs = parentDoc.attachedDocs
      ? a.clone(parentDoc.attachedDocs)
      : [];

    const lastAttachedDocs: Writable<numbers> = [];

    const result: Array<Omit<database.PutAttachedResponse, "parentRev">> = [];

    for (const doc of docs) {
      const { _id, _rev, parentDoc: omitParentDoc, ...content } = doc;

      if (is.not.empty(_id))
        if (_rev === a.get(attachedDocs, _id)._rev) {
          // Valid
        } else throw new PouchConflictError("Document update conflict");

      const id = _id ?? attachedDocs.length;

      const rev = is.not.empty(_rev) ? _rev + 1 : 1;

      attachedDocs[id] = {
        ...content,
        _id: id,
        _rev: rev
      };

      lastAttachedDocs.push(id);

      result.push({
        id,
        parentId,
        rev
      });
    }

    try {
      const response = await db.put({
        ...parentDoc,
        attachedDocs,
        lastAttachedDocs
      });

      assert.toBeTrue(response.ok, "Database request failed");

      return result.map(item => {
        return { ...item, parentRev: response.rev };
      });
    } catch (error) {
      assert.instance(error, PouchConflictError, ErrorArg.wrapError(error));

      return undefined;
    }
  }

  /**
   * Queries database.
   *
   * @param mapReduce - Map/reduce function.
   * @param options - Options.
   * @param queryOptions - Query options.
   * @returns Documents.
   */
  protected async _rawQuery(
    mapReduce: MapReduce,
    options: database.QueryOptions,
    queryOptions: RawQueryOptions | RawQueryOptionsAttached
  ): Promise<RawQueryResponse> {
    const db = await this.getDb();

    const descending = options.descending ?? false;

    const skip = options.skip ?? 0;

    const limit = options.limit ?? 1_000_000_000;

    const response = await db.query(`${mapReduce.id}/default`, {
      descending,
      group: true,
      group_level: mapReduce.groupLevel,
      limit: limit + skip
    });

    const toSettle = response.rows
      .map(row => row.value as unknown)
      .filter(isDocsResponse)
      .filter(group => !group.settled)
      .flatMap(group => group.docs)
      .map(doc => doc.doc)
      .filter(mapReduce.settle);

    if (toSettle.length >= this.config.reindexThreshold)
      await this.rebuildIndex(mapReduce);

    const groups = response.rows
      .map(row => row.value as unknown)
      .filter(isDocsResponse);

    return {
      count:
        queryOptions.count ?? false
          ? num.sum(
              ...groups.map(group =>
                group.settled
                  ? group.count
                  : group.docs.map(item => item.doc).filter(mapReduce.output)
                      .length
              )
            )
          : 0,
      docs:
        queryOptions.docs ?? false
          ? evaluate((): unknowns => {
              const items = groups
                .flatMap(group => group.docs)
                .filter(item => mapReduce.output(item.doc));

              items.sort((item1, item2) => collate(item1.key, item2.key));

              if (descending) items.reverse();

              return items.slice(skip, skip + limit).map(doc => doc.doc);
            })
          : [],
      mapReduce,
      unsettledCount:
        queryOptions.unsettledCount ?? false
          ? num.sum(
              0,
              ...groups
                .filter(group => !group.settled)
                .map(group => group.docs.length)
            )
          : 0
    };
  }

  /**
   * Rebuilds index.
   *
   * @param mapReduce - Map/reduce function.
   */
  protected async _rebuildIndex(mapReduce: MapReduce): Promise<boolean> {
    const db = await this.getDb();

    try {
      const doc = await db.get(`_design/${mapReduce.id}`);

      await db.put({ ...doc, views: { default: mapReduce.mapReduce } });

      return true;
    } catch (error) {
      assert.instance(error, PouchConflictError, ErrorArg.wrapError(error));

      return false;
    }
  }

  /**
   * Creates design document.
   *
   * @param mapReduce - Map/reduce function.
   */
  protected async createDesignDocument(mapReduce: MapReduce): Promise<void> {
    const db = await this.getDb();

    try {
      await db.put({
        _id: `_design/${mapReduce.id}`,
        views: { default: mapReduce.mapReduce }
      });
    } catch (error) {
      assert.instance(error, PouchConflictError, ErrorArg.wrapError(error));
    }
  }

  /**
   * Returns PouchProxy instance.
   *
   * @returns PouchProxy instance.
   */
  protected async getDb(): Promise<PouchProxy> {
    if (is.empty(this.db)) {
      this.db = new PouchProxy(this.name, this.pouchConfig);
      this.refreshSubscription();
      await this.migrate();
    }

    return this.db;
  }

  /**
   * Applies migrations.
   */
  protected async migrate(): Promise<void> {
    if (this.options.migrations.length > 0) {
      let migrations = await evaluate<database.PutDocument>(async () => {
        const result = await this.getIfExists("migrations");

        return result ?? { _id: "migrations" };
      });

      for (const migration of this.options.migrations)
        if (migrations[migration.id] === true) {
          // Already applied
        } else {
          // eslint-disable-next-line no-await-in-loop -- Ok
          await migration.callback(this);
          migrations = { ...migrations, [migration.id]: true };

          // eslint-disable-next-line no-await-in-loop -- Ok
          const { id, rev } = await this.put(migrations);

          migrations = {
            ...migrations,
            _id: id,
            _rev: rev
          };
        }
    }
  }

  /**
   * Queries database.
   *
   * @param options - Options.
   * @param queryOptions - Query options.
   * @returns Documents.
   */
  protected async rawQuery(
    options: database.QueryOptions,
    queryOptions: RawQueryOptions | RawQueryOptionsAttached
  ): Promise<RawQueryResponse> {
    const mapReduce =
      "parentConditions" in queryOptions
        ? getMapReduceAttached(
            options,
            queryOptions,
            this.options.caseSensitiveSorting
          )
        : getMapReduce(
            options,
            queryOptions,
            this.options.caseSensitiveSorting
          );

    try {
      return await this._rawQuery(mapReduce, options, queryOptions);
    } catch (error) {
      assert.instance(error, PouchNotFoundError, ErrorArg.wrapError(error));
      await this.createDesignDocument(mapReduce);

      return await this._rawQuery(mapReduce, options, queryOptions);
    }
  }

  /**
   * Reactive factory.
   *
   * @param request - Request.
   * @param handler - Handler.
   * @returns Reactive response.
   */
  protected reactiveFactoryGet<T>(
    request: Promise<T>,
    handler: ReactiveHandler<T>
  ): database.ReactiveResponse<T> {
    const result = this.createReactiveStorage<T>();

    handlePromise.silent(
      this.reactiveFactoryGetAsync(request, handler, result)
    );

    return result;
  }

  /**
   * Reactive factory.
   *
   * @param request - Request.
   * @param handler - Handler.
   * @param mutableResult - Reactive result.
   * @returns Reactive response.
   */
  protected async reactiveFactoryGetAsync<T>(
    request: Promise<T>,
    handler: ReactiveHandler<T>,
    mutableResult: Writable<database.ReactiveResponse<T>>
  ): Promise<database.ReactiveResponseLoaded<T>> {
    o.assign(mutableResult, {
      loaded: true,
      loading: false,
      unsubscribe: (): void => {
        this.unsubscribe(subscription);
      },
      value: await request
    });

    const subscription = this.subscribe(doc => {
      assert.toBeTrue(mutableResult.loaded);
      handler(doc, mutableResult);
    });

    assert.toBeTrue(mutableResult.loaded);

    return mutableResult;
  }

  /**
   * Reactive factory.
   *
   * @param request - Request.
   * @param handler - Handler.
   * @returns Reactive response.
   */
  protected reactiveFactoryGetAttached<T>(
    request: Promise<T>,
    handler: ReactiveHandlerAttached<T>
  ): database.ReactiveResponse<T> {
    const result = this.createReactiveStorage<T>();

    handlePromise.silent(
      this.reactiveFactoryGetAttachedAsync(request, handler, result)
    );

    return result;
  }

  /**
   * Reactive factory.
   *
   * @param request - Request.
   * @param handler - Handler.
   * @param mutableResult - Reactive result.
   * @returns Reactive response.
   */
  protected async reactiveFactoryGetAttachedAsync<T>(
    request: Promise<T>,
    handler: ReactiveHandlerAttached<T>,
    mutableResult: Writable<database.ReactiveResponse<T>>
  ): Promise<database.ReactiveResponseLoaded<T>> {
    o.assign(mutableResult, {
      loaded: true,
      loading: false,
      unsubscribe: (): void => {
        this.unsubscribeAttached(subscription);
      },
      value: await request
    });

    const subscription = this.subscribeAttached(doc => {
      assert.toBeTrue(mutableResult.loaded);
      handler(doc, mutableResult);
    });

    assert.toBeTrue(mutableResult.loaded);

    return mutableResult;
  }

  /**
   * Reactive factory.
   *
   * @param request - Request.
   * @param config - Configuration.
   * @returns Reactive response.
   */
  protected reactiveFactoryQuery<T>(
    request: ReactiveRequest<T>,
    config: database.ReactiveConfig
  ): database.ReactiveResponse<T> {
    const result = this.createReactiveStorage<T>();

    handlePromise.silent(
      this.reactiveFactoryQueryAsync(request, config, result)
    );

    return result;
  }

  /**
   * Reactive factory.
   *
   * @param request - Request.
   * @param config - Configuration.
   * @param mutableResult - Reactive result.
   * @returns Reactive response.
   */
  protected async reactiveFactoryQueryAsync<T>(
    request: ReactiveRequest<T>,
    config: database.ReactiveConfig,
    mutableResult: Writable<database.ReactiveResponse<T>>
  ): Promise<database.ReactiveResponseLoaded<T>> {
    config = reactiveStorage(config);

    o.assign(mutableResult, {
      loaded: true,
      loading: false,
      unsubscribe: (): void => {
        reactiveStorage.unwatch(config, observer);
        this.unsubscribe(subscription);
        programFlow.clearTimeout(timeout);
      },
      value: await request(config.conditions, config.options)
    });

    const observer = reactiveStorage.watch(config, refresh);

    const subscription = this.subscribe(doc => {
      if (config.update && config.update(doc)) refresh();
    });

    let timeout: numberU;

    updateTimeout();
    assert.toBeTrue(mutableResult.loaded);

    return mutableResult;

    function refresh(): void {
      handlePromise.silent(async () => {
        mutableResult.loading = true;
        mutableResult.value = await request(config.conditions, config.options);
        mutableResult.loading = false;
        updateTimeout();
      });
    }

    function updateTimeout(): void {
      programFlow.clearTimeout(timeout);
      timeout = is.not.empty(config.updateInterval)
        ? programFlow.setTimeout(refresh, config.updateInterval)
        : undefined;
    }
  }

  /**
   * Reactive factory.
   *
   * @param request - Request.
   * @param config - Configuration.
   * @returns Reactive response.
   */
  protected reactiveFactoryQueryAttached<T>(
    request: ReactiveRequestAttached<T>,
    config: database.ReactiveConfigAttached
  ): database.ReactiveResponse<T> {
    const result = this.createReactiveStorage<T>();

    handlePromise.silent(
      this.reactiveFactoryQueryAttachedAsync(request, config, result)
    );

    return result;
  }

  /**
   * Reactive factory.
   *
   * @param request - Request.
   * @param config - Configuration.
   * @param mutableResult - Reactive result.
   * @returns Reactive response.
   */
  protected async reactiveFactoryQueryAttachedAsync<T>(
    request: ReactiveRequestAttached<T>,
    config: database.ReactiveConfigAttached,
    mutableResult: Writable<database.ReactiveResponse<T>>
  ): Promise<database.ReactiveResponseLoaded<T>> {
    config = reactiveStorage(config);

    o.assign(mutableResult, {
      loaded: true,
      loading: false,
      unsubscribe: (): void => {
        reactiveStorage.unwatch(config, observer);
        this.unsubscribeAttached(subscription);
        programFlow.clearTimeout(timeout);
      },
      value: await request(
        config.conditions,
        config.parentConditions,
        config.options
      )
    });

    const observer = reactiveStorage.watch(config, refresh);

    const subscription = this.subscribeAttached(doc => {
      if (config.update && config.update(doc)) refresh();
    });

    let timeout: numberU;

    updateTimeout();
    assert.toBeTrue(mutableResult.loaded);

    return mutableResult;

    function refresh(): void {
      handlePromise.silent(async () => {
        mutableResult.loading = true;
        mutableResult.value = await request(
          config.conditions,
          config.parentConditions,
          config.options
        );
        mutableResult.loading = false;
        updateTimeout();
      });
    }

    function updateTimeout(): void {
      programFlow.clearTimeout(timeout);
      timeout = is.not.empty(config.updateInterval)
        ? programFlow.setTimeout(refresh, config.updateInterval)
        : undefined;
    }
  }

  /**
   * Rebuilds index.
   *
   * @param mapReduce - Map/reduce function.
   */
  protected async rebuildIndex(mapReduce: MapReduce): Promise<void> {
    for (let i = 0; i < 1 + this.options.retries; i++) {
      // eslint-disable-next-line no-await-in-loop -- Ok
      const result = await this._rebuildIndex(mapReduce);

      if (result) return;
    }

    throw new PouchRetryError(`Failed after ${this.options.retries} retries`);
  }

  /**
   * Refreshes subscriptions.
   */
  protected refreshSubscription(): void {
    if (
      this.db &&
      this.changesHandlers.size + this.changesHandlersAttached.size
    )
      if (this.changes) {
        // Nothing to do
      } else
        this.changes = this.db.changes(
          value => {
            assert.byGuard(value.doc, isExistingDocument);

            if (this.changesHandlers.size > 0) {
              const doc = extractDoc(value.doc);

              for (const handler of this.changesHandlers.values()) handler(doc);
            }

            if (
              this.changesHandlersAttached.size > 0 &&
              value.doc.lastAttachedDocs
            )
              for (const lastAttachedDoc of value.doc.lastAttachedDocs) {
                const attachedDoc = extractAttachedDoc(
                  value.doc,
                  lastAttachedDoc,
                  true
                );

                assert.not.empty(attachedDoc);

                for (const handler of this.changesHandlersAttached.values())
                  handler(attachedDoc);
              }
          },
          {
            include_docs: true,
            live: true,
            since: "now"
          }
        );
    else if (this.changes) {
      this.changes.cancel();
      this.changes = undefined;
    } else {
      // Nothing to do
    }
  }
}
