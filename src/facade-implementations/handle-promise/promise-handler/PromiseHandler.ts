import { handle, moduleConfig, promises } from "./core";
import { o } from "@skylib/functions";
import type { Configuration, PartialConfiguration } from "./core";
import type { handlePromise } from "@skylib/facades";
import type { AsyncPromise } from "@skylib/functions";

export class PromiseHandler implements handlePromise.Facade {
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

  public async runAll(): Promise<void> {
    await Promise.all(promises.values());
  }

  public running(): boolean {
    return promises.size > 0;
  }

  public silent<T>(mixed: AsyncPromise<T>, errorMessage = ""): void {
    handle(mixed, undefined, errorMessage);
  }

  public verbose<T>(
    mixed: AsyncPromise<T>,
    type: handlePromise.Type,
    errorMessage = ""
  ): void {
    handle(mixed, type, errorMessage);
  }
}
