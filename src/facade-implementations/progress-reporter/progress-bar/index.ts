import { Process } from "./Process";
import { moduleConfig } from "./core";
import { o } from "@skylib/functions";
import type { progressReporter } from "@skylib/facades";

export const progressBar: progressBar.Configurable & progressReporter.Facade = {
  configure(config) {
    o.assign(moduleConfig, config);
  },
  getConfiguration() {
    return moduleConfig;
  },
  getProgress: Process.getProgress,
  reset: Process.reset,
  spawn() {
    return new Process();
  }
};

export namespace progressBar {
  export interface Configurable {
    /**
     * Configures plugin.
     *
     * @param config - Plugin configuration.
     */
    readonly configure: (config: PartialConfiguration) => void;
    /**
     * Returns plugin configuration.
     *
     * @returns Plugin configuration.
     */
    readonly getConfiguration: () => Configuration;
  }

  export type Configuration = import("./core").Configuration;

  export type PartialConfiguration = import("./core").PartialConfiguration;
}
