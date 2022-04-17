import type { testDelay } from "@skylib/facades";
export declare const implementation: testDelay.Facade;
export declare const moduleConfig: Configuration;
export interface Configuration {
    readonly enabled: boolean;
    readonly timeout: number;
}
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
//# sourceMappingURL=configurableTestDelay.d.ts.map