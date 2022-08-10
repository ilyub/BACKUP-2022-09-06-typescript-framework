import { HttpMethod } from "@skylib/facades";
import type { Writable } from "@skylib/functions";
import axios from "axios";
import type { httpRequest } from "@skylib/facades";
import { o } from "@skylib/functions";

export const axiosWrapper: axiosWrapper.Configurable & httpRequest.Facade = {
  configure: config => {
    o.assign(moduleConfig, config);
  },
  getConfiguration: (): axiosWrapper.Configuration => moduleConfig,
  send: async (url, method = HttpMethod.get, data = {}, headers = {}) => {
    const response = await axios({
      data,
      headers,
      method,
      timeout: moduleConfig.timeout,
      url
    });

    return response.data as unknown;
  }
};

// eslint-disable-next-line @typescript-eslint/no-redeclare -- Ok
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

const moduleConfig: Writable<axiosWrapper.Configuration> = { timeout: 30_000 };
