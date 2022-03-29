import { wait } from "@skylib/functions/es/helpers";
import * as o from "@skylib/functions/es/object";
export const implementation = async () => {
    if (moduleConfig.enabled)
        await wait(moduleConfig.timeout);
};
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
/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/
export const moduleConfig = { enabled: false, timeout: 100 };
//# sourceMappingURL=configurableTestDelay.js.map