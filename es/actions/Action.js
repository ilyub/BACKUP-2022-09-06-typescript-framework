import { handlePromise } from "@skylib/facades/es/handlePromise";
export class Action {
    constructor() {
        Object.defineProperty(this, "errorMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        /*
        |*****************************************************************************
        |* Protected
        |*****************************************************************************
        |*/
        Object.defineProperty(this, "_running", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
    /**
     * Checks if action is running.
     *
     * @returns _True_ if action is running, _false_ otherwise.
     */
    get running() {
        return this._running > 0;
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
            return await this._execute(...args);
        }
        finally {
            this._running--;
        }
    }
    /**
     * Starts action.
     *
     * @param args - Arguments.
     */
    spawn(...args) {
        if (this.type)
            handlePromise.verbose(this.execute(...args), this.type, this.errorMessage);
        else
            handlePromise.silent(this.execute(...args), this.errorMessage);
    }
    /**
     * Executes action.
     *
     * @param _args - Arguments.
     * @returns Result.
     */
    // eslint-disable-next-line @typescript-eslint/require-await
    async _execute(..._args) {
        throw new Error("Not implemented");
    }
}
//# sourceMappingURL=Action.js.map