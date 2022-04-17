"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfiguration = exports.configure = exports.implementation = exports.handlers = void 0;
const facades_1 = require("@skylib/facades");
const functions_1 = require("@skylib/functions");
exports.handlers = functions_1.o.freeze({
    error(error) {
        throw error;
    }
});
exports.implementation = {
    async runAll() {
        await Promise.all(promisesPool.values());
    },
    running() {
        return promisesPool.size > 0;
    },
    silent(promiseAsync, errorMessage = "") {
        handle(promiseAsync, undefined, errorMessage);
    },
    verbose(promiseAsync, type, errorMessage = "") {
        handle(promiseAsync, type, errorMessage);
    }
};
/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
function configure(config) {
    functions_1.o.assign(moduleConfig, config);
}
exports.configure = configure;
/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
function getConfiguration() {
    return moduleConfig;
}
exports.getConfiguration = getConfiguration;
const promisesPool = new Map();
const moduleConfig = {
    expectedDurations: {
        createDb: 10000,
        dbRequest: 10000,
        destroyDb: 10000,
        httpRequest: 10000,
        navigation: 10000
    }
};
/**
 * Handles promise.
 *
 * @param promiseAsync - Promise or asynchronous function.
 * @param type - Type (determines expected duration for progress reporting).
 * @param errorMessage - Error message (used to alert user on error).
 */
function handle(promiseAsync, type, errorMessage) {
    const id = Symbol("PromiseId");
    const promise = functions_1.fn.run(promiseAsync);
    const progress = type
        ? facades_1.progressReporter.spawn().setAuto(moduleConfig.expectedDurations[type])
        : undefined;
    promisesPool.set(id, promise);
    // eslint-disable-next-line github/no-then, promise/prefer-await-to-then -- ???
    promise.catch(rejected).then(fulfilled).catch(rejected);
    /**
     * Fulfilled callback.
     */
    function fulfilled() {
        promisesPool.delete(id);
        progress === null || progress === void 0 ? void 0 : progress.done();
    }
    /**
     * Rejected callback.
     *
     * @param reason - Reason.
     */
    function rejected(reason) {
        promisesPool.delete(id);
        progress === null || progress === void 0 ? void 0 : progress.done();
        if (errorMessage)
            (0, facades_1.showAlert)(errorMessage);
        exports.handlers.error(reason);
    }
}
//# sourceMappingURL=promiseHandler.js.map