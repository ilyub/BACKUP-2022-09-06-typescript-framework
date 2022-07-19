import { HttpMethod } from "@skylib/facades";
import axios from "axios";
import { o } from "@skylib/functions";
export const axiosWrapper = {
    configure: config => {
        o.assign(moduleConfig, config);
    },
    getConfiguration: () => moduleConfig,
    send: async (url, method = HttpMethod.get, data = {}, headers = {}) => {
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