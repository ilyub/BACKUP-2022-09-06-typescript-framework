import { reactiveStorage } from "@skylib/facades";
import { defineFn, o, onDemand } from "@skylib/functions";
export const moduleConfig = onDemand(() => reactiveStorage({ localeName: "en-US" }));
export const pluralReduce = defineFn(
// eslint-disable-next-line @skylib/require-jsdoc -- Ok
(count) => {
    count = Math.abs(count);
    return Math.abs(count) === 1 ? 1 : 2;
}, {
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    ru: (count) => {
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
export function configure(config) {
    o.assign(moduleConfig, config);
}
/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
export function getConfiguration() {
    return moduleConfig;
}
//# sourceMappingURL=index.js.map