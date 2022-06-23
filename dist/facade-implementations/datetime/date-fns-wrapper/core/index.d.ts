import type { strings } from "@skylib/functions";
import type { Locale } from "date-fns";
export declare const formatStrings: strings;
export declare const moduleConfig: Configuration;
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
    readonly firstDayOfWeek: FirstDayOfWeek;
    readonly locale: Locale;
    readonly pm: boolean;
}
export declare type FirstDayOfWeek = 0 | 1;
export interface PartialConfiguration extends Partial<Configuration> {
}
//# sourceMappingURL=index.d.ts.map