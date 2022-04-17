import { wait, o } from "@skylib/functions";
export const implementation = async () => {
    if (moduleConfig.enabled)
        await wait(moduleConfig.timeout);
};
export const moduleConfig = { enabled: false, timeout: 100 };
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
//# sourceMappingURL=configurableTestDelay.js.map