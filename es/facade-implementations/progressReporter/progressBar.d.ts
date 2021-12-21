import type { Facade, Process as ProcessInterface } from "@skylib/facades/es/progressReporter";
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
export declare type PartialConfiguration<K extends keyof Configuration> = {
    readonly [L in K]: Configuration[L];
};
export declare type State = "manual" | "auto" | "done";
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
export declare class Process implements ProcessInterface {
    /**
     * Creates class instance.
     */
    constructor();
    done(): Process;
    setAuto(expectedDuration: number): Process;
    setProgress(value: number): Process;
    setWeight(value: number): Process;
    /**
     * Updates progress bar state.
     *
     * @param this - This argument.
     */
    protected static update(this: void): void;
    protected created: number;
    protected expectedDuration: number;
    protected id: symbol;
    protected lastAutoGrow: number;
    protected progress: number;
    protected state: State;
    protected weight: number;
}
//# sourceMappingURL=progressBar.d.ts.map