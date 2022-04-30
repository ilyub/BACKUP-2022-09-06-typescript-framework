import type { progressReporter } from "@skylib/facades";
export declare const progressBar: progressBar.Configurable & progressReporter.Facade;
export declare namespace progressBar {
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
    type Configuration = import("./core").Configuration;
    type PartialConfiguration = import("./core").PartialConfiguration;
}
//# sourceMappingURL=index.d.ts.map