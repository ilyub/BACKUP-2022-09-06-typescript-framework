import type { Facade } from "@skylib/facades/dist/httpRequest";
export interface Configuration {
    readonly timeout: number;
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
export declare const implementation: Facade;
//# sourceMappingURL=axios-wrapper.d.ts.map