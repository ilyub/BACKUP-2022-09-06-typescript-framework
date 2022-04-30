import type { strings } from "@skylib/functions";
export declare const formatStrings: strings;
export declare const moduleConfig: Configuration;
export interface Configuration {
    readonly firstDayOfWeek: FirstDayOfWeek;
    readonly locale: Locale;
    readonly pm: boolean;
}
export declare type FirstDayOfWeek = 0 | 1;
export interface PartialConfiguration extends Partial<Configuration> {
}
//# sourceMappingURL=index.d.ts.map