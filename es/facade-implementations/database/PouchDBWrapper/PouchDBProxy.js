import { testDelay } from "@skylib/facades";
import { is, o } from "@skylib/functions";
import pouchdb from "pouchdb";
import { PouchConflictError, PouchNotFoundError } from "./errors";
export const handlers = o.freeze({
    error(error) {
        throw wrapPouchError(error);
    }
});
export class PouchDBProxy {
    /**
     * Creates class instance.
     *
     * @param name - Database name.
     * @param options - Database options.
     */
    constructor(name, options) {
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.db = new pouchdb(name, options);
    }
    /**
     * Creates or updates multiple documents.
     *
     * @param docs - Documents.
     * @returns Responses.
     */
    async bulkDocs(
    // eslint-disable-next-line @skylib/no-mutable-signature -- ??
    docs) {
        await testDelay();
        try {
            return await this.db.bulkDocs(o.unfreeze(docs));
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
        const changes = this.db
            .changes(o.unfreeze(options))
            .on("change", changesHandler)
            .on("error", handlers.error);
        return {
            cancel() {
                changes.cancel();
            }
        };
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
     * Posts document.
     *
     * @param doc - Document.
     * @returns Response.
     */
    // eslint-disable-next-line @skylib/no-mutable-signature -- ??
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
    // eslint-disable-next-line @skylib/no-mutable-signature -- ??
    async put(doc) {
        await testDelay();
        try {
            return await this.db.put(o.unfreeze(doc));
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
     * @returns Query response.
     */
    async query(mapReduce, options) {
        await testDelay();
        try {
            return await this.db.query(mapReduce, o.unfreeze(options));
        }
        catch (e) {
            throw wrapPouchError(e);
        }
    }
}
const isWrappablePouchError = is.object.factory({
    error: is.true,
    message: is.string,
    name: is.string,
    status: is.number
}, {});
/**
 * Converts pouch error to conventional error.
 *
 * @param value - Value.
 * @returns Converted pouch error or original value.
 */
function wrapPouchError(value) {
    if (isWrappablePouchError(value)) {
        if (value.status === 404 && value.name === "not_found")
            return new PouchNotFoundError(value.message);
        if (value.status === 409 && value.name === "conflict")
            return new PouchConflictError(value.message);
        return new Error(value.message);
    }
    return value;
}
//# sourceMappingURL=PouchDBProxy.js.map