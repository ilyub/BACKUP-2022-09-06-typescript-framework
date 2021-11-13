"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustBeDefinedError = void 0;
class MustBeDefinedError extends Error {
    /**
     * Creates class instance.
     *
     * @param message - Message.
     */
    constructor(message = "Must be defined") {
        super(message);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "MustBeDefinedError"
        });
    }
}
exports.MustBeDefinedError = MustBeDefinedError;
//# sourceMappingURL=MustBeDefinedError.js.map