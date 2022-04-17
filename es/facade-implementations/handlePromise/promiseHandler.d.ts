import type { handlePromise } from "@skylib/facades";
import type { Rec } from "@skylib/functions";
export declare const handlers: Readonly<{
    error(error: unknown): void;
}>;
export declare const implementation: handlePromise.Facade;
export interface Configuration {
    readonly expectedDurations: Rec<handlePromise.Type, number>;
}
export declare type PartialConfiguration<K extends keyof Configuration> = {
    readonly [L in K]: Configuration[L];
};
/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
export declare function configure(config: Partial<Configuration>): void;
/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
export declare function getConfiguration(): Configuration;
//# sourceMappingURL=promiseHandler.d.ts.map