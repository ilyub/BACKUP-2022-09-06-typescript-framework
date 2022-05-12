import { __rest } from "tslib";
import { PouchProxy } from "./PouchProxy";
import { PouchConflictError, PouchNotFoundError, PouchRetryError, extractDoc, extractAttachedDoc, isDocsResponse, isExistingDocument, isExistingAttachedDocument, validatePutDocument, getMapReduceAttached, getMapReduce } from "./core";
import { database, handlePromise, reactiveStorage } from "@skylib/facades";
import { a, Accumulator, assert, fn, is, num, o, programFlow } from "@skylib/functions";
import * as _ from "@skylib/lodash-commonjs-es";
import { collate } from "pouchdb-collate";
export class Database {
    /**
     * Creates class instance.
     *
     * @param name - Database name.
     * @param options - Database options.
     * @param config - Configuration.
     * @param pouchConfig - PouchDB configuration.
     */
    constructor(name, options = {}, config = {}, pouchConfig = {}) {
        // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
        Object.defineProperty(this, "changes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "changesHandlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "changesHandlersAttached", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @skylib/prefer-readonly-props -- Ok
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pouchConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const defaultOptions = {
            caseSensitiveSorting: false,
            migrations: [],
            retries: 0
        };
        const defaultConfig = { reindexThreshold: 1 };
        this.name = name;
        this.options = Object.assign(Object.assign({}, defaultOptions), options);
        this.config = Object.assign(Object.assign({}, defaultConfig), config);
        this.pouchConfig = pouchConfig;
    }
    async bulkDocs(docs) {
        for (const doc of docs)
            validatePutDocument(doc);
        docs = docs.map(doc => o.omit(doc, "lastAttachedDocs"));
        const db = await this.getDb();
        const responses = await db.bulkDocs(docs);
        return responses
            .map(response => "ok" in response && response.ok
            ? _.pick(response, ["id", "rev"])
            : undefined)
            .filter(is.not.empty);
    }
    async bulkDocsAttached(docs) {
        const groups = new Accumulator();
        for (const doc of docs)
            groups.push(doc.parentDoc._id, doc);
        const responses = await Promise.all(a
            .fromIterable(groups)
            .map(async ([parentId, group]) => await this.putAttachedBulk(parentId, group)));
        return _.flatten(responses);
    }
    async count(conditions = {}) {
        const response = await this.rawQuery({}, { conditions, count: true });
        return response.count;
    }
    async countAttached(conditions = {}, parentConditions = {}) {
        const response = await this.rawQuery({}, {
            conditions,
            count: true,
            parentConditions
        });
        return response.count;
    }
    async exists(id) {
        const doc = await this.getIfExists(id);
        return is.not.empty(doc);
    }
    async existsAttached(id, parentId) {
        const doc = await this.getIfExistsAttached(id, parentId);
        return is.not.empty(doc);
    }
    async get(id) {
        const db = await this.getDb();
        const doc = await db.get(id);
        return extractDoc(doc);
    }
    async getAttached(id, parentId) {
        const db = await this.getDb();
        const doc = await db.get(parentId);
        const attachedDoc = extractAttachedDoc(doc, id);
        assert.not.empty(attachedDoc, () => new PouchNotFoundError("Missing attached document"));
        return attachedDoc;
    }
    async getIfExists(id) {
        try {
            return await this.get(id);
        }
        catch (e) {
            assert.instance(e, PouchNotFoundError, assert.wrapError(e));
            return undefined;
        }
    }
    async getIfExistsAttached(id, parentId) {
        try {
            return await this.getAttached(id, parentId);
        }
        catch (e) {
            assert.instance(e, PouchNotFoundError, assert.wrapError(e));
            return undefined;
        }
    }
    /**
     * Returns original PouchDB database.
     *
     * @returns Original PouchDB database.
     */
    async getRawDb() {
        const db = await this.getDb();
        return db.getRawDb();
    }
    async put(doc) {
        validatePutDocument(doc);
        const db = await this.getDb();
        if (doc.attachedDocs && doc.attachedDocs.length === 0) {
            assert.not.empty(doc._id);
            assert.not.empty(doc._rev);
            const storedDoc = await db.get(doc._id);
            assert.not.empty(storedDoc.attachedDocs);
            doc = Object.assign(Object.assign({}, doc), { attachedDocs: storedDoc.attachedDocs });
        }
        const response = await db.post(o.omit(doc, "lastAttachedDocs"));
        assert.toBeTrue(response.ok);
        return _.pick(response, ["id", "rev"]);
    }
    async putAttached(parentId, doc) {
        return a.first(await this.putAttachedBulk(parentId, [doc]));
    }
    async putAttachedBulk(parentId, docs) {
        for (let i = 0; i < 1 + this.options.retries; i++) {
            // eslint-disable-next-line no-await-in-loop -- Ok
            const result = await this._putAttachedBulk(parentId, docs);
            if (result)
                return result;
        }
        throw new PouchRetryError(`Failed after ${this.options.retries} retries`);
    }
    async putIfNotExists(doc) {
        try {
            return await this.put(doc);
        }
        catch (e) {
            assert.instance(e, PouchConflictError, assert.wrapError(e));
            return undefined;
        }
    }
    async putIfNotExistsAttached(parentId, doc) {
        try {
            return await this.putAttached(parentId, doc);
        }
        catch (e) {
            assert.instance(e, PouchConflictError, assert.wrapError(e));
            return undefined;
        }
    }
    async query(conditions = {}, options = {}) {
        const response = await this.rawQuery(options, { conditions, docs: true });
        assert.array.of(response.docs, isExistingDocument);
        return response.docs;
    }
    async queryAttached(conditions = {}, parentConditions = {}, options = {}) {
        const response = await this.rawQuery(options, {
            conditions,
            docs: true,
            parentConditions
        });
        assert.array.of(response.docs, isExistingAttachedDocument);
        return response.docs;
    }
    reactiveCount(config) {
        return this.reactiveFactoryQuery(this.count.bind(this), config);
    }
    reactiveCountAttached(config) {
        return this.reactiveFactoryQueryAttached(this.countAttached.bind(this), config);
    }
    reactiveExists(id) {
        return this.reactiveFactoryGet(this.exists(id), (doc, result) => {
            if (doc._id === id)
                result.value = !doc._deleted;
        });
    }
    reactiveExistsAttached(id, parentId) {
        return this.reactiveFactoryGetAttached(this.existsAttached(id, parentId), (doc, result) => {
            if (doc._id === id && doc.parentDoc._id === parentId)
                result.value = !doc._deleted;
        });
    }
    reactiveGet(id) {
        return this.reactiveFactoryGet(this.get(id), (doc, result) => {
            if (doc._id === id)
                if (doc._deleted)
                    throw new PouchNotFoundError("Missing document");
                else
                    result.value = doc;
        });
    }
    reactiveGetAttached(id, parentId) {
        return this.reactiveFactoryGetAttached(this.getAttached(id, parentId), (doc, result) => {
            if (doc._id === id && doc.parentDoc._id === parentId)
                if (doc._deleted)
                    throw new PouchNotFoundError("Missing attached document");
                else
                    result.value = doc;
        });
    }
    reactiveGetIfExists(id) {
        return this.reactiveFactoryGet(this.getIfExists(id), (doc, result) => {
            if (doc._id === id)
                result.value = doc._deleted ? undefined : doc;
        });
    }
    reactiveGetIfExistsAttached(id, parentId) {
        return this.reactiveFactoryGetAttached(this.getIfExistsAttached(id, parentId), (doc, result) => {
            if (doc._id === id && doc.parentDoc._id === parentId)
                result.value = doc._deleted ? undefined : doc;
        });
    }
    reactiveQuery(config) {
        return this.reactiveFactoryQuery(this.query.bind(this), config);
    }
    reactiveQueryAttached(config) {
        return this.reactiveFactoryQueryAttached(this.queryAttached.bind(this), config);
    }
    reactiveUnsettled(config) {
        return this.reactiveFactoryQuery(this.unsettled.bind(this), config);
    }
    reactiveUnsettledAttached(config) {
        return this.reactiveFactoryQueryAttached(this.unsettledAttached.bind(this), config);
    }
    async reset(callback) {
        const db = await this.getDb();
        await db.destroy();
        this.db = undefined;
        this.refreshSubscription();
        await (callback === null || callback === void 0 ? void 0 : callback.call(this));
        await this.getDb();
    }
    subscribe(handler) {
        const id = database.uniqueSubscriptionId();
        this.changesHandlers.set(id, handler);
        this.refreshSubscription();
        return id;
    }
    subscribeAttached(handler) {
        const id = database.uniqueAttachedSubscriptionId();
        this.changesHandlersAttached.set(id, handler);
        this.refreshSubscription();
        return id;
    }
    async unsettled(conditions = {}, options = {}) {
        const response = await this.rawQuery(options, {
            conditions,
            unsettledCount: true
        });
        return response.unsettledCount;
    }
    async unsettledAttached(conditions = {}, parentConditions = {}, options = {}) {
        const response = await this.rawQuery(options, {
            conditions,
            parentConditions,
            unsettledCount: true
        });
        return response.unsettledCount;
    }
    unsubscribe(id) {
        assert.toBeTrue(this.changesHandlers.has(id));
        this.changesHandlers.delete(id);
        this.refreshSubscription();
    }
    unsubscribeAttached(id) {
        assert.toBeTrue(this.changesHandlersAttached.has(id));
        this.changesHandlersAttached.delete(id);
        this.refreshSubscription();
    }
    /**
     * Puts attached documents.
     *
     * @param parentId - Parent ID.
     * @param docs - Attached documents.
     * @returns Responses.
     */
    async _putAttachedBulk(parentId, docs) {
        const db = await this.getDb();
        const parentDoc = await db.get(parentId);
        const attachedDocs = parentDoc.attachedDocs
            ? a.clone(parentDoc.attachedDocs)
            : [];
        const lastAttachedDocs = [];
        const result = [];
        for (const doc of docs) {
            const { _id, _rev, parentDoc: omitParentDoc } = doc, content = __rest(doc, ["_id", "_rev", "parentDoc"]);
            if (is.not.empty(_id))
                if (_rev === a.get(attachedDocs, _id)._rev) {
                    // Valid
                }
                else
                    throw new PouchConflictError("Document update conflict");
            const id = _id !== null && _id !== void 0 ? _id : attachedDocs.length;
            const rev = is.not.empty(_rev) ? _rev + 1 : 1;
            attachedDocs[id] = Object.assign(Object.assign({}, content), { _id: id, _rev: rev });
            lastAttachedDocs.push(id);
            result.push({
                id,
                parentId,
                rev
            });
        }
        try {
            const response = await db.put(Object.assign(Object.assign({}, parentDoc), { attachedDocs,
                lastAttachedDocs }));
            assert.toBeTrue(response.ok, "Database request failed");
            return result.map(item => {
                return Object.assign(Object.assign({}, item), { parentRev: response.rev });
            });
        }
        catch (e) {
            assert.instance(e, PouchConflictError, assert.wrapError(e));
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
    async _rawQuery(mapReduce, options, queryOptions) {
        var _a, _b, _c;
        const db = await this.getDb();
        const descending = (_a = options.descending) !== null && _a !== void 0 ? _a : false;
        const skip = (_b = options.skip) !== null && _b !== void 0 ? _b : 0;
        const limit = (_c = options.limit) !== null && _c !== void 0 ? _c : 1000000000;
        const response = await db.query(`${mapReduce.id}/default`, {
            descending,
            group: true,
            group_level: mapReduce.groupLevel,
            limit: limit + skip
        });
        const toSettle = _.flatten(response.rows
            .map(row => row.value)
            .filter(isDocsResponse)
            .filter(group => !group.settled)
            .map(group => group.docs))
            .map(doc => doc.doc)
            .filter(mapReduce.settle);
        if (toSettle.length >= this.config.reindexThreshold)
            await this.rebuildIndex(mapReduce);
        const groups = response.rows
            .map(row => row.value)
            .filter(isDocsResponse);
        return {
            count: queryOptions.count
                ? num.sum(...groups.map(group => group.settled
                    ? group.count
                    : group.docs.map(item => item.doc).filter(mapReduce.output)
                        .length))
                : 0,
            docs: queryOptions.docs
                ? fn.run(() => {
                    const items = _.flatten(groups.map(group => group.docs)).filter(item => mapReduce.output(item.doc));
                    items.sort((item1, item2) => collate(item1.key, item2.key));
                    if (descending)
                        items.reverse();
                    return items.slice(skip, skip + limit).map(doc => doc.doc);
                })
                : [],
            mapReduce,
            unsettledCount: queryOptions.unsettledCount
                ? num.sum(0, ...groups
                    .filter(group => !group.settled)
                    .map(group => group.docs.length))
                : 0
        };
    }
    /**
     * Rebuilds index.
     *
     * @param mapReduce - Map/reduce function.
     */
    async _rebuildIndex(mapReduce) {
        const db = await this.getDb();
        try {
            const doc = await db.get(`_design/${mapReduce.id}`);
            await db.put(Object.assign(Object.assign({}, doc), { views: { default: mapReduce.mapReduce } }));
            return true;
        }
        catch (e) {
            assert.instance(e, PouchConflictError, assert.wrapError(e));
            return false;
        }
    }
    /**
     * Creates design document.
     *
     * @param mapReduce - Map/reduce function.
     */
    async createDesignDocument(mapReduce) {
        const db = await this.getDb();
        try {
            await db.put({
                _id: `_design/${mapReduce.id}`,
                views: { default: mapReduce.mapReduce }
            });
        }
        catch (e) {
            assert.instance(e, PouchConflictError, assert.wrapError(e));
        }
    }
    /**
     * Creates reactive storage.
     *
     * @returns Reactive storage.
     */
    createReactiveStorage() {
        return reactiveStorage({
            loaded: false,
            loading: true,
            refresh: fn.noop,
            unsubscribe: fn.noop
        });
    }
    /**
     * Returns PouchProxy instance.
     *
     * @returns PouchProxy instance.
     */
    async getDb() {
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
    async migrate() {
        if (this.options.migrations.length) {
            let migrations = await fn.run(async () => {
                const result = await this.getIfExists("migrations");
                return result !== null && result !== void 0 ? result : { _id: "migrations" };
            });
            for (const migration of this.options.migrations)
                if (migrations[migration.id] === true) {
                    // Already applied
                }
                else {
                    // eslint-disable-next-line no-await-in-loop -- Ok
                    await migration.callback.call(this);
                    migrations = Object.assign(Object.assign({}, migrations), { [migration.id]: true });
                    // eslint-disable-next-line no-await-in-loop -- Ok
                    const { id, rev } = await this.put(migrations);
                    migrations = Object.assign(Object.assign({}, migrations), { _id: id, _rev: rev });
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
    async rawQuery(options, queryOptions) {
        const mapReduce = "parentConditions" in queryOptions
            ? getMapReduceAttached(options, queryOptions, this.options.caseSensitiveSorting)
            : getMapReduce(options, queryOptions, this.options.caseSensitiveSorting);
        try {
            return await this._rawQuery(mapReduce, options, queryOptions);
        }
        catch (e) {
            assert.instance(e, PouchNotFoundError, assert.wrapError(e));
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
    reactiveFactoryGet(request, handler) {
        const result = this.createReactiveStorage();
        handlePromise.silent(this.reactiveFactoryGetAsync(request, handler, result));
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
    async reactiveFactoryGetAsync(request, handler, mutableResult) {
        o.assign(mutableResult, {
            loaded: true,
            loading: false,
            unsubscribe: () => {
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
    reactiveFactoryGetAttached(request, handler) {
        const result = this.createReactiveStorage();
        handlePromise.silent(this.reactiveFactoryGetAttachedAsync(request, handler, result));
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
    async reactiveFactoryGetAttachedAsync(request, handler, mutableResult) {
        o.assign(mutableResult, {
            loaded: true,
            loading: false,
            unsubscribe: () => {
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
    reactiveFactoryQuery(request, config) {
        const result = this.createReactiveStorage();
        handlePromise.silent(this.reactiveFactoryQueryAsync(request, config, result));
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
    async reactiveFactoryQueryAsync(request, config, mutableResult) {
        config = reactiveStorage(config);
        o.assign(mutableResult, {
            loaded: true,
            loading: false,
            unsubscribe: () => {
                reactiveStorage.unwatch(config, observer);
                this.unsubscribe(subscription);
                programFlow.clearTimeout(timeout);
            },
            value: await request(config.conditions, config.options)
        });
        const observer = reactiveStorage.watch(config, refresh);
        const subscription = this.subscribe(doc => {
            if (config.update && config.update(doc))
                refresh();
        });
        let timeout;
        updateTimeout();
        assert.toBeTrue(mutableResult.loaded);
        return mutableResult;
        function refresh() {
            handlePromise.silent(async () => {
                mutableResult.loading = true;
                mutableResult.value = await request(config.conditions, config.options);
                mutableResult.loading = false;
                updateTimeout();
            });
        }
        function updateTimeout() {
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
    reactiveFactoryQueryAttached(request, config) {
        const result = this.createReactiveStorage();
        handlePromise.silent(this.reactiveFactoryQueryAttachedAsync(request, config, result));
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
    async reactiveFactoryQueryAttachedAsync(request, config, mutableResult) {
        config = reactiveStorage(config);
        o.assign(mutableResult, {
            loaded: true,
            loading: false,
            unsubscribe: () => {
                reactiveStorage.unwatch(config, observer);
                this.unsubscribeAttached(subscription);
                programFlow.clearTimeout(timeout);
            },
            value: await request(config.conditions, config.parentConditions, config.options)
        });
        const observer = reactiveStorage.watch(config, refresh);
        const subscription = this.subscribeAttached(doc => {
            if (config.update && config.update(doc))
                refresh();
        });
        let timeout;
        updateTimeout();
        assert.toBeTrue(mutableResult.loaded);
        return mutableResult;
        function refresh() {
            handlePromise.silent(async () => {
                mutableResult.loading = true;
                mutableResult.value = await request(config.conditions, config.parentConditions, config.options);
                mutableResult.loading = false;
                updateTimeout();
            });
        }
        function updateTimeout() {
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
    async rebuildIndex(mapReduce) {
        for (let i = 0; i < 1 + this.options.retries; i++) {
            // eslint-disable-next-line no-await-in-loop -- Ok
            const result = await this._rebuildIndex(mapReduce);
            if (result)
                return;
        }
        throw new PouchRetryError(`Failed after ${this.options.retries} retries`);
    }
    /**
     * Refreshes subscriptions.
     */
    refreshSubscription() {
        if (this.db &&
            this.changesHandlers.size + this.changesHandlersAttached.size)
            if (this.changes) {
                // Nothing to do
            }
            else
                this.changes = this.db.changes(value => {
                    assert.byGuard(value.doc, isExistingDocument);
                    if (this.changesHandlers.size) {
                        const doc = extractDoc(value.doc);
                        for (const handler of this.changesHandlers.values())
                            handler(doc);
                    }
                    if (this.changesHandlersAttached.size && value.doc.lastAttachedDocs)
                        for (const lastAttachedDoc of value.doc.lastAttachedDocs) {
                            const attachedDoc = extractAttachedDoc(value.doc, lastAttachedDoc, true);
                            assert.not.empty(attachedDoc);
                            for (const handler of this.changesHandlersAttached.values())
                                handler(attachedDoc);
                        }
                }, {
                    include_docs: true,
                    live: true,
                    since: "now"
                });
        else if (this.changes) {
            this.changes.cancel();
            this.changes = undefined;
        }
        else {
            // Nothing to do
        }
    }
}
//# sourceMappingURL=Database.js.map