import type { Facade } from "@skylib/facades/dist/testDelay";
export interface Configuration {
    readonly enabled: boolean;
    readonly timeout: number;
}
export declare type PartialConfiguration<K extends keyof Configuration> = {
    readonly [L in K]: Configuration[L];
};
export declare const implementation: Facade;
/**
 * Configures plugin.
 *
 * @param config - Plugin configuration.
 */
export declare function configure<K extends keyof Configuration>(config: PartialConfiguration<K>): void;
/**
 * Returns plugin configuration.
 *
 * @returns Plugin configuration.
 */
export declare function getConfiguration(): Configuration;
export declare const moduleConfig: Configuration;
//# sourceMappingURL=configurableTestDelay.d.ts.map