"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfiguration = exports.configure = exports.pluralReduce = exports.moduleConfig = void 0;
const facades_1 = require("@skylib/facades");
const functions_1 = require("@skylib/functions");
exports.moduleConfig = (0, functions_1.onDemand)(() => (0, facades_1.reactiveStorage)({ localeName: "en-US" }));
exports.pluralReduce = (0, functions_1.defineFn)(
// eslint-disable-next-line @skylib/require-jsdoc -- Ok
(count) => {
    count = Math.abs(count);
    return count === 1 ? 1 : 2;
}, {
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    ru(count) {
        count = Math.abs(count);
        if (count >= 10 && count <= 19)
            return 5;
        if (count % 10 === 1)
            return 1;
        if (count % 10 === 2)
            return 2;
        if (count % 10 === 3)
            return 2;
        if (count % 10 === 4)
            return 2;
        return 5;
    }
});
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
//# sourceMappingURL=index.js.map