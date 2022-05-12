import { Process } from "./Process";
import { moduleConfig } from "./core";
import { o } from "@skylib/functions";
import type { Configuration, PartialConfiguration } from "./core";
import type { progressReporter } from "@skylib/facades";

export class ProgressBar implements progressReporter.Facade {
  public readonly getProgress = Process.getProgress;

  public readonly reset = Process.reset;

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

  public spawn(): Process {
    return new Process();
  }
}
