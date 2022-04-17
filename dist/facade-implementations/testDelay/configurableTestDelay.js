"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfiguration = exports.configure = exports.moduleConfig = exports.implementation = void 0;
const functions_1 = require("@skylib/functions");
const implementation = async () => {
    if (exports.moduleConfig.enabled)
        await (0, functions_1.wait)(exports.moduleConfig.timeout);
};
exports.implementation = implementation;
exports.moduleConfig = { enabled: false, timeout: 100 };
/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
function configure(config) {
    functions_1.o.assign(exports.moduleConfig, config);
}
exports.configure = configure;
/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
function getConfiguration() {
    return exports.moduleConfig;
}
exports.getConfiguration = getConfiguration;
//# sourceMappingURL=configurableTestDelay.js.map