"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const tslib_1 = require("tslib");
const PouchProxy_1 = require("./PouchProxy");
const core_1 = require("./core");
const facades_1 = require("@skylib/facades");
const functions_1 = require("@skylib/functions");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const pouchdb_collate_1 = require("pouchdb-collate");
class Database {
    /**
     * Creates class instance.
     *
     * @param name - Database name.
     * @param options - Database options.
     * @param config - Configuration.
     * @param pouchConfig - PouchDB configuration.
     */
    constructor(name, options = {}, config = {}, pouchConfig = {}) {
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
        /**
         * Creates reactive storage.
         *
         * @returns Reactive storage.
         */
        Object.defineProperty(this, "createReactiveStorage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => (0, facades_1.reactiveStorage)({
                loaded: false,
                loading: true,
                refresh: functions_1.fn.noop,
                unsubscribe: functions_1.fn.noop
            })
        });
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
            (0, core_1.validatePutDocument)(doc);
        docs = docs.map(doc => functions_1.o.omit(doc, "lastAttachedDocs"));
        const db = await this.getDb();
        const responses = await db.bulkDocs(docs);
        return responses
            .map(response => "ok" in response && response.ok
            ? _.pick(response, ["id", "rev"])
            : undefined)
            .filter(functions_1.is.not.empty);
    }
    async bulkDocsAttached(docs) {
        const groups = new functions_1.Accumulator();
        for (const doc of docs)
            groups.push(doc.parentDoc._id, doc);
        const responses = await Promise.all(functions_1.a
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
        return functions_1.is.not.empty(doc);
    }
    async existsAttached(id, parentId) {
        const doc = await this.getIfExistsAttached(id, parentId);
        return functions_1.is.not.empty(doc);
    }
    async get(id) {
        const db = await this.getDb();
        const doc = await db.get(id);
        return (0, core_1.extractDoc)(doc);
    }
    async getAttached(id, parentId) {
        const db = await this.getDb();
        const doc = await db.get(parentId);
        const attachedDoc = (0, core_1.extractAttachedDoc)(doc, id);
        functions_1.assert.not.empty(attachedDoc, () => new core_1.PouchNotFoundError("Missing attached document"));
        return attachedDoc;
    }
    async getIfExists(id) {
        try {
            return await this.get(id);
        }
        catch (e) {
            functions_1.assert.instance(e, core_1.PouchNotFoundError, functions_1.ErrorArg.wrapError(e));
            return undefined;
        }
    }
    async getIfExistsAttached(id, parentId) {
        try {
            return await this.getAttached(id, parentId);
        }
        catch (e) {
            functions_1.assert.instance(e, core_1.PouchNotFoundError, functions_1.ErrorArg.wrapError(e));
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
        (0, core_1.validatePutDocument)(doc);
        const db = await this.getDb();
        if (doc.attachedDocs && doc.attachedDocs.length === 0) {
            functions_1.assert.not.empty(doc._id);
            functions_1.assert.not.empty(doc._rev);
            const storedDoc = await db.get(doc._id);
            functions_1.assert.not.empty(storedDoc.attachedDocs);
            doc = Object.assign(Object.assign({}, doc), { attachedDocs: storedDoc.attachedDocs });
        }
        const response = await db.post(functions_1.o.omit(doc, "lastAttachedDocs"));
        functions_1.assert.toBeTrue(response.ok);
        return _.pick(response, ["id", "rev"]);
    }
    async putAttached(parentId, doc) {
        return functions_1.a.first(await this.putAttachedBulk(parentId, [doc]));
    }
    async putAttachedBulk(parentId, docs) {
        for (let i = 0; i < 1 + this.options.retries; i++) {
            // eslint-disable-next-line no-await-in-loop -- Ok
            const result = await this._putAttachedBulk(parentId, docs);
            if (result)
                return result;
        }
        throw new core_1.PouchRetryError(`Failed after ${this.options.retries} retries`);
    }
    async putIfNotExists(doc) {
        try {
            return await this.put(doc);
        }
        catch (e) {
            functions_1.assert.instance(e, core_1.PouchConflictError, functions_1.ErrorArg.wrapError(e));
            return undefined;
        }
    }
    async putIfNotExistsAttached(parentId, doc) {
        try {
            return await this.putAttached(parentId, doc);
        }
        catch (e) {
            functions_1.assert.instance(e, core_1.PouchConflictError, functions_1.ErrorArg.wrapError(e));
            return undefined;
        }
    }
    async query(conditions = {}, options = {}) {
        const response = await this.rawQuery(options, { conditions, docs: true });
        functions_1.assert.array.of(response.docs, core_1.isExistingDocument);
        return response.docs;
    }
    async queryAttached(conditions = {}, parentConditions = {}, options = {}) {
        const response = await this.rawQuery(options, {
            conditions,
            docs: true,
            parentConditions
        });
        functions_1.assert.array.of(response.docs, core_1.isExistingAttachedDocument);
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
                    throw new core_1.PouchNotFoundError("Missing document");
                else
                    result.value = doc;
        });
    }
    reactiveGetAttached(id, parentId) {
        return this.reactiveFactoryGetAttached(this.getAttached(id, parentId), (doc, result) => {
            if (doc._id === id && doc.parentDoc._id === parentId)
                if (doc._deleted)
                    throw new core_1.PouchNotFoundError("Missing attached document");
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
        const id = facades_1.database.uniqueSubscriptionId();
        this.changesHandlers.set(id, handler);
        this.refreshSubscription();
        return id;
    }
    subscribeAttached(handler) {
        const id = facades_1.database.uniqueAttachedSubscriptionId();
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
        functions_1.assert.toBeTrue(this.changesHandlers.has(id));
        this.changesHandlers.delete(id);
        this.refreshSubscription();
    }
    unsubscribeAttached(id) {
        functions_1.assert.toBeTrue(this.changesHandlersAttached.has(id));
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
            ? functions_1.a.clone(parentDoc.attachedDocs)
            : [];
        const lastAttachedDocs = [];
        const result = [];
        for (const doc of docs) {
            const { _id, _rev, parentDoc: omitParentDoc } = doc, content = tslib_1.__rest(doc, ["_id", "_rev", "parentDoc"]);
            if (functions_1.is.not.empty(_id))
                if (_rev === functions_1.a.get(attachedDocs, _id)._rev) {
                    // Valid
                }
                else
                    throw new core_1.PouchConflictError("Document update conflict");
            const id = _id !== null && _id !== void 0 ? _id : attachedDocs.length;
            const rev = functions_1.is.not.empty(_rev) ? _rev + 1 : 1;
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
            functions_1.assert.toBeTrue(response.ok, "Database request failed");
            return result.map(item => {
                return Object.assign(Object.assign({}, item), { parentRev: response.rev });
            });
        }
        catch (e) {
            functions_1.assert.instance(e, core_1.PouchConflictError, functions_1.ErrorArg.wrapError(e));
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
            .filter(core_1.isDocsResponse)
            .filter(group => !group.settled)
            .map(group => group.docs))
            .map(doc => doc.doc)
            .filter(mapReduce.settle);
        if (toSettle.length >= this.config.reindexThreshold)
            await this.rebuildIndex(mapReduce);
        const groups = response.rows
            .map(row => row.value)
            .filter(core_1.isDocsResponse);
        return {
            count: queryOptions.count
                ? functions_1.num.sum(...groups.map(group => group.settled
                    ? group.count
                    : group.docs.map(item => item.doc).filter(mapReduce.output)
                        .length))
                : 0,
            docs: queryOptions.docs
                ? (0, functions_1.evaluate)(() => {
                    const items = _.flatten(groups.map(group => group.docs)).filter(item => mapReduce.output(item.doc));
                    items.sort((item1, item2) => (0, pouchdb_collate_1.collate)(item1.key, item2.key));
                    if (descending)
                        items.reverse();
                    return items.slice(skip, skip + limit).map(doc => doc.doc);
                })
                : [],
            mapReduce,
            unsettledCount: queryOptions.unsettledCount
                ? functions_1.num.sum(0, ...groups
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
            functions_1.assert.instance(e, core_1.PouchConflictError, functions_1.ErrorArg.wrapError(e));
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
            functions_1.assert.instance(e, core_1.PouchConflictError, functions_1.ErrorArg.wrapError(e));
        }
    }
    /**
     * Returns PouchProxy instance.
     *
     * @returns PouchProxy instance.
     */
    async getDb() {
        if (functions_1.is.empty(this.db)) {
            this.db = new PouchProxy_1.PouchProxy(this.name, this.pouchConfig);
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
            let migrations = await (0, functions_1.evaluate)(async () => {
                const result = await this.getIfExists("migrations");
                return result !== null && result !== void 0 ? result : { _id: "migrations" };
            });
            for (const migration of this.options.migrations)
                if (migrations[migration.id] === true) {
                    // Already applied
                }
                else {
                    // eslint-disable-next-line no-await-in-loop -- Ok
                    await migration.callback(this);
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
            ? (0, core_1.getMapReduceAttached)(options, queryOptions, this.options.caseSensitiveSorting)
            : (0, core_1.getMapReduce)(options, queryOptions, this.options.caseSensitiveSorting);
        try {
            return await this._rawQuery(mapReduce, options, queryOptions);
        }
        catch (e) {
            functions_1.assert.instance(e, core_1.PouchNotFoundError, functions_1.ErrorArg.wrapError(e));
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
        facades_1.handlePromise.silent(this.reactiveFactoryGetAsync(request, handler, result));
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
        functions_1.o.assign(mutableResult, {
            loaded: true,
            loading: false,
            unsubscribe: () => {
                this.unsubscribe(subscription);
            },
            value: await request
        });
        const subscription = this.subscribe(doc => {
            functions_1.assert.toBeTrue(mutableResult.loaded);
            handler(doc, mutableResult);
        });
        functions_1.assert.toBeTrue(mutableResult.loaded);
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
        facades_1.handlePromise.silent(this.reactiveFactoryGetAttachedAsync(request, handler, result));
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
        functions_1.o.assign(mutableResult, {
            loaded: true,
            loading: false,
            unsubscribe: () => {
                this.unsubscribeAttached(subscription);
            },
            value: await request
        });
        const subscription = this.subscribeAttached(doc => {
            functions_1.assert.toBeTrue(mutableResult.loaded);
            handler(doc, mutableResult);
        });
        functions_1.assert.toBeTrue(mutableResult.loaded);
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
        facades_1.handlePromise.silent(this.reactiveFactoryQueryAsync(request, config, result));
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
        config = (0, facades_1.reactiveStorage)(config);
        functions_1.o.assign(mutableResult, {
            loaded: true,
            loading: false,
            unsubscribe: () => {
                facades_1.reactiveStorage.unwatch(config, observer);
                this.unsubscribe(subscription);
                functions_1.programFlow.clearTimeout(timeout);
            },
            value: await request(config.conditions, config.options)
        });
        const observer = facades_1.reactiveStorage.watch(config, refresh);
        const subscription = this.subscribe(doc => {
            if (config.update && config.update(doc))
                refresh();
        });
        let timeout;
        updateTimeout();
        functions_1.assert.toBeTrue(mutableResult.loaded);
        return mutableResult;
        function refresh() {
            facades_1.handlePromise.silent(async () => {
                mutableResult.loading = true;
                mutableResult.value = await request(config.conditions, config.options);
                mutableResult.loading = false;
                updateTimeout();
            });
        }
        function updateTimeout() {
            functions_1.programFlow.clearTimeout(timeout);
            timeout = functions_1.is.not.empty(config.updateInterval)
                ? functions_1.programFlow.setTimeout(refresh, config.updateInterval)
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
        facades_1.handlePromise.silent(this.reactiveFactoryQueryAttachedAsync(request, config, result));
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
        config = (0, facades_1.reactiveStorage)(config);
        functions_1.o.assign(mutableResult, {
            loaded: true,
            loading: false,
            unsubscribe: () => {
                facades_1.reactiveStorage.unwatch(config, observer);
                this.unsubscribeAttached(subscription);
                functions_1.programFlow.clearTimeout(timeout);
            },
            value: await request(config.conditions, config.parentConditions, config.options)
        });
        const observer = facades_1.reactiveStorage.watch(config, refresh);
        const subscription = this.subscribeAttached(doc => {
            if (config.update && config.update(doc))
                refresh();
        });
        let timeout;
        updateTimeout();
        functions_1.assert.toBeTrue(mutableResult.loaded);
        return mutableResult;
        function refresh() {
            facades_1.handlePromise.silent(async () => {
                mutableResult.loading = true;
                mutableResult.value = await request(config.conditions, config.parentConditions, config.options);
                mutableResult.loading = false;
                updateTimeout();
            });
        }
        function updateTimeout() {
            functions_1.programFlow.clearTimeout(timeout);
            timeout = functions_1.is.not.empty(config.updateInterval)
                ? functions_1.programFlow.setTimeout(refresh, config.updateInterval)
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
        throw new core_1.PouchRetryError(`Failed after ${this.options.retries} retries`);
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
                    functions_1.assert.byGuard(value.doc, core_1.isExistingDocument);
                    if (this.changesHandlers.size) {
                        const doc = (0, core_1.extractDoc)(value.doc);
                        for (const handler of this.changesHandlers.values())
                            handler(doc);
                    }
                    if (this.changesHandlersAttached.size && value.doc.lastAttachedDocs)
                        for (const lastAttachedDoc of value.doc.lastAttachedDocs) {
                            const attachedDoc = (0, core_1.extractAttachedDoc)(value.doc, lastAttachedDoc, true);
                            functions_1.assert.not.empty(attachedDoc);
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
exports.Database = Database;
//# sourceMappingURL=Database.js.map