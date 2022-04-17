import type { progressReporter } from "@skylib/facades";
export declare const facade: progressReporter.Facade;
export declare class Process implements progressReporter.Process {
    /**
     * Creates class instance.
     */
    constructor();
    done(): this;
    setAuto(expectedDuration: number): this;
    setProgress(value: number): this;
    setWeight(value: number): this;
    /**
     * Updates progress bar state.
     *
     * @param this - This argument.
     */
    protected static update(this: void): void;
    protected readonly created: number;
    protected expectedDuration: number;
    protected readonly id: symbol;
    protected lastAutoGrow: number;
    protected progress: number;
    protected state: State;
    protected weight: number;
}
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
export declare type State = "auto" | "done" | "manual";
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
//# sourceMappingURL=Process.d.ts.map