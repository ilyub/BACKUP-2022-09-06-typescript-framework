export class PouchRetryError extends Error {
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
//# sourceMappingURL=PouchRetryError.js.map