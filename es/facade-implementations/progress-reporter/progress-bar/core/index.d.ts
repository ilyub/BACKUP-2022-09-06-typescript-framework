import type { Writable } from "@skylib/functions";
export declare const moduleConfig: Configuration;
export interface Configuration {
    readonly activeClass: string;
    readonly enabled: boolean;
    readonly finalEasing: boolean;
    readonly finalEasingSpeed: number;
    readonly latency: number;
    readonly precision: number;
    readonly selector: string;
    readonly updateInterval: number;
}
export interface PartialConfiguration extends Partial<Configuration> {
}
export interface ProcessState {
    readonly expectedDuration: number;
    readonly lastUpdate: number;
    readonly progress: number;
    readonly state: State;
    readonly weight: number;
}
export declare type State = "auto" | "done" | "finalEasing" | "manual";
/**
 * Performs final easing.
 *
 * @param mutableState - Process state.
 */
export declare function finalEasing(mutableState: Writable<ProcessState>): void;
/**
 * Grows progress.
 *
 * @param mutableState - Process state.
 */
export declare function growProgress(mutableState: Writable<ProcessState>): void;
//# sourceMappingURL=index.d.ts.map