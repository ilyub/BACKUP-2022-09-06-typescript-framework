import { Process } from "./Process";
import { moduleConfig } from "./core";
import { o } from "@skylib/functions";
import type { Configurable } from "./core";
import type { progressReporter } from "@skylib/facades";

export const progressBar: Configurable & progressReporter.Facade = {
  configure: (config: progressBar.PartialConfiguration): void => {
    o.assign(moduleConfig, config);
  },
  getConfiguration: (): progressBar.Configuration => moduleConfig,
  getProgress: Process.getProgress,
  reset: Process.reset,
  spawn: (): Process => new Process()
};

export namespace progressBar {
  export type Configuration = import("./core").Configuration;

  export type PartialConfiguration = import("./core").PartialConfiguration;
}
