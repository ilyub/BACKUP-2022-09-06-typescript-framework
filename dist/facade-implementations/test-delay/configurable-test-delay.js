"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurableTestDelay = void 0;
const functions_1 = require("@skylib/functions");
exports.configurableTestDelay = (0, functions_1.defineFn)(async () => {
    if (moduleConfig.enabled)
        await (0, functions_1.wait)(moduleConfig.timeout);
}, {
    configure: config => {
        functions_1.o.assign(moduleConfig, config);
    },
    getConfiguration: () => moduleConfig
});
const moduleConfig = {
    enabled: false,
    timeout: 100
};
//# sourceMappingURL=configurable-test-delay.js.map