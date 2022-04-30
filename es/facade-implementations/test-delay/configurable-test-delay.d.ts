import type { testDelay as facade } from "@skylib/facades";
export declare const configurableTestDelay: configurableTestDelay.Configurable & facade.Facade;
export declare namespace configurableTestDelay {
    interface Configurable {
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
    interface Configuration {
        readonly enabled: boolean;
        readonly timeout: number;
    }
    interface PartialConfiguration extends Partial<Configuration> {
    }
}
//# sourceMappingURL=configurable-test-delay.d.ts.map