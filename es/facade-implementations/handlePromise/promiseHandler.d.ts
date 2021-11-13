import type { Facade, TaskType } from "@skylib/facades/es/handlePromise";
import type { ReadonlyRecord } from "@skylib/functions/es/types/core";
export interface Configuration {
    readonly expectedDurations: ReadonlyRecord<TaskType, number>;
}
export declare type PartialConfiguration<K extends keyof Configuration> = {
    readonly [L in K]: Configuration[L];
};
export declare const handlers: Readonly<{
    error(error: unknown): void;
}>;
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
export declare const implementation: Facade;
//# sourceMappingURL=promiseHandler.d.ts.map