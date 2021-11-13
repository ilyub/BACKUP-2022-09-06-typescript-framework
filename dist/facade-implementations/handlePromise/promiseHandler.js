"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = exports.getConfiguration = exports.configure = exports.handlers = void 0;
const tslib_1 = require("tslib");
const progressReporter_1 = require("@skylib/facades/dist/progressReporter");
const showAlert_1 = require("@skylib/facades/dist/showAlert");
const fn = (0, tslib_1.__importStar)(require("@skylib/functions/dist/function"));
const o = (0, tslib_1.__importStar)(require("@skylib/functions/dist/object"));
exports.handlers = o.freeze({
    error(error) {
        throw error;
    }
});
/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
function configure(config) {
    o.assign(moduleConfig, config);
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
/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/
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
    const promise = fn.run(promiseAsync);
    const progress = type
        ? progressReporter_1.progressReporter.spawn().setAuto(moduleConfig.expectedDurations[type])
        : undefined;
    promisesPool.set(id, promise);
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
            (0, showAlert_1.showAlert)(errorMessage);
        exports.handlers.error(reason);
    }
}
//# sourceMappingURL=promiseHandler.js.map