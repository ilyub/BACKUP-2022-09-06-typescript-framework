import { wait, o, defineFn } from "@skylib/functions";
import type { testDelay as facade } from "@skylib/facades";

export const configurableTestDelay: configurableTestDelay.Configurable &
  facade.Facade = defineFn(
  // eslint-disable-next-line @skylib/require-jsdoc -- Ok
  async () => {
    if (moduleConfig.enabled) await wait(moduleConfig.timeout);
  },
  {
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    configure(config: Partial<configurableTestDelay.Configuration>) {
      o.assign(moduleConfig, config);
    },
    // eslint-disable-next-line @skylib/require-jsdoc -- Ok
    getConfiguration() {
      return moduleConfig;
    }
  }
);

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

const moduleConfig: configurableTestDelay.Configuration = {
  enabled: false,
  timeout: 100
};
