"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseHandler = void 0;
const core_1 = require("./core");
const functions_1 = require("@skylib/functions");
exports.promiseHandler = (0, functions_1.defineFn)((type, mixed, errorMessage = "") => {
    (0, core_1.handle)(mixed, type, errorMessage);
}, {
    configure: (config) => {
        functions_1.o.assign(core_1.moduleConfig, config);
    },
    getConfiguration: () => core_1.moduleConfig,
    runAll: async () => {
        await Promise.all(core_1.promises.values());
    },
    running: () => core_1.promises.size > 0,
    silent: (mixed, errorMessage = "") => {
        (0, core_1.handle)(mixed, undefined, errorMessage);
    }
});
//# sourceMappingURL=index.js.map