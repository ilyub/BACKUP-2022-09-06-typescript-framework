import { handle, moduleConfig, promises } from "./core";
import { o } from "@skylib/functions";
import type { Configuration, PartialConfiguration } from "./core";
import type { handlePromise } from "@skylib/facades";
import type { AsyncPromise } from "@skylib/functions";

export class PromiseHandler implements handlePromise.Facade {
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

  public readonly runAll = async (): Promise<void> => {
    await Promise.all(promises.values());
  };

  public readonly running = (): boolean => promises.size > 0;

  public readonly silent = <T>(
    mixed: AsyncPromise<T>,
    errorMessage = ""
  ): void => {
    handle(mixed, undefined, errorMessage);
  };

  public readonly verbose = <T>(
    mixed: AsyncPromise<T>,
    type: handlePromise.Type,
    errorMessage = ""
  ): void => {
    handle(mixed, type, errorMessage);
  };
}
