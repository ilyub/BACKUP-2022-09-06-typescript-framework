export class PouchConflictError extends Error {
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
//# sourceMappingURL=PouchConflictError.js.map