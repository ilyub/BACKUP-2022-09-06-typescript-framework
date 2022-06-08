import type { handlePromise as facade } from "@skylib/facades";
import type { AsyncPromise, Rec } from "@skylib/functions";
export declare const moduleConfig: Configuration;
export declare const promises: Map<symbol, Promise<unknown>>;
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
    readonly expectedDurations: Rec<facade.Type, number>;
}
export interface PartialConfiguration extends Partial<Configuration> {
}
/**
 * Handles promise.
 *
 * @param mixed - Promise or async function.
 * @param type - Type (determines expected duration for progress reporting).
 * @param errorMessage - Error message (used to alert user on error).
 */
export declare function handle<T>(mixed: AsyncPromise<T>, type: facade.Type | undefined, errorMessage: string): void;
//# sourceMappingURL=index.d.ts.map