import { o } from "@skylib/functions";
import axios from "axios";
export const implementation = {
    async send(url, method = "get", data = {}, headers = {}) {
        const response = await axios({
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
const moduleConfig = { timeout: 30000 };
//# sourceMappingURL=axios-wrapper.js.map