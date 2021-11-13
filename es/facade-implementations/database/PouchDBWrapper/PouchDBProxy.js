import { testDelay } from "@skylib/facades/es/testDelay";
import * as fn from "@skylib/functions/es/function";
import * as is from "@skylib/functions/es/guards";
import * as o from "@skylib/functions/es/object";
import { PouchConflictError } from "./errors/PouchConflictError";
import { PouchNotFoundError } from "./errors/PouchNotFoundError";
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
        this.name = name;
        this.options = options;
    }
    /**
     * Creates or updates multiple documents.
     *
     * @param docs - Documents.
     * @returns Responses.
     */
    async bulkDocs(docs) {
        const db = await this.getDb();
        try {
            return await db.bulkDocs(o.unfreeze.deep(docs));
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
    async changes(changesHandler, options) {
        const db = await this.getDb();
        const changes = db
            .changes(o.unfreeze.deep(options))
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
        const db = await this.getDb();
        try {
            await db.destroy();
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
        const db = await this.getDb();
        try {
            return await db.get(id);
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
    async getDb() {
        await testDelay();
        if (this.db)
            return this.db;
        const pouchDBConstructor = await this.getPouchDBConstructor();
        try {
            this.db = new pouchDBConstructor(this.name, this.options);
        }
        catch (e) {
            throw wrapPouchError(e);
        }
        return this.db;
    }
    /**
     * Posts document.
     *
     * @param doc - Document.
     * @returns Response.
     */
    async post(doc) {
        const db = await this.getDb();
        try {
            return await db.post(doc);
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
        const db = await this.getDb();
        try {
            return await db.put(o.unfreeze.deep(doc));
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
        const db = await this.getDb();
        try {
            return await db.query(mapReduce, o.unfreeze.deep(options));
        }
        catch (e) {
            throw wrapPouchError(e);
        }
    }
    /**
     * Returns PouchDB constructor.
     *
     * @returns PouchDB constructor.
     */
    async getPouchDBConstructor() {
        if (PouchDBProxy.pouchDBConstructor)
            return PouchDBProxy.pouchDBConstructor;
        PouchDBProxy.pouchDBConstructor = fn.run(async () => {
            const pouchdbModule = await import("pouchdb");
            return pouchdbModule.default;
        });
        return PouchDBProxy.pouchDBConstructor;
    }
}
const isWrappablePouchError = is.factory(is.object.of, {
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