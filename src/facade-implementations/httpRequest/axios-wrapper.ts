import { o } from "@skylib/functions";
import axios from "axios";
import type { httpRequest } from "@skylib/facades";
import type { IndexedObject } from "@skylib/functions";

export const implementation: httpRequest.Facade = {
  async send(
    url: string,
    method: httpRequest.HttpRequestMethod = "get",
    data: IndexedObject = {},
    headers: httpRequest.HttpHeaders = {}
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
};

export interface Configuration {
  readonly timeout: number;
}

export type PartialConfiguration<K extends keyof Configuration> = {
  readonly [L in K]: Configuration[L];
};

/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
export function configure(config: Partial<Configuration>): void {
  o.assign(moduleConfig, config);
}

/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
export function getConfiguration(): Configuration {
  return moduleConfig;
}

const moduleConfig: Configuration = { timeout: 30_000 };
