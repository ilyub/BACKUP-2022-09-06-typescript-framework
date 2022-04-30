import type { ProcessState } from "./core";
import type { progressReporter } from "@skylib/facades";
import type { Writable } from "@skylib/functions";
export declare class Process implements progressReporter.Process {
    /**
     * Returns progress.
     *
     * @param this - No this.
     * @returns Progress.
     */
    static getProgress(this: void): number;
    /**
     * Resets to initial state.
     *
     * @param this - No this.
     */
    static reset(this: void): void;
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
     * @param this - No this.
     */
    protected static update(this: void): void;
    protected readonly created: number;
    protected readonly state: Writable<ProcessState>;
    /**
     * Updates internal state.
     */
    protected update(): void;
}
//# sourceMappingURL=Process.d.ts.map