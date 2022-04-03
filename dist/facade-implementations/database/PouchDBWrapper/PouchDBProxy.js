"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PouchDBProxy = exports.handlers = void 0;
const tslib_1 = require("tslib");
const pouchdb_1 = tslib_1.__importDefault(require("pouchdb"));
const testDelay_1 = require("@skylib/facades/dist/testDelay");
const is = tslib_1.__importStar(require("@skylib/functions/dist/guards"));
const o = tslib_1.__importStar(require("@skylib/functions/dist/object"));
const PouchConflictError_1 = require("./errors/PouchConflictError");
const PouchNotFoundError_1 = require("./errors/PouchNotFoundError");
exports.handlers = o.freeze({
    error(error) {
        throw wrapPouchError(error);
    }
});
class PouchDBProxy {
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
        this.db = new pouchdb_1.default(name, options);
    }
    /**
     * Creates or updates multiple documents.
     *
     * @param docs - Documents.
     * @returns Responses.
     */
    async bulkDocs(docs) {
        await (0, testDelay_1.testDelay)();
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
            .on("error", exports.handlers.error);
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
        await (0, testDelay_1.testDelay)();
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
        await (0, testDelay_1.testDelay)();
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
    async post(doc) {
        await (0, testDelay_1.testDelay)();
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
        await (0, testDelay_1.testDelay)();
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
        await (0, testDelay_1.testDelay)();
        try {
            return await this.db.query(mapReduce, o.unfreeze(options));
        }
        catch (e) {
            throw wrapPouchError(e);
        }
    }
}
exports.PouchDBProxy = PouchDBProxy;
const isWrappablePouchError = is.object.of.factory({
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
            return new PouchNotFoundError_1.PouchNotFoundError(value.message);
        if (value.status === 409 && value.name === "conflict")
            return new PouchConflictError_1.PouchConflictError(value.message);
        return new Error(value.message);
    }
    return value;
}
//# sourceMappingURL=PouchDBProxy.js.map