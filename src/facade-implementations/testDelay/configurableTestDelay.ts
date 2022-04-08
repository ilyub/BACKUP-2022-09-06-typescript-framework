import type { Facade } from "@skylib/facades/dist/testDelay";
import { wait } from "@skylib/functions/dist/helpers";
import * as o from "@skylib/functions/dist/object";

export const implementation: Facade = async () => {
  if (moduleConfig.enabled) await wait(moduleConfig.timeout);
};

export const moduleConfig: Configuration = { enabled: false, timeout: 100 };

export interface Configuration {
  readonly enabled: boolean;
  readonly timeout: number;
}

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
