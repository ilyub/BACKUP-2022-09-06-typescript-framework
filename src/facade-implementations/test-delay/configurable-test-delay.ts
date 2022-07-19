import { defineFn, o, wait } from "@skylib/functions";
import type { Writable } from "@skylib/functions";
import type { testDelay as facade } from "@skylib/facades";

export const configurableTestDelay: configurableTestDelay.Configurable &
  facade.Facade = defineFn(
  async () => {
    if (moduleConfig.enabled) await wait(moduleConfig.timeout);
  },
  {
    configure: config => {
      o.assign(moduleConfig, config);
    },
    getConfiguration: () => moduleConfig
  }
);

// eslint-disable-next-line @typescript-eslint/no-redeclare -- Ok
export namespace configurableTestDelay {
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

  export interface Configuration {
    readonly enabled: boolean;
    readonly timeout: number;
  }

  export interface PartialConfiguration extends Partial<Configuration> {}
}

const moduleConfig: Writable<configurableTestDelay.Configuration> = {
  enabled: false,
  timeout: 100
};
