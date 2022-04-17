"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfiguration = exports.configure = exports.implementation = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const axios_1 = tslib_1.__importDefault(require("axios"));
exports.implementation = {
    async send(url, method = "get", data = {}, headers = {}) {
        const response = await (0, axios_1.default)({
            data,
            headers,
            method,
            timeout: moduleConfig.timeout,
            url
        });
        return response.data;
    }
};
/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
function configure(config) {
    functions_1.o.assign(moduleConfig, config);
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
const moduleConfig = { timeout: 30000 };
//# sourceMappingURL=axios-wrapper.js.map