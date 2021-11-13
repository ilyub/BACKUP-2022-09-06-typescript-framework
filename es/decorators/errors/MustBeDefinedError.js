export class MustBeDefinedError extends Error {
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
//# sourceMappingURL=MustBeDefinedError.js.map