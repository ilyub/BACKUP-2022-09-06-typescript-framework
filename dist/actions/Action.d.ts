import type { TaskType } from "@skylib/facades/dist/handlePromise";
import type { stringU } from "@skylib/functions/dist/types/core";
export declare class Action<A extends unknown[], R> {
    readonly errorMessage: stringU;
    readonly type: TaskType | undefined;
    /**
     * Checks if action is running.
     *
     * @returns _True_ if action is running, _false_ otherwise.
     */
    get running(): boolean;
    /**
     * Executes action.
     *
     * @param args - Arguments.
     * @returns Result.
     */
    execute(...args: A): Promise<R>;
    /**
     * Starts action.
     *
     * @param args - Arguments.
     */
    spawn(...args: A): void;
    protected _running: number;
    /**
     * Executes action.
     *
     * @param _args - Arguments.
     * @returns Result.
     */
    protected _execute(..._args: A): Promise<R>;
}
//# sourceMappingURL=Action.d.ts.map