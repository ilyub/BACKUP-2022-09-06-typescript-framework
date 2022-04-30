import { reactiveStorage } from "@skylib/facades";
import { defineFn, o, onDemand } from "@skylib/functions";
export const moduleConfig = onDemand(() => reactiveStorage({ localeName: "en-US" }));
export const pluralReduce = defineFn((count) => {
    count = Math.abs(count);
    return count === 1 ? 1 : 2;
}, {
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
export function configure(config) {
    o.assign(moduleConfig, config);
}
/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
export function getConfiguration() {
    return o.clone(moduleConfig);
}
//# sourceMappingURL=index.js.map