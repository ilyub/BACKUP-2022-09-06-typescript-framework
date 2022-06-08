import { o } from "@skylib/functions";
import axios from "axios";
export const axiosWrapper = {
    configure: (config) => {
        o.assign(moduleConfig, config);
    },
    getConfiguration: () => moduleConfig,
    send: async (url, method = "get", data = {}, headers = {}) => {
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
const moduleConfig = { timeout: 30000 };
//# sourceMappingURL=axios-wrapper.js.map