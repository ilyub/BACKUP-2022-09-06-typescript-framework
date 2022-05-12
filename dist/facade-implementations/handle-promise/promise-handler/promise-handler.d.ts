import type { handlePromise as facade } from "@skylib/facades";
import type { Rec } from "@skylib/functions";
export declare const promiseHandler: facade.Facade & promiseHandler.Configurable;
export declare namespace promiseHandler {
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
        readonly expectedDurations: Rec<facade.Type, number>;
    }
    interface PartialConfiguration extends Partial<Configuration> {
    }
}
//# sourceMappingURL=promise-handler.d.ts.map