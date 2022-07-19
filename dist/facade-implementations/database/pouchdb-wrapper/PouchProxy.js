"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PouchProxy = void 0;
const tslib_1 = require("tslib");
const core_1 = require("./core");
const functions_1 = require("@skylib/functions");
const pouchdb_1 = tslib_1.__importDefault(require("pouchdb"));
const facades_1 = require("@skylib/facades");
class PouchProxy {
    /**
     * Creates class instance.
     *
     * @param name - Database name.
     * @param config - Database configuration.
     */
    constructor(name, config) {
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.db = new pouchdb_1.default(name, config);
    }
    /**
     * Creates, updates or deletes multiple documents.
     *
     * @param docs - Documents.
     * @returns Responses.
     */
    async bulkDocs(docs) {
        await (0, facades_1.testDelay)();
        try {
            return await this.db.bulkDocs(functions_1.a.clone(docs));
        }
        catch (e) {
            throw (0, core_1.wrapPouchError)(e);
        }
    }
    /**
     * Subscribes to changes.
     *
     * @param changesHandler - Changes handler.
     * @param options - Options.
     * @returns Subscription ID.
     */
    changes(changesHandler, options) {
        return this.db
            .changes(options)
            .on("change", changesHandler)
            .on("error", core_1.handlePouchError);
    }
    /**
     * Destroys database.
     */
    async destroy() {
        await (0, facades_1.testDelay)();
        try {
            await this.db.destroy();
        }
        catch (e) {
            throw (0, core_1.wrapPouchError)(e);
        }
    }
    /**
     * Fetches document.
     *
     * @param id - ID.
     * @returns Document.
     */
    async get(id) {
        await (0, facades_1.testDelay)();
        try {
            return await this.db.get(id);
        }
        catch (e) {
            throw (0, core_1.wrapPouchError)(e);
        }
    }
    /**
     * Returns original PouchDB database.
     *
     * @returns Original PouchDB database.
     */
    getRawDb() {
        return this.db;
    }
    /**
     * Posts document.
     *
     * @param doc - Document.
     * @returns Response.
     */
    async post(doc) {
        await (0, facades_1.testDelay)();
        try {
            return await this.db.post(doc);
        }
        catch (e) {
            throw (0, core_1.wrapPouchError)(e);
        }
    }
    /**
     * Puts document.
     *
     * @param doc - Document.
     * @returns Response.
     */
    async put(doc) {
        await (0, facades_1.testDelay)();
        try {
            return await this.db.put(doc);
        }
        catch (e) {
            throw (0, core_1.wrapPouchError)(e);
        }
    }
    /**
     * Queries database.
     *
     * @param mapReduce - The name of a view in an existing design document.
     * @param options - Options.
     * @returns Response.
     */
    async query(mapReduce, options) {
        await (0, facades_1.testDelay)();
        try {
            return await this.db.query(mapReduce, options);
        }
        catch (e) {
            throw (0, core_1.wrapPouchError)(e);
        }
    }
}
exports.PouchProxy = PouchProxy;
//# sourceMappingURL=PouchProxy.js.map