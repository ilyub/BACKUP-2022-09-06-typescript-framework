"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PouchConflictError = void 0;
class PouchConflictError extends Error {
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
            value: "PouchConflictError"
        });
    }
}
exports.PouchConflictError = PouchConflictError;
//# sourceMappingURL=PouchConflictError.js.map