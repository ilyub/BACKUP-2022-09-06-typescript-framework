"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurableTestDelay = void 0;
const functions_1 = require("@skylib/functions");
exports.configurableTestDelay = (0, functions_1.defineFn)(
// eslint-disable-next-line @skylib/require-jsdoc -- Ok
async () => {
    if (moduleConfig.enabled)
        await (0, functions_1.wait)(moduleConfig.timeout);
}, {
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    configure: (config) => {
        functions_1.o.assign(moduleConfig, config);
    },
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    getConfiguration: () => moduleConfig
});
const moduleConfig = {
    enabled: false,
    timeout: 100
};
//# sourceMappingURL=configurable-test-delay.js.map