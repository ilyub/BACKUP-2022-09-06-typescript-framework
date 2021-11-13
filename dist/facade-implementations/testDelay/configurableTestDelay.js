"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleConfig = exports.getConfiguration = exports.configure = exports.implementation = void 0;
const tslib_1 = require("tslib");
const helpers_1 = require("@skylib/functions/dist/helpers");
const o = (0, tslib_1.__importStar)(require("@skylib/functions/dist/object"));
const implementation = async () => {
    if (exports.moduleConfig.enabled)
        await (0, helpers_1.wait)(exports.moduleConfig.timeout);
};
exports.implementation = implementation;
/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
function configure(config) {
    o.assign(exports.moduleConfig, config);
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
/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/
exports.moduleConfig = {
    enabled: false,
    timeout: 100
};
//# sourceMappingURL=configurableTestDelay.js.map