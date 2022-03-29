import axios from "axios";

import type {
  Facade,
  HttpHeaders,
  HttpRequestMethod
} from "@skylib/facades/dist/httpRequest";
import * as o from "@skylib/functions/dist/object";
import type { ReadonlyIndexedObject } from "@skylib/functions/dist/types/core";

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
export function configure<K extends keyof Configuration>(
  config: PartialConfiguration<K>
): void {
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

export const implementation: Facade = {
  async send(
    url: string,
    method: HttpRequestMethod = "get",
    data: ReadonlyIndexedObject = {},
    headers: HttpHeaders = {}
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

/*
|*******************************************************************************
|* Private
|*******************************************************************************
|*/

const moduleConfig: Configuration = { timeout: 30_000 };
