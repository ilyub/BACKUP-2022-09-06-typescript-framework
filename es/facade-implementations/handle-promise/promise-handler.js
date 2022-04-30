import { progressReporter, showAlert } from "@skylib/facades";
import { fn, o } from "@skylib/functions";
// eslint-disable-next-line @skylib/primary-export-only -- Ok
export const handlers = {
    error(error) {
        throw error;
    }
};
export const promiseHandler = {
    configure(config) {
        o.assign(moduleConfig, config);
    },
    getConfiguration() {
        return moduleConfig;
    },
    async runAll() {
        await Promise.all(promises.values());
    },
    running() {
        return promises.size > 0;
    },
    silent(mixed, errorMessage = "") {
        handle(mixed, undefined, errorMessage);
    },
    verbose(mixed, type, errorMessage = "") {
        handle(mixed, type, errorMessage);
    }
};
const moduleConfig = {
    expectedDurations: {
        createDb: 10000,
        dbRequest: 10000,
        destroyDb: 10000,
        httpRequest: 10000,
        navigation: 10000
    }
};
const promises = new Map();
/**
 * Handles promise.
 *
 * @param mixed - Promise or async function.
 * @param type - Type (determines expected duration for progress reporting).
 * @param errorMessage - Error message (used to alert user on error).
 */
function handle(mixed, type, errorMessage) {
    const id = Symbol("promise-id");
    const promise = fn.run(mixed);
    const progress = type
        ? progressReporter.spawn().setAuto(moduleConfig.expectedDurations[type])
        : undefined;
    promises.set(id, promise);
    // eslint-disable-next-line github/no-then, promise/prefer-await-to-then -- Ok
    promise.catch(rejected).then(fulfilled).catch(rejected);
    function fulfilled() {
        promises.delete(id);
        progress === null || progress === void 0 ? void 0 : progress.done();
    }
    function rejected(reason) {
        promises.delete(id);
        progress === null || progress === void 0 ? void 0 : progress.done();
        if (errorMessage)
            showAlert(errorMessage);
        handlers.error(reason);
    }
}
//# sourceMappingURL=promise-handler.js.map