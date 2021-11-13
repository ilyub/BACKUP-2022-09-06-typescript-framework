import type { stringU } from "@skylib/functions/es/types/core";
import { Action } from "./Action";
export declare class Confirmable<A extends unknown[]> extends Action<A, void> {
    /**
     * Creates class instance.
     *
     * @param message - Confirmation message.
     */
    constructor(message?: string);
    /**
     * Executes action.
     *
     * @param args - Arguments.
     * @returns Result.
     */
    execute(...args: A): Promise<void>;
    protected message: stringU;
}
//# sourceMappingURL=Confirmable.d.ts.map