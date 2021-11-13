import { showConfirm } from "@skylib/facades/es/showConfirm";
import * as is from "@skylib/functions/es/guards";
import { Action } from "./Action";
export class Confirmable extends Action {
    /**
     * Creates class instance.
     *
     * @param message - Confirmation message.
     */
    constructor(message) {
        super();
        /*
        |*****************************************************************************
        |* Protected
        |*****************************************************************************
        |*/
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        this.message = message;
    }
    /**
     * Executes action.
     *
     * @param args - Arguments.
     * @returns Result.
     */
    async execute(...args) {
        this._running++;
        try {
            if (is.not.empty(this.message)) {
                const confirmed = await showConfirm.async(this.message);
                if (confirmed)
                    await this._execute(...args);
            }
            else
                await this._execute(...args);
        }
        finally {
            this._running--;
        }
    }
}
//# sourceMappingURL=Confirmable.js.map