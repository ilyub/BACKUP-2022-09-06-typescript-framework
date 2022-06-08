import type { ProcessState } from "./core";
import type { progressReporter } from "@skylib/facades";
import type { Writable } from "@skylib/functions";
export declare class Process implements progressReporter.Process {
    /**
     * Returns progress.
     *
     * @returns Progress.
     */
    static readonly getProgress: () => number;
    /**
     * Resets to initial state.
     */
    static readonly reset: () => void;
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
     */
    protected static readonly update: () => void;
    protected readonly created: number;
    protected readonly state: Writable<ProcessState>;
    /**
     * Updates internal state.
     */
    protected update(): void;
}
//# sourceMappingURL=Process.d.ts.map