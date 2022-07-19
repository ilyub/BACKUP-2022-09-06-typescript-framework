import { progressReporter, showAlert } from "@skylib/facades";
import { evaluate } from "@skylib/functions";
import { handleError } from "./handle-error";
export const moduleConfig = {
    expectedDurations: {
        createDb: 10000,
        dbRequest: 10000,
        destroyDb: 10000,
        httpRequest: 10000,
        navigation: 10000
    }
};
export const promises = new Map();
/**
 * Handles promise.
 *
 * @param mixed - Promise or async function.
 * @param type - Type (determines expected duration for progress reporting).
 * @param errorMessage - Error message (used to alert user on error).
 */
export function handle(mixed, type, errorMessage) {
    const id = Symbol("promise-id");
    const promise = evaluate(mixed);
    const progress = type
        ? progressReporter.spawn().setAuto(moduleConfig.expectedDurations[type])
        : undefined;
    promises.set(id, promise);
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
        handleError(reason);
    }
}
//# sourceMappingURL=index.js.map