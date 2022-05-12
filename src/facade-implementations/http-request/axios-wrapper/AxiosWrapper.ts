import { o } from "@skylib/functions";
import axios from "axios";
import type { Configuration, PartialConfiguration } from "./types";
import type { httpRequest } from "@skylib/facades";

export class AxiosWrapper implements httpRequest.Facade {
  /**
   * Configures plugin.
   *
   * @param this - No this.
   * @param config - Plugin configuration.
   */
  public configure(this: void, config: PartialConfiguration): void {
    o.assign(moduleConfig, config);
  }

  /**
   * Returns plugin configuration.
   *
   * @param this - No this.
   * @returns Plugin configuration.
   */
  public getConfiguration(this: void): Configuration {
    return moduleConfig;
  }

  public async send(
    url: string,
    method = "get",
    data = {},
    headers = {}
  ): Promise<unknown> {
    const response = await axios({
      data,
      headers,
      method,
      timeout: moduleConfig.timeout,
      url
    });

    return response.data as unknown;
  }
}

const moduleConfig: Configuration = { timeout: 30_000 };
