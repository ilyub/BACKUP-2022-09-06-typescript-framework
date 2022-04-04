"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = exports.wrapError = exports.handlers = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("lodash"));
const pouchdb_collate_1 = require("pouchdb-collate");
const sha256_1 = tslib_1.__importDefault(require("sha256"));
const database_1 = require("@skylib/facades/dist/database");
const datetime_1 = require("@skylib/facades/dist/datetime");
const handlePromise_1 = require("@skylib/facades/dist/handlePromise");
const reactiveStorage_1 = require("@skylib/facades/dist/reactiveStorage");
const uniqueId_1 = require("@skylib/facades/dist/uniqueId");
const a = tslib_1.__importStar(require("@skylib/functions/dist/array"));
const arrayMap = tslib_1.__importStar(require("@skylib/functions/dist/arrayMap"));
const assert = tslib_1.__importStar(require("@skylib/functions/dist/assertions"));
const cast = tslib_1.__importStar(require("@skylib/functions/dist/converters"));
const fn = tslib_1.__importStar(require("@skylib/functions/dist/function"));
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const json = tslib_1.__importStar(require("@skylib/functions/dist/json"));
const num = tslib_1.__importStar(require("@skylib/functions/dist/number"));
const o = tslib_1.__importStar(require("@skylib/functions/dist/object"));
const programFlow = tslib_1.__importStar(require("@skylib/functions/dist/programFlow"));
const PouchConflictError_1 = require("./errors/PouchConflictError");
const PouchNotFoundError_1 = require("./errors/PouchNotFoundError");
const PouchRetryError_1 = require("./errors/PouchRetryError");
const PouchDBProxy_1 = require("./PouchDBProxy");
exports.handlers = o.freeze({
    error(error) {
        throw error;
    }
});
/**
 * Wraps error.
 *
 * @param e - Error.
 * @returns Wrapped error.
 */
function wrapError(e) {
    return () => e;
}
exports.wrapError = wrapError;
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
        var _a, _b, _c, _d;
        /*
        |*****************************************************************************
        |* Protected
        |*****************************************************************************
        |*/
        Object.defineProperty(this, "changes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "changesHandlersAttachedPool", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "changesHandlersPool", {
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
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
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
        const optionsWithDefaults = Object.assign(Object.assign({}, options), { caseSensitiveSorting: (_a = options.caseSensitiveSorting) !== null && _a !== void 0 ? _a : false, migrations: (_b = options.migrations) !== null && _b !== void 0 ? _b : [], retries: (_c = options.retries) !== null && _c !== void 0 ? _c : 0 });
        const configWithDefaults = Object.assign(Object.assign({}, config), { reindexThreshold: (_d = config.reindexThreshold) !== null && _d !== void 0 ? _d : 1 });
        this.name = name;
        this.options = optionsWithDefaults;
        this.config = configWithDefaults;
        this.pouchConfig = pouchConfig;
    }
    async bulkAttachedDocs(parentId, docs) {
        const db = await this.getDb();
        for (let i = 0; i < 1 + this.options.retries; i++) {
            // eslint-disable-next-line no-await-in-loop
            const result = await attempt();
            if (is.object(result))
                return result;
        }
        throw new PouchRetryError_1.PouchRetryError(`Failed after ${this.options.retries} retries`);
        async function attempt() {
            var _a;
            const parentDoc = await db.get(parentId);
            const attachedDocs = a.clone((_a = parentDoc.attachedDocs) !== null && _a !== void 0 ? _a : []);
            const lastAttachedDocs = [];
            const result = [];
            for (const doc of docs) {
                const { _id, _rev, parentDoc: omitParentDoc } = doc, content = tslib_1.__rest(doc, ["_id", "_rev", "parentDoc"]);
                if (is.not.empty(_id) && _rev !== a.get(attachedDocs, _id)._rev)
                    throw new PouchConflictError_1.PouchConflictError("Attached document update conflict");
                const id = _id !== null && _id !== void 0 ? _id : attachedDocs.length;
                const rev = (_rev !== null && _rev !== void 0 ? _rev : 0) + 1;
                const attachedDoc = Object.assign(Object.assign({}, content), { _id: id, _rev: rev });
                if (id < attachedDocs.length)
                    attachedDocs[id] = attachedDoc;
                else
                    attachedDocs.push(attachedDoc);
                lastAttachedDocs.push(id);
                result.push({
                    id,
                    parentId,
                    parentRev: "",
                    rev
                });
            }
            try {
                const response = await db.put(o.omit(Object.assign(Object.assign({}, parentDoc), { attachedDocs,
                    lastAttachedDocs })));
                assert.toBeTrue(response.ok, "Database request failed");
                return result.map(item => {
                    return Object.assign(Object.assign({}, item), { parentRev: response.rev });
                });
            }
            catch (e) {
                assert.instance(e, PouchConflictError_1.PouchConflictError, wrapError(e));
                return "retry";
            }
        }
    }
    async bulkDocs(docs) {
        for (const doc of docs)
            validatePutDocument(doc);
        docs = docs.map(doc => o.omit(doc, "lastAttachedDocs"));
        const db = await this.getDb();
        const responses = await db.bulkDocs(docs);
        return responses
            .map(response => "ok" in response && response.ok
            ? { id: response.id, rev: response.rev }
            : undefined)
            .filter(is.not.empty);
    }
    async bulkExistingAttachedDocs(docs) {
        const docsMap = new Map();
        for (const doc of docs)
            arrayMap.push(doc.parentDoc._id, doc, docsMap);
        const result = await Promise.all(a
            .fromIterable(docsMap.entries())
            .map(async ([parentId, docs2]) => this.bulkAttachedDocs(parentId, docs2)));
        return _.flatten(result);
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
        const doc = await this.getAttachedIfExists(id, parentId);
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
        return extractDocAttached(doc, id);
    }
    async getAttachedIfExists(id, parentId) {
        try {
            return await this.getAttached(id, parentId);
        }
        catch (e) {
            assert.instance(e, PouchNotFoundError_1.PouchNotFoundError, wrapError(e));
            return undefined;
        }
    }
    async getIfExists(id) {
        try {
            return await this.get(id);
        }
        catch (e) {
            assert.instance(e, PouchNotFoundError_1.PouchNotFoundError, wrapError(e));
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
        return db.db;
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
        return { id: response.id, rev: response.rev };
    }
    async putAttached(parentId, doc) {
        return a.first(await this.bulkAttachedDocs(parentId, [doc]));
    }
    async putAttachedIfNotExists(parentId, doc) {
        try {
            return await this.putAttached(parentId, doc);
        }
        catch (e) {
            assert.instance(e, PouchConflictError_1.PouchConflictError, wrapError(e));
            return undefined;
        }
    }
    async putIfNotExists(doc) {
        try {
            return await this.put(doc);
        }
        catch (e) {
            assert.instance(e, PouchConflictError_1.PouchConflictError, wrapError(e));
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
        assert.array.of(response.docs, isExistingDocumentAttached);
        return response.docs;
    }
    reactiveCount(config) {
        return this.reactiveFactoryQuery(this.count.bind(this), config);
    }
    async reactiveCountAsync(config) {
        return this.reactiveFactoryQueryAsync(this.count.bind(this), config);
    }
    reactiveCountAttached(config) {
        return this.reactiveFactoryQueryAttached(this.countAttached.bind(this), config);
    }
    async reactiveCountAttachedAsync(config) {
        return this.reactiveFactoryQueryAttachedAsync(this.countAttached.bind(this), config);
    }
    reactiveExists(id) {
        return this.reactiveFactoryGet(this.exists(id), this.reactiveHandlerExists(id));
    }
    async reactiveExistsAsync(id) {
        return this.reactiveFactoryGetAsync(this.exists(id), this.reactiveHandlerExists(id));
    }
    reactiveExistsAttached(id, parentId) {
        return this.reactiveFactoryGetAttached(this.existsAttached(id, parentId), this.reactiveHandlerExistsAttached(id, parentId));
    }
    async reactiveExistsAttachedAsync(id, parentId) {
        return this.reactiveFactoryGetAttachedAsync(this.existsAttached(id, parentId), this.reactiveHandlerExistsAttached(id, parentId));
    }
    reactiveGet(id) {
        return this.reactiveFactoryGet(this.get(id), this.reactiveHandlerGet(id));
    }
    async reactiveGetAsync(id) {
        return this.reactiveFactoryGetAsync(this.get(id), this.reactiveHandlerGet(id));
    }
    reactiveGetAttached(id, parentId) {
        return this.reactiveFactoryGetAttached(this.getAttached(id, parentId), this.reactiveHandlerGetAttached(id, parentId));
    }
    async reactiveGetAttachedAsync(id, parentId) {
        return this.reactiveFactoryGetAttachedAsync(this.getAttached(id, parentId), this.reactiveHandlerGetAttached(id, parentId));
    }
    reactiveGetAttachedIfExists(id, parentId) {
        return this.reactiveFactoryGetAttached(this.getAttachedIfExists(id, parentId), this.reactiveHandlerGetAttachedIfExists(id, parentId));
    }
    async reactiveGetAttachedIfExistsAsync(id, parentId) {
        return this.reactiveFactoryGetAttachedAsync(this.getAttachedIfExists(id, parentId), this.reactiveHandlerGetAttachedIfExists(id, parentId));
    }
    reactiveGetIfExists(id) {
        return this.reactiveFactoryGet(this.getIfExists(id), this.reactiveHandlerGetIfExists(id));
    }
    async reactiveGetIfExistsAsync(id) {
        return this.reactiveFactoryGetAsync(this.getIfExists(id), this.reactiveHandlerGetIfExists(id));
    }
    reactiveQuery(config) {
        return this.reactiveFactoryQuery(this.query.bind(this), config);
    }
    async reactiveQueryAsync(config) {
        return this.reactiveFactoryQueryAsync(this.query.bind(this), config);
    }
    reactiveQueryAttached(config) {
        return this.reactiveFactoryQueryAttached(this.queryAttached.bind(this), config);
    }
    async reactiveQueryAttachedAsync(config) {
        return this.reactiveFactoryQueryAttachedAsync(this.queryAttached.bind(this), config);
    }
    reactiveUnsettled(config) {
        return this.reactiveFactoryQuery(this.unsettled.bind(this), config);
    }
    async reactiveUnsettledAsync(config) {
        return this.reactiveFactoryQueryAsync(this.unsettled.bind(this), config);
    }
    reactiveUnsettledAttached(config) {
        return this.reactiveFactoryQueryAttached(this.unsettledAttached.bind(this), config);
    }
    async reactiveUnsettledAttachedAsync(config) {
        return this.reactiveFactoryQueryAttachedAsync(this.unsettledAttached.bind(this), config);
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
        const id = (0, database_1.uniqueSubscriptionId)();
        this.changesHandlersPool.set(id, handler);
        this.refreshSubscription();
        return id;
    }
    subscribeAttached(handler) {
        const id = (0, database_1.uniqueAttachedSubscriptionId)();
        this.changesHandlersAttachedPool.set(id, handler);
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
        assert.toBeTrue(this.changesHandlersPool.has(id));
        this.changesHandlersPool.delete(id);
        this.refreshSubscription();
    }
    unsubscribeAttached(id) {
        assert.toBeTrue(this.changesHandlersAttachedPool.has(id));
        this.changesHandlersAttachedPool.delete(id);
        this.refreshSubscription();
    }
    /**
     * Returns PouchDBProxy instance.
     *
     * @returns PouchDBProxy instance.
     */
    async getDb() {
        if (is.empty(this.db)) {
            this.db = new PouchDBProxy_1.PouchDBProxy(this.name, this.pouchConfig);
            this.refreshSubscription();
            await this.migrate();
        }
        return this.db;
    }
    /**
     * Creates map/reduce.
     *
     * @param options - Options.
     * @param rawQueryOptions - Raw query options.
     * @returns Map/reduce.
     */
    mapReduce(options, rawQueryOptions) {
        var _a, _b;
        const conds = condsToStr("doc", rawQueryOptions.conditions);
        const sortBy = options.sortBy;
        const descending = (_a = options.descending) !== null && _a !== void 0 ? _a : false;
        const group1 = descending ? 4 : 1;
        const group2 = descending ? 3 : 2;
        const group3 = descending ? 2 : 3;
        const group4 = descending ? 1 : 4;
        const idParams = [
            conds.toEmit,
            conds.toSettle,
            sortBy,
            descending,
            this.options.caseSensitiveSorting
        ];
        const keyCode = fn.run(() => {
            if (is.empty(sortBy))
                return `const key = [${group2}, null, doc._id];`;
            return this.options.caseSensitiveSorting
                ? `
          const value = doc.${sortBy};
          const key = value === undefined || value === null || value === ""
            ? [${group3}, null, doc._id]
            : [${group4}, value, doc._id];
        `
                : `
          const value = typeof doc.${sortBy} === "string"
            ? doc.${sortBy}.toLocaleLowerCase()
            : doc.${sortBy};
          const key = value === undefined || value === null || value === ""
            ? [${group3}, null, doc._id]
            : [${group4}, value, doc._id];
        `;
        });
        const map = uglify(`
      function (doc) {
        /* ${(0, uniqueId_1.uniqueId)()} */
        if (${conds.toEmit}) {
          ${keyCode}
          const settled = ${conds.toSettle};
          emit(
            settled ? key : [${group1}, null, null, doc._id],
            {
              count: 1,
              docs: [
                {
                  doc: doc.attachedDocs ? { ...doc, attachedDocs: [] } : doc,
                  key
                }
              ],
              settled
            }
          );
        }
      }
    `);
        const reduce = uglify(`
      function (keys, values, rereduce) {
        /* ${(0, uniqueId_1.uniqueId)()} */
        let count = 0;
        let docs = [];
        let settled = false;
        for (const value of values) {
          count += value.count;
          if (value.settled) docs = value.docs;
          else docs.push(...value.docs);
          settled = value.settled;
        }
        return { count, docs, settled };
      }
    `);
        return {
            groupLevel: ((_b = rawQueryOptions.count) !== null && _b !== void 0 ? _b : false) ? 1 : 3,
            id: (0, sha256_1.default)(json.encode(idParams)),
            mapReduce: { map, reduce },
            output: createFilter(conds.toOutput),
            settle: createFilter(conds.toSettle)
        };
        function createFilter(cond) {
            // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func, no-type-assertion/no-type-assertion
            return new Function("doc", `return ${cond};`);
        }
    }
    /**
     * Creates map/reduce.
     *
     * @param options - Options.
     * @param rawQueryOptions - Raw query options.
     * @returns Map/reduce.
     */
    mapReduceAttached(options, rawQueryOptions) {
        var _a, _b;
        const conds = condsToStr("attached", rawQueryOptions.conditions);
        const parentConds = condsToStr("doc", rawQueryOptions.parentConditions);
        const sortBy = options.sortBy;
        const descending = (_a = options.descending) !== null && _a !== void 0 ? _a : false;
        const group1 = descending ? 4 : 1;
        const group2 = descending ? 3 : 2;
        const group3 = descending ? 2 : 3;
        const group4 = descending ? 1 : 4;
        const idParams = [
            conds.toEmit,
            conds.toSettle,
            parentConds,
            sortBy,
            descending,
            this.options.caseSensitiveSorting
        ];
        const keyCode = fn.run(() => {
            if (is.empty(sortBy))
                return `const key = [${group2}, null, doc._id, _id];`;
            return this.options.caseSensitiveSorting
                ? `
          const value = attached.${sortBy};
          const key = value === undefined || value === null || value === ""
            ? [${group3}, null, doc._id, _id]
            : [${group4}, value, doc._id, _id];
        `
                : `
          const value = typeof attached.${sortBy} === "string"
            ? attached.${sortBy}.toLocaleLowerCase()
            : attached.${sortBy};
          const key = value === undefined || value === null || value === ""
            ? [${group3}, null, doc._id, _id]
            : [${group4}, value, doc._id, _id];
        `;
        });
        const map = uglify(`
      function (doc) {
        /* ${(0, uniqueId_1.uniqueId)()} */
        if (doc.attachedDocs && ${parentConds.toEmit}) {
          const parentDoc = { ...doc, attachedDocs: [] };
          const parentSettled = ${parentConds.toSettle};
          for (let _id = 0; _id < doc.attachedDocs.length; _id++) {
            const attached = doc.attachedDocs[_id];
            if (!attached._deleted && ${conds.toEmit}) {
              ${keyCode}
              const settled = parentSettled && ${conds.toSettle};
              emit(
                settled ? key : [${group1}, null, null, doc._id, _id],
                {
                  count: 1,
                  docs: [
                    {
                      doc: { ...attached, parentDoc },
                      key
                    }
                  ],
                  settled
                }
              );
            }
          }
        }
      }
    `);
        const reduce = uglify(`
      function (keys, values, rereduce) {
        /* ${(0, uniqueId_1.uniqueId)()} */
        let count = 0;
        let docs = [];
        let settled = false;
        for (const value of values) {
          count += value.count;
          if (value.settled) docs = value.docs;
          else docs.push(...value.docs);
          settled = value.settled;
        }
        return { count, docs, settled };
      }
    `);
        return {
            groupLevel: ((_b = rawQueryOptions.count) !== null && _b !== void 0 ? _b : false) ? 1 : 4,
            id: (0, sha256_1.default)(json.encode(idParams)),
            mapReduce: { map, reduce },
            output: createFilter(conds.toOutput, parentConds.toOutput),
            settle: createFilter(conds.toSettle, parentConds.toSettle)
        };
        function createFilter(cond1, cond2) {
            // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func, no-type-assertion/no-type-assertion
            return new Function("attached", uglify(`
          doc = attached.parentDoc;
          return ${cond1} && ${cond2};
        `));
        }
    }
    /**
     * Runs migrations.
     */
    async migrate() {
        if (this.options.migrations.length) {
            const defaultMigrations = { _id: "migrations" };
            const storedMigrations = await this.getIfExists("migrations");
            let migrations = storedMigrations !== null && storedMigrations !== void 0 ? storedMigrations : defaultMigrations;
            for (const migration of this.options.migrations)
                if (migrations[migration.id] === true) {
                    // Already executed
                }
                else {
                    {
                        // eslint-disable-next-line no-await-in-loop
                        await migration.callback.call(this);
                    }
                    {
                        migrations = Object.assign(Object.assign({}, migrations), { [migration.id]: true });
                        // eslint-disable-next-line no-await-in-loop
                        const { id, rev } = await this.put(migrations);
                        migrations = Object.assign(Object.assign({}, migrations), { _id: id, _rev: rev });
                    }
                }
        }
    }
    /**
     * Performs database query.
     *
     * @param options - Options.
     * @param rawQueryOptions - Raw query options.
     * @returns Documents.
     */
    async rawQuery(options, rawQueryOptions) {
        var _a;
        const mapReduce = "parentConditions" in rawQueryOptions
            ? this.mapReduceAttached(options, rawQueryOptions)
            : this.mapReduce(options, rawQueryOptions);
        const db = await this.getDb();
        const limit = options.limit;
        const skip = (_a = options.skip) !== null && _a !== void 0 ? _a : 0;
        const response = await query();
        const toSettle = _.flatten(response.rows
            .map(row => row.value)
            .filter(isDocsResponse)
            .filter(docsResponse => !docsResponse.settled)
            .map(docsResponse => docsResponse.docs))
            .map(doc => doc.doc)
            .filter(mapReduce.settle);
        if (toSettle.length >= this.config.reindexThreshold)
            await rebuildIndex();
        return {
            count: getCount(),
            docs: getDocs(),
            mapReduce,
            unsettledCount: getUnsettledCount()
        };
        async function createDesignDocument() {
            try {
                await db.put({
                    _id: `_design/${mapReduce.id}`,
                    views: { default: mapReduce.mapReduce }
                });
            }
            catch (e) {
                assert.instance(e, PouchConflictError_1.PouchConflictError, wrapError(e));
            }
        }
        function getCount() {
            var _a;
            return ((_a = rawQueryOptions.count) !== null && _a !== void 0 ? _a : false)
                ? num.sum(...response.rows
                    .map(row => row.value)
                    .filter(isDocsResponse)
                    .map(docsResponse => docsResponse.settled
                    ? docsResponse.count
                    : docsResponse.docs
                        .map(docResponse => docResponse.doc)
                        .filter(mapReduce.output).length))
                : 0;
        }
        function getDocs() {
            var _a, _b;
            if ((_a = rawQueryOptions.docs) !== null && _a !== void 0 ? _a : false) {
                const docResponses = _.flatten(response.rows
                    .map(row => row.value)
                    .filter(isDocsResponse)
                    .map(docsResponse => docsResponse.docs)).filter(docResponse => mapReduce.output(docResponse.doc));
                docResponses.sort((docsResponse1, docsResponse2) => (0, pouchdb_collate_1.collate)(docsResponse1.key, docsResponse2.key));
                if ((_b = options.descending) !== null && _b !== void 0 ? _b : false)
                    docResponses.reverse();
                return sliceDocs(docResponses).map(doc => doc.doc);
            }
            return [];
        }
        function getUnsettledCount() {
            var _a;
            return ((_a = rawQueryOptions.unsettledCount) !== null && _a !== void 0 ? _a : false)
                ? num.sum(0, ...response.rows
                    .map(row => row.value)
                    .filter(isDocsResponse)
                    .filter(docsResponse => !docsResponse.settled)
                    .map(docsResponse => docsResponse.docs.length))
                : 0;
        }
        async function query() {
            try {
                return await queryAttempt();
            }
            catch (e) {
                assert.instance(e, PouchNotFoundError_1.PouchNotFoundError, wrapError(e));
                await createDesignDocument();
                return queryAttempt();
            }
        }
        async function queryAttempt() {
            return db.query(`${mapReduce.id}/default`, {
                descending: options.descending,
                group: true,
                group_level: mapReduce.groupLevel,
                limit: is.not.empty(limit) ? limit + skip + 1 : undefined
            });
        }
        async function rebuildIndex() {
            const doc = await db.get(`_design/${mapReduce.id}`);
            await db.put(Object.assign(Object.assign({}, doc), { views: { default: mapReduce.mapReduce } }));
        }
        function sliceDocs(docs) {
            if (is.not.empty(options.skip))
                return is.not.empty(options.limit)
                    ? docs.slice(options.skip, options.skip + options.limit)
                    : docs.slice(options.skip);
            return is.not.empty(options.limit) ? docs.slice(0, options.limit) : docs;
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
        const result = (0, reactiveStorage_1.reactiveStorage)({
            loaded: false,
            loading: true,
            refresh: fn.noop,
            unsubscribe: fn.noop
        });
        handlePromise_1.handlePromise.silent(this.reactiveFactoryGetAsync(request, handler, result));
        return result;
    }
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param handler - Handler.
     * @param result - Reactive result.
     * @returns Reactive response.
     */
    async reactiveFactoryGetAsync(request, handler, result) {
        result =
            result !== null && result !== void 0 ? result : (0, reactiveStorage_1.reactiveStorage)({
                loaded: false,
                loading: true,
                refresh: fn.noop,
                unsubscribe: fn.noop
            });
        o.assign(result, {
            loaded: true,
            loading: false,
            unsubscribe: () => {
                this.unsubscribe(subscription);
            },
            value: await request
        });
        assert.toBeTrue(result.loaded);
        const subscription = this.subscribe(doc => {
            assert.not.empty(result);
            assert.toBeTrue(result.loaded);
            handler(doc, result);
        });
        return result;
    }
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param handler - Handler.
     * @returns Reactive response.
     */
    reactiveFactoryGetAttached(request, handler) {
        const result = (0, reactiveStorage_1.reactiveStorage)({
            loaded: false,
            loading: true,
            refresh: fn.noop,
            unsubscribe: fn.noop
        });
        handlePromise_1.handlePromise.silent(this.reactiveFactoryGetAttachedAsync(request, handler, result));
        return result;
    }
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param handler - Handler.
     * @param result - Reactive result.
     * @returns Reactive response.
     */
    async reactiveFactoryGetAttachedAsync(request, handler, result) {
        result =
            result !== null && result !== void 0 ? result : (0, reactiveStorage_1.reactiveStorage)({
                loaded: false,
                loading: true,
                refresh: fn.noop,
                unsubscribe: fn.noop
            });
        o.assign(result, {
            loaded: true,
            loading: false,
            unsubscribe: () => {
                this.unsubscribeAttached(subscription);
            },
            value: await request
        });
        assert.toBeTrue(result.loaded);
        const subscription = this.subscribeAttached(doc => {
            assert.not.empty(result);
            assert.toBeTrue(result.loaded);
            handler(doc, result);
        });
        return result;
    }
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param config - Configuration.
     * @returns Reactive response.
     */
    reactiveFactoryQuery(request, config) {
        const result = (0, reactiveStorage_1.reactiveStorage)({
            loaded: false,
            loading: true,
            refresh: fn.noop,
            unsubscribe: fn.noop
        });
        handlePromise_1.handlePromise.silent(this.reactiveFactoryQueryAsync(request, config, result));
        return result;
    }
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param config - Configuration.
     * @param result - Reactive result.
     * @returns Reactive response.
     */
    async reactiveFactoryQueryAsync(request, config, result) {
        config = (0, reactiveStorage_1.reactiveStorage)(config);
        result =
            result !== null && result !== void 0 ? result : (0, reactiveStorage_1.reactiveStorage)({
                loaded: false,
                loading: true,
                refresh: fn.noop,
                unsubscribe: fn.noop
            });
        o.assign(result, {
            loaded: true,
            loading: false,
            unsubscribe: () => {
                reactiveStorage_1.reactiveStorage.unwatch(config, observer);
                this.unsubscribe(subscription);
                programFlow.clearTimeout(timeout);
            },
            value: await request(config.conditions, config.options)
        });
        assert.toBeTrue(result.loaded);
        const observer = reactiveStorage_1.reactiveStorage.watch(config, refresh);
        const subscription = this.subscribe(doc => {
            if (config.updateFn && config.updateFn(doc))
                refresh();
        });
        let timeout;
        updateTimeout();
        return result;
        function refresh() {
            handlePromise_1.handlePromise.silent(async () => {
                assert.not.empty(result);
                assert.toBeTrue(result.loaded);
                result.loading = true;
                const value = await request(config.conditions, config.options);
                assert.not.empty(result);
                assert.toBeTrue(result.loaded);
                result.loading = false;
                result.value = value;
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
        const result = (0, reactiveStorage_1.reactiveStorage)({
            loaded: false,
            loading: true,
            refresh: fn.noop,
            unsubscribe: fn.noop
        });
        handlePromise_1.handlePromise.silent(this.reactiveFactoryQueryAttachedAsync(request, config, result));
        return result;
    }
    /**
     * Reactive factory.
     *
     * @param request - Request.
     * @param config - Configuration.
     * @param result - Reactive result.
     * @returns Reactive response.
     */
    async reactiveFactoryQueryAttachedAsync(request, config, result) {
        config = (0, reactiveStorage_1.reactiveStorage)(config);
        result =
            result !== null && result !== void 0 ? result : (0, reactiveStorage_1.reactiveStorage)({
                loaded: false,
                loading: true,
                refresh: fn.noop,
                unsubscribe: fn.noop
            });
        o.assign(result, {
            loaded: true,
            loading: false,
            unsubscribe: () => {
                reactiveStorage_1.reactiveStorage.unwatch(config, observer);
                this.unsubscribeAttached(subscription);
                programFlow.clearTimeout(timeout);
            },
            value: await request(config.conditions, config.parentConditions, config.options)
        });
        assert.toBeTrue(result.loaded);
        const observer = reactiveStorage_1.reactiveStorage.watch(config, refresh);
        const subscription = this.subscribeAttached(doc => {
            if (config.updateFn && config.updateFn(doc))
                refresh();
        });
        let timeout;
        updateTimeout();
        return result;
        function refresh() {
            handlePromise_1.handlePromise.silent(async () => {
                assert.not.empty(result);
                assert.toBeTrue(result.loaded);
                result.loading = true;
                const value = await request(config.conditions, config.parentConditions, config.options);
                assert.not.empty(result);
                assert.toBeTrue(result.loaded);
                result.loading = false;
                result.value = value;
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
     * Reactive handler factory.
     *
     * @param id - ID.
     * @returns Reactive handler.
     */
    reactiveHandlerExists(id) {
        return (doc, mutableResult) => {
            if (doc._id === id)
                mutableResult.value = !doc._deleted;
        };
    }
    /**
     * Reactive handler factory.
     *
     * @param id - ID.
     * @param parentId - Parent ID.
     * @returns Reactive handler.
     */
    reactiveHandlerExistsAttached(id, parentId) {
        return (doc, mutableResult) => {
            if (doc._id === id && doc.parentDoc._id === parentId)
                mutableResult.value = !doc._deleted;
        };
    }
    /**
     * Reactive handler factory.
     *
     * @param id - ID.
     * @returns Reactive handler.
     */
    reactiveHandlerGet(id) {
        return (doc, mutableResult) => {
            if (doc._id === id)
                if (doc._deleted)
                    exports.handlers.error(new PouchNotFoundError_1.PouchNotFoundError("Missing document"));
                else
                    mutableResult.value = doc;
        };
    }
    /**
     * Reactive handler factory.
     *
     * @param id - ID.
     * @param parentId - Parent ID.
     * @returns Reactive handler.
     */
    reactiveHandlerGetAttached(id, parentId) {
        return (doc, mutableResult) => {
            if (doc._id === id && doc.parentDoc._id === parentId)
                if (doc._deleted)
                    exports.handlers.error(new PouchNotFoundError_1.PouchNotFoundError("Missing attached document"));
                else
                    mutableResult.value = doc;
        };
    }
    /**
     * Reactive handler factory.
     *
     * @param id - ID.
     * @param parentId - Parent ID.
     * @returns Reactive handler.
     */
    reactiveHandlerGetAttachedIfExists(id, parentId) {
        return (doc, mutableResult) => {
            if (doc._id === id && doc.parentDoc._id === parentId)
                mutableResult.value = doc._deleted ? undefined : doc;
        };
    }
    /**
     * Reactive handler factory.
     *
     * @param id - ID.
     * @returns Reactive handler.
     */
    reactiveHandlerGetIfExists(id) {
        return (doc, mutableResult) => {
            if (doc._id === id)
                mutableResult.value = doc._deleted ? undefined : doc;
        };
    }
    /**
     * Refreshes subscriptions.
     */
    refreshSubscription() {
        if (this.db &&
            this.changesHandlersPool.size + this.changesHandlersAttachedPool.size > 0)
            if (this.changes) {
                // Already exists
            }
            else
                this.changes = this.db.changes(value => {
                    var _a;
                    assert.byGuard(value.doc, isExistingDocument);
                    if (this.changesHandlersPool.size) {
                        const doc = extractDoc(value.doc);
                        for (const handler of this.changesHandlersPool.values())
                            handler(doc);
                    }
                    if (this.changesHandlersAttachedPool.size)
                        for (const lastAttachedDoc of (_a = value.doc.lastAttachedDocs) !== null && _a !== void 0 ? _a : []) {
                            const attachedDoc = extractDocAttached(value.doc, lastAttachedDoc, true);
                            for (const handler of this.changesHandlersAttachedPool.values())
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
            // Already cancelled
        }
    }
}
exports.Database = Database;
const isDocResponse = is.object.factory({ doc: is.unknown, key: is.unknown }, {});
const isDocResponses = is.factory(is.array.of, isDocResponse);
const isDocsResponse = is.object.factory({
    count: is.number,
    docs: isDocResponses,
    settled: is.boolean
}, {});
const isStoredDocumentAttached = is.object.factory({ _id: is.number, _rev: is.number }, { _deleted: is.true });
const isStoredDocumentAttachedArray = is.factory(is.array.of, isStoredDocumentAttached);
const isExistingDocument = is.object.factory({ _id: is.string, _rev: is.string }, {
    _deleted: is.true,
    attachedDocs: isStoredDocumentAttachedArray,
    lastAttachedDocs: is.numbers
});
const isExistingDocumentAttached = is.object.factory({
    _id: is.number,
    _rev: is.number,
    parentDoc: isExistingDocument
}, { _deleted: is.true });
/**
 * Joins condition strings with boolean "and" operator.
 *
 * @param conditions - Condition strings.
 * @returns Joined condition string.
 */
function and(conditions) {
    conditions = conditions.filter(condition => condition !== "true");
    if (conditions.length === 0)
        return "true";
    assert.toBeFalse(conditions.includes("false"));
    return conditions.join(" && ");
}
/**
 * Converts conditions to condition strings.
 *
 * @param source - Source.
 * @param conditions - Conditions.
 * @returns Condition strings.
 */
function condsToStr(source, conditions) {
    conditions = is.array(conditions) ? conditions : [conditions];
    const toEmit = [];
    const toOutput = [];
    const toSettle = [];
    for (const conditionsGroup of conditions)
        for (const [key, fieldConditions] of o.entries(conditionsGroup)) {
            const dest = `${source}.${key}`;
            const destDelta = `new Date(${dest}).getTime() - Date.now()`;
            if ("isSet" in fieldConditions)
                toEmit.push(fieldConditions.isSet
                    ? `(${dest} !== null && ${dest} !== undefined)`
                    : `(${dest} === null || ${dest} === undefined)`);
            if ("eq" in fieldConditions)
                toEmit.push(`(${dest} === ${escapeForJs(fieldConditions.eq)})`);
            if ("neq" in fieldConditions)
                toEmit.push(`(${dest} !== ${escapeForJs(fieldConditions.neq)})`);
            if ("gt" in fieldConditions)
                toEmit.push(`(${dest} > ${escapeForJs(fieldConditions.gt)})`);
            if ("gte" in fieldConditions)
                toEmit.push(`(${dest} >= ${escapeForJs(fieldConditions.gte)})`);
            if ("lt" in fieldConditions)
                toEmit.push(`(${dest} < ${escapeForJs(fieldConditions.lt)})`);
            if ("lte" in fieldConditions)
                toEmit.push(`(${dest} <= ${escapeForJs(fieldConditions.lte)})`);
            if ("dateEq" in fieldConditions) {
                const value = dateValue(fieldConditions.dateEq);
                const delta = dateDelta(value);
                toEmit.push(`(${dest} && ${destDelta} > ${delta})`);
                toSettle.push(`(${destDelta} < ${delta})`);
                toOutput.push(`(${dest} === ${escapeForJs(value)})`);
            }
            if ("dateNeq" in fieldConditions) {
                const value = dateValue(fieldConditions.dateNeq);
                const delta = dateDelta(value);
                toEmit.push(`(${dest} && ${destDelta} > ${delta})`);
                toSettle.push(`(${destDelta} < ${delta})`);
                toOutput.push(`(${dest} !== ${escapeForJs(value)})`);
            }
            if ("dateGt" in fieldConditions) {
                const value = dateValue(fieldConditions.dateGt);
                const delta = dateDelta(value);
                toEmit.push(`(${dest} && ${destDelta} > ${delta})`);
                toSettle.push(`(${destDelta} < ${delta})`);
                toOutput.push(`(${dest} > ${escapeForJs(value)})`);
            }
            if ("dateGte" in fieldConditions) {
                const value = dateValue(fieldConditions.dateGte);
                const delta = dateDelta(value);
                toEmit.push(`(${dest} && ${destDelta} > ${delta})`);
                toSettle.push(`(${destDelta} < ${delta})`);
                toOutput.push(`(${dest} >= ${escapeForJs(value)})`);
            }
            if ("dateLt" in fieldConditions) {
                const value = dateValue(fieldConditions.dateLt);
                const delta = dateDelta(value);
                toEmit.push(`${dest}`);
                toSettle.push(`(${destDelta} < ${delta})`);
                toOutput.push(`(${dest} < ${escapeForJs(value)})`);
            }
            if ("dateLte" in fieldConditions) {
                const value = dateValue(fieldConditions.dateLte);
                const delta = dateDelta(value);
                toEmit.push(`${dest}`);
                toSettle.push(`(${destDelta} < ${delta})`);
                toOutput.push(`(${dest} <= ${escapeForJs(value)})`);
            }
        }
    return {
        toEmit: and(toEmit),
        toOutput: and(toOutput),
        toSettle: and(toSettle)
    };
}
// eslint-disable-next-line @skylib/require-jsdoc
function dateDelta(date) {
    return num.round.step(datetime_1.datetime.create(date).toTime() - datetime_1.datetime.time() - 50 * 3600 * 1000, 3600 * 1000);
}
// eslint-disable-next-line @skylib/require-jsdoc
function dateValue(date) {
    if (is.string(date))
        return date;
    if (date.length === 1)
        date = [date[0], "+", 0, "minutes"];
    const [type, sign, value, unit] = date;
    const result = datetime_1.datetime.create();
    switch (type) {
        case "endOfDay":
            result.setStartOfDay().add(1, "day");
            break;
        case "endOfHour":
            result.setStartOfHour().add(1, "hour");
            break;
        case "endOfMonth":
            result.setStartOfMonth().add(1, "month");
            break;
        case "endOfWeek":
            result.setStartOfWeekLocale().add(1, "week");
            break;
        case "now":
            break;
        case "startOfDay":
            result.setStartOfDay();
            break;
        case "startOfHour":
            result.setStartOfHour();
            break;
        case "startOfMonth":
            result.setStartOfMonth();
            break;
        case "startOfWeek":
            result.setStartOfWeekLocale();
            break;
    }
    switch (sign) {
        case "-":
            result.sub(value, unit);
            break;
        case "+":
            result.add(value, unit);
    }
    return result.toString();
}
/**
 * Escapes value for use in map/reduce functions.
 *
 * @param value - Value.
 * @returns Escaped value.
 */
function escapeForJs(value) {
    switch (typeof value) {
        case "boolean":
            return value ? "true" : "false";
        case "number":
            return cast.string(value);
        case "string":
            return json.encode(value);
        default:
            throw new Error(`Unexpected value type: ${typeof value}`);
    }
}
/**
 * Extracts document.
 *
 * @param rawDoc - Raw document.
 * @returns Document.
 */
function extractDoc(rawDoc) {
    return rawDoc.attachedDocs ? Object.assign(Object.assign({}, rawDoc), { attachedDocs: [] }) : rawDoc;
}
/**
 * Extracts attached document.
 *
 * @param rawDoc - Document.
 * @param id - Attached document ID.
 * @param extractDeleted - Extract deleted documents.
 * @returns Attached document.
 */
function extractDocAttached(rawDoc, id, extractDeleted = false) {
    const { attachedDocs } = rawDoc, parentDoc = tslib_1.__rest(rawDoc, ["attachedDocs"]);
    assert.not.empty(attachedDocs, () => new PouchNotFoundError_1.PouchNotFoundError("Missing attached document"));
    const attachedDoc = attachedDocs[id];
    assert.not.empty(attachedDoc, () => new PouchNotFoundError_1.PouchNotFoundError("Missing attached document"));
    assert.toBeTrue(extractDeleted || is.empty(attachedDoc._deleted), () => new PouchNotFoundError_1.PouchNotFoundError("Missing attached document"));
    return Object.assign(Object.assign({}, attachedDoc), { parentDoc: Object.assign(Object.assign({}, parentDoc), { attachedDocs: [] }) });
}
/**
 * Validates document.
 *
 * @param doc - Document.
 */
function validatePutDocument(doc) {
    var _a, _b;
    if (o.hasOwnProp("_attachments", doc))
        throw new Error("Put document contains reserved word: _attachments");
    if (o.hasOwnProp("_conflicts", doc))
        throw new Error("Put document contains reserved word: _conflicts");
    if (o.hasOwnProp("filters", doc))
        throw new Error("Put document contains reserved word: filters");
    if (o.hasOwnProp("views", doc))
        throw new Error("Put document contains reserved word: views");
    if ((_b = (_a = doc.attachedDocs) === null || _a === void 0 ? void 0 : _a.some((attachedDoc, index) => attachedDoc._id !== index)) !== null && _b !== void 0 ? _b : false)
        throw new Error("Invalid attached document");
}
/**
 * Uglify javascript code.
 *
 * @param code - Code.
 * @returns Uglified code.
 */
function uglify(code) {
    return code.trim().replace(/\s+/gu, " ");
}
//# sourceMappingURL=Database.js.map