"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PouchNotFoundError = void 0;
class PouchNotFoundError extends Error {
    /**
     * Creates class instance.
     *
     * @param message - Message.
     */
    constructor(message) {
        super(message);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "PouchNotFoundError"
        });
    }
}
exports.PouchNotFoundError = PouchNotFoundError;
//# sourceMappingURL=PouchNotFoundError.js.map