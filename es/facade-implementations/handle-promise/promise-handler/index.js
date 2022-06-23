import { handle, moduleConfig, promises } from "./core";
import { defineFn, o } from "@skylib/functions";
export const promiseHandler = defineFn((type, mixed, errorMessage = "") => {
    handle(mixed, type, errorMessage);
}, {
    configure: (config) => {
        o.assign(moduleConfig, config);
    },
    getConfiguration: () => moduleConfig,
    runAll: async () => {
        await Promise.all(promises.values());
    },
    running: () => promises.size > 0,
    silent: (mixed, errorMessage = "") => {
        handle(mixed, undefined, errorMessage);
    }
});
//# sourceMappingURL=index.js.map