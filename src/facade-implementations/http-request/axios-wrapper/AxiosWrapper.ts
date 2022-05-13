import { o } from "@skylib/functions";
import axios from "axios";
import type { Configuration, PartialConfiguration } from "./types";
import type { httpRequest } from "@skylib/facades";

export class AxiosWrapper implements httpRequest.Facade {
  /**
   * Configures plugin.
   *
   * @param config - Plugin configuration.
   */
  public readonly configure = (config: PartialConfiguration): void => {
    o.assign(moduleConfig, config);
  };

  /**
   * Returns plugin configuration.
   *
   * @returns Plugin configuration.
   */
  public readonly getConfiguration = (): Configuration => moduleConfig;

  public readonly send = async (
    url: string,
    method = "get",
    data = {},
    headers = {}
  ): Promise<unknown> => {
    const response = await axios({
      data,
      headers,
      method,
      timeout: moduleConfig.timeout,
      url
    });

    return response.data as unknown;
  };
}

const moduleConfig: Configuration = { timeout: 30_000 };
