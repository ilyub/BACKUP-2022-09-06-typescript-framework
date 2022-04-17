import { progressReporter, showAlert } from "@skylib/facades";
import { fn, o } from "@skylib/functions";
export const handlers = o.freeze({
    error(error) {
        throw error;
    }
});
export const implementation = {
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
export function configure(config) {
    o.assign(moduleConfig, config);
}
/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
export function getConfiguration() {
    return moduleConfig;
}
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
        ? progressReporter.spawn().setAuto(moduleConfig.expectedDurations[type])
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
            showAlert(errorMessage);
        handlers.error(reason);
    }
}
//# sourceMappingURL=promiseHandler.js.map