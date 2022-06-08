"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseHandler = void 0;
const core_1 = require("./core");
const functions_1 = require("@skylib/functions");
exports.promiseHandler = (0, functions_1.defineFn)(
// eslint-disable-next-line @skylib/require-jsdoc -- Ok
(type, mixed, errorMessage = "") => {
    (0, core_1.handle)(mixed, type, errorMessage);
}, {
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    configure: (config) => {
        functions_1.o.assign(core_1.moduleConfig, config);
    },
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    getConfiguration: () => core_1.moduleConfig,
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    runAll: async () => {
        await Promise.all(core_1.promises.values());
    },
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    running: () => core_1.promises.size > 0,
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    silent: (mixed, errorMessage = "") => {
        (0, core_1.handle)(mixed, undefined, errorMessage);
    }
});
//# sourceMappingURL=index.js.map