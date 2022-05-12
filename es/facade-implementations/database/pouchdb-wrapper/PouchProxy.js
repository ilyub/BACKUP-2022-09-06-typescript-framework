import { handlePouchError, wrapPouchError } from "./core";
import { testDelay } from "@skylib/facades";
import { a } from "@skylib/functions";
import pouchdb from "pouchdb";
export class PouchProxy {
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
        this.db = new pouchdb(name, config);
    }
    /**
     * Creates, updates or deletes multiple documents.
     *
     * @param docs - Documents.
     * @returns Responses.
     */
    async bulkDocs(docs) {
        await testDelay();
        try {
            return await this.db.bulkDocs(a.clone(docs));
        }
        catch (e) {
            throw wrapPouchError(e);
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
            .on("error", handlePouchError);
    }
    /**
     * Destroys database.
     */
    async destroy() {
        await testDelay();
        try {
            await this.db.destroy();
        }
        catch (e) {
            throw wrapPouchError(e);
        }
    }
    /**
     * Fetches document.
     *
     * @param id - ID.
     * @returns Document.
     */
    async get(id) {
        await testDelay();
        try {
            return await this.db.get(id);
        }
        catch (e) {
            throw wrapPouchError(e);
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
        await testDelay();
        try {
            return await this.db.post(doc);
        }
        catch (e) {
            throw wrapPouchError(e);
        }
    }
    /**
     * Puts document.
     *
     * @param doc - Document.
     * @returns Response.
     */
    async put(doc) {
        await testDelay();
        try {
            return await this.db.put(doc);
        }
        catch (e) {
            throw wrapPouchError(e);
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
        await testDelay();
        try {
            return await this.db.query(mapReduce, options);
        }
        catch (e) {
            throw wrapPouchError(e);
        }
    }
}
//# sourceMappingURL=PouchProxy.js.map