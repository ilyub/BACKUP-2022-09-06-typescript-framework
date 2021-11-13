"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PouchRetryError = void 0;
class PouchRetryError extends Error {
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
            value: "PouchRetryError"
        });
    }
}
exports.PouchRetryError = PouchRetryError;
//# sourceMappingURL=PouchRetryError.js.map