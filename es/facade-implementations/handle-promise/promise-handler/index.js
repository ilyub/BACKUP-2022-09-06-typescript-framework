import { handle, moduleConfig, promises } from "./core";
import { defineFn, o } from "@skylib/functions";
export const promiseHandler = defineFn(
// eslint-disable-next-line @skylib/require-jsdoc -- Ok
(type, mixed, errorMessage = "") => {
    handle(mixed, type, errorMessage);
}, {
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    configure: (config) => {
        o.assign(moduleConfig, config);
    },
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    getConfiguration: () => moduleConfig,
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    runAll: async () => {
        await Promise.all(promises.values());
    },
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    running: () => promises.size > 0,
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    silent: (mixed, errorMessage = "") => {
        handle(mixed, undefined, errorMessage);
    }
});
//# sourceMappingURL=index.js.map