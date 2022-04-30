import type { httpRequest } from "@skylib/facades";
export declare const axiosWrapper: axiosWrapper.Configurable & httpRequest.Facade;
export declare namespace axiosWrapper {
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
        readonly timeout: number;
    }
    interface PartialConfiguration extends Partial<Configuration> {
    }
}
//# sourceMappingURL=axios-wrapper.d.ts.map