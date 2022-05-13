import { Process } from "./Process";
import { moduleConfig } from "./core";
import { o } from "@skylib/functions";
import type { Configuration, PartialConfiguration } from "./core";
import type { progressReporter } from "@skylib/facades";

export class ProgressBar implements progressReporter.Facade {
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

  public readonly getProgress = Process.getProgress;

  public readonly reset = Process.reset;

  public readonly spawn = (): Process => new Process();
}
