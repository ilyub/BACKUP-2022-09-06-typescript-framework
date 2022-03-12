"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = exports.getConfiguration = exports.configure = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const o = tslib_1.__importStar(require("@skylib/functions/dist/object"));
/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
function configure(config) {
    o.assign(moduleConfig, config);
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
exports.implementation = {
    async send(url, method = "get", data = {}, headers = {}) {
        const response = await (0, axios_1.default)({
            data,
            headers,
            method,
            timeout: moduleConfig.timeout,
            url
        });
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return response.data;
    }
};
/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/
const moduleConfig = {
    timeout: 30000
};
//# sourceMappingURL=axios-wrapper.js.map