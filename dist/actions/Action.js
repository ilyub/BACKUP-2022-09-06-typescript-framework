"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const handlePromise_1 = require("@skylib/facades/dist/handlePromise");
class Action {
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
            handlePromise_1.handlePromise.verbose(this.execute(...args), this.type, this.errorMessage);
        else
            handlePromise_1.handlePromise.silent(this.execute(...args), this.errorMessage);
    }
    /**
     * Executes action.
     *
     * @param _args - Arguments.
     * @returns Result.
     */
    async _execute(..._args) {
        return Promise.reject(new Error("Not implemented"));
    }
}
exports.Action = Action;
//# sourceMappingURL=Action.js.map