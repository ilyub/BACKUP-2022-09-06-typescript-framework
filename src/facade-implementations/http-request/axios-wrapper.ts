import { o } from "@skylib/functions";
import axios from "axios";
import type { httpRequest } from "@skylib/facades";

export const axiosWrapper: axiosWrapper.Configurable & httpRequest.Facade = {
  configure: (config: axiosWrapper.PartialConfiguration) => {
    o.assign(moduleConfig, config);
  },
  getConfiguration: () => moduleConfig,
  send: async (url: string, method = "get", data = {}, headers = {}) => {
    const response = await axios({
      data,
      headers,
      method,
      timeout: moduleConfig.timeout,
      url
    });

    return response.data as unknown;
  }
} as const;

export namespace axiosWrapper {
  export interface Configurable {
    /**
     * Configures plugin.
     *
     * @param config - Plugin configuration.
     */
    readonly configure: (config: PartialConfiguration) => void;
    /**
     * Returns plugin configuration.
     *
     * @returns Plugin configuration.
     */
    readonly getConfiguration: () => Configuration;
  }

  export interface Configuration {
    readonly timeout: number;
  }

  export interface PartialConfiguration extends Partial<Configuration> {}
}

const moduleConfig: axiosWrapper.Configuration = { timeout: 30_000 } as const;
