"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Confirmable = void 0;
const tslib_1 = require("tslib");
const showConfirm_1 = require("@skylib/facades/dist/showConfirm");
const is = (0, tslib_1.__importStar)(require("@skylib/functions/dist/guards"));
const Action_1 = require("./Action");
class Confirmable extends Action_1.Action {
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
                const confirmed = await showConfirm_1.showConfirm.async(this.message);
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
exports.Confirmable = Confirmable;
//# sourceMappingURL=Confirmable.js.map