import { DateTime } from "./DateTime";
import type { datetime } from "@skylib/facades";
export declare const dateFnsWrapper: dateFnsWrapper.Configurable & datetime.Facade;
export declare namespace dateFnsWrapper {
    interface Configurable {
        readonly DateTime: typeof DateTime;
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