"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = exports.promises = exports.moduleConfig = void 0;
const handle_error_1 = require("./handle-error");
const facades_1 = require("@skylib/facades");
const functions_1 = require("@skylib/functions");
exports.moduleConfig = {
    expectedDurations: {
        createDb: 10000,
        dbRequest: 10000,
        destroyDb: 10000,
        httpRequest: 10000,
        navigation: 10000
    }
};
exports.promises = new Map();
/**
 * Handles promise.
 *
 * @param mixed - Promise or async function.
 * @param type - Type (determines expected duration for progress reporting).
 * @param errorMessage - Error message (used to alert user on error).
 */
function handle(mixed, type, errorMessage) {
    const id = Symbol("promise-id");
    const promise = (0, functions_1.evaluate)(mixed);
    const progress = type
        ? facades_1.progressReporter.spawn().setAuto(exports.moduleConfig.expectedDurations[type])
        : undefined;
    exports.promises.set(id, promise);
    promise.catch(rejected).then(fulfilled).catch(rejected);
    function fulfilled() {
        exports.promises.delete(id);
        progress === null || progress === void 0 ? void 0 : progress.done();
    }
    function rejected(reason) {
        exports.promises.delete(id);
        progress === null || progress === void 0 ? void 0 : progress.done();
        if (errorMessage)
            (0, facades_1.showAlert)(errorMessage);
        (0, handle_error_1.handleError)(reason);
    }
}
exports.handle = handle;
//# sourceMappingURL=index.js.map