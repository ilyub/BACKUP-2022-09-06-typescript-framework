import type { Rec, Writable, types } from "@skylib/functions";
import type { PromiseType } from "@skylib/facades";
export declare const moduleConfig: Writable<Configuration>;
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
    readonly expectedDurations: Rec<PromiseType, number>;
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
export declare function handle<T>(mixed: types.fn.AsyncPromise<T>, type: PromiseType | undefined, errorMessage: string): void;
//# sourceMappingURL=index.d.ts.map